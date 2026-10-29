import { createHmac, randomInt, timingSafeEqual } from "crypto";

import { usersCollection } from "@/lib/mongo";
import { sendOtpEmail } from "@/lib/mail";
import { validateWaitlist } from "@/lib/waitlist";

const OTP_TTL_MS = 10 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;
const SEND_WINDOW_MS = 60 * 60 * 1000;
const MAX_SENDS = 5;
const MAX_ATTEMPTS = 5;
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export const SESSION_COOKIE = "two5_session";

export type Two5User = {
  accountId: string;
  email: string;
  name: string;
  age: number;
  verified: boolean;
  verifiedAt?: Date;
  otpHash?: string;
  otpExpiresAt?: Date;
  otpAttempts?: number;
  lastOtpSentAt?: Date;
  otpWindowStart?: Date;
  otpSendCount?: number;
  source?: string;
  campaign?: string;
  createdAt: Date;
  updatedAt: Date;
};

type AuthResult =
  | { ok: true; email: string }
  | { ok: false; status: number; error: string };

function secret() {
  const value = process.env.AUTH_SECRET || process.env.JWT_SECRET;
  if (!value || value.length < 16) throw new Error("Auth secret is not configured.");
  return value;
}

function hashOtp(email: string, code: string) {
  return createHmac("sha256", secret()).update(`${email}:${code}`).digest("hex");
}

function codesMatch(stored: string, email: string, code: string) {
  const expected = Buffer.from(stored);
  const actual = Buffer.from(hashOtp(email, code));
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function makeCode() {
  return randomInt(0, 1_000_000).toString().padStart(6, "0");
}

function cleanAttribution(value: unknown) {
  if (typeof value !== "string") return undefined;
  const clean = value.trim().slice(0, 64).replace(/[^a-zA-Z0-9._\- ]/g, "");
  return clean || undefined;
}

function makeAccountId() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let body = "";
  for (let i = 0; i < 6; i++) body += alphabet[randomInt(0, alphabet.length)];
  return `TW-${body}`;
}

async function freshAccountId() {
  const users = await usersCollection<Two5User>();
  for (let attempt = 0; attempt < 6; attempt++) {
    const accountId = makeAccountId();
    const taken = await users.findOne({ accountId }, { projection: { _id: 1 } });
    if (!taken) return accountId;
  }
  throw new Error("Could not assign an account ID.");
}

function waitSeconds(sentAt: Date) {
  return Math.max(1, Math.ceil((RESEND_COOLDOWN_MS - (Date.now() - sentAt.getTime())) / 1000));
}

async function issueCode(user: {
  email: string;
  name: string;
  age: number;
  existing: Two5User | null;
  source?: string;
  campaign?: string;
}): Promise<AuthResult> {
  const now = new Date();
  const existing = user.existing;

  if (existing?.lastOtpSentAt && now.getTime() - existing.lastOtpSentAt.getTime() < RESEND_COOLDOWN_MS) {
    return {
      ok: false,
      status: 429,
      error: `Wait ${waitSeconds(existing.lastOtpSentAt)}s before requesting another code.`,
    };
  }

  const inWindow =
    existing?.otpWindowStart && now.getTime() - existing.otpWindowStart.getTime() < SEND_WINDOW_MS;
  if (inWindow && (existing?.otpSendCount ?? 0) >= MAX_SENDS) {
    return { ok: false, status: 429, error: "Too many codes sent. Try again in an hour." };
  }

  const code = makeCode();
  const accountId = existing?.accountId ?? (await freshAccountId());
  const users = await usersCollection<Two5User>();

  await users.updateOne(
    { email: user.email },
    {
      $set: {
        email: user.email,
        name: user.name,
        age: user.age,
        accountId,
        otpHash: hashOtp(user.email, code),
        otpExpiresAt: new Date(now.getTime() + OTP_TTL_MS),
        otpAttempts: 0,
        lastOtpSentAt: now,
        otpWindowStart: inWindow && existing?.otpWindowStart ? existing.otpWindowStart : now,
        otpSendCount: inWindow ? (existing?.otpSendCount ?? 0) + 1 : 1,
        updatedAt: now,
      },
      $setOnInsert: {
        verified: false,
        createdAt: now,
        ...(user.source ? { source: user.source } : {}),
        ...(user.campaign ? { campaign: user.campaign } : {}),
      },
    },
    { upsert: true },
  );

  try {
    await sendOtpEmail({ to: user.email, name: user.name, code });
  } catch {
    await users.updateOne(
      { email: user.email },
      { $unset: { otpHash: "", otpExpiresAt: "" }, $set: { updatedAt: new Date() } },
    );
    return { ok: false, status: 502, error: "Could not send the code. Try again." };
  }

  return { ok: true, email: user.email };
}

export async function startOtp(input: {
  name: string;
  email: string;
  age: string;
  source?: string;
  campaign?: string;
}): Promise<AuthResult> {
  const parsed = validateWaitlist(input);
  if (!parsed.ok) return { ok: false, status: 400, error: parsed.error };

  const users = await usersCollection<Two5User>();
  const existing = await users.findOne({ email: parsed.data.email });

  return issueCode({
    email: parsed.data.email,
    name: parsed.data.name,
    age: parsed.data.age,
    existing,
    source: cleanAttribution(input.source),
    campaign: cleanAttribution(input.campaign),
  });
}

export async function resendOtp(emailInput: string): Promise<AuthResult> {
  const email = emailInput.trim().toLowerCase();
  const users = await usersCollection<Two5User>();
  const existing = await users.findOne({ email });
  if (!existing) return { ok: false, status: 400, error: "Enter your details before requesting a code." };

  return issueCode({
    email: existing.email,
    name: existing.name,
    age: existing.age,
    existing,
  });
}

export async function verifyOtp(emailInput: string, codeInput: string) {
  const email = emailInput.trim().toLowerCase();
  const code = codeInput.replace(/\D/g, "");
  if (code.length !== 6) return { ok: false as const, status: 400, error: "Enter the 6-digit code." };

  const users = await usersCollection<Two5User>();
  const user = await users.findOne({ email });
  if (!user?.otpHash || !user.otpExpiresAt) {
    return { ok: false as const, status: 400, error: "Request a code first." };
  }
  if (user.otpExpiresAt.getTime() < Date.now()) {
    return { ok: false as const, status: 400, error: "That code expired. Resend a new one." };
  }
  if ((user.otpAttempts ?? 0) >= MAX_ATTEMPTS) {
    return { ok: false as const, status: 429, error: "Too many attempts. Resend a new code." };
  }
  if (!codesMatch(user.otpHash, email, code)) {
    await users.updateOne({ email }, { $inc: { otpAttempts: 1 } });
    return { ok: false as const, status: 401, error: "That code is incorrect." };
  }

  const now = new Date();
  const created = !user.verified;
  await users.updateOne(
    { email },
    {
      $set: { verified: true, verifiedAt: user.verifiedAt ?? now, updatedAt: now },
      $unset: { otpHash: "", otpExpiresAt: "", otpAttempts: "" },
    },
  );

  return {
    ok: true as const,
    token: signSession({ email, accountId: user.accountId, name: user.name }),
    user: {
      accountId: user.accountId,
      email,
      name: user.name,
      age: user.age,
      created,
    },
  };
}

export function signSession(payload: { email: string; accountId: string; name: string }) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(
    JSON.stringify({ ...payload, exp: Date.now() + SESSION_TTL_MS }),
  ).toString("base64url");
  const signature = createHmac("sha256", secret()).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${signature}`;
}

export function readSession(token: string | undefined) {
  if (!token) return null;
  const [header, body, signature] = token.split(".");
  if (!header || !body || !signature) return null;
  const expected = createHmac("sha256", secret()).update(`${header}.${body}`).digest("base64url");
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as {
      email?: string;
      accountId?: string;
      name?: string;
      exp?: number;
    };
    if (!payload.email || !payload.accountId || !payload.name || !payload.exp) return null;
    if (payload.exp < Date.now()) return null;
    return { email: payload.email, accountId: payload.accountId, name: payload.name };
  } catch {
    return null;
  }
}

export function sessionCookieOptions(request: Request) {
  const forwarded = request.headers.get("x-forwarded-proto");
  const secure = forwarded
    ? forwarded.split(",")[0]?.trim() === "https"
    : new URL(request.url).protocol === "https:";

  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure,
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  };
}
