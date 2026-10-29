import type { Document } from "mongodb";
import { connection } from "next/server";

import type { Two5User } from "@/lib/auth";
import { usersCollection } from "@/lib/mongo";

export type WaitlistField = {
  label: string;
  value: string;
};

export type WaitlistRecord = {
  id: string;
  accountId: string;
  name: string;
  email: string;
  age: number | null;
  verified: boolean;
  createdAt: string | null;
  fields: WaitlistField[];
};

const HIDDEN = new Set(["otpHash"]);

const FIELD_ORDER = [
  "accountId",
  "name",
  "email",
  "age",
  "verified",
  "createdAt",
  "verifiedAt",
  "updatedAt",
  "lastOtpSentAt",
  "otpExpiresAt",
  "otpAttempts",
  "otpSendCount",
  "otpWindowStart",
  "source",
  "campaign",
];

const LABELS: Record<string, string> = {
  accountId: "Account ID",
  name: "Name",
  email: "Email",
  age: "Age",
  verified: "Verified",
  createdAt: "Joined",
  verifiedAt: "Verified at",
  updatedAt: "Updated",
  lastOtpSentAt: "Last code sent",
  otpExpiresAt: "Code expires",
  otpAttempts: "Code attempts",
  otpSendCount: "Codes sent",
  otpWindowStart: "Code window started",
  source: "Source",
  campaign: "Campaign",
};

function labelFor(key: string) {
  if (LABELS[key]) return LABELS[key];
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}

function isDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

function asIso(value: unknown) {
  if (isDate(value)) return value.toISOString();
  if (typeof value === "string" && value && !Number.isNaN(Date.parse(value))) {
    return new Date(value).toISOString();
  }
  return null;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  const iso = asIso(value);
  if (iso) {
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  }
  if (typeof value === "number") return String(value);
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

function textField(doc: Document, key: string) {
  const value = doc[key];
  return typeof value === "string" ? value : "";
}

export async function loadWaitlistBoard(): Promise<WaitlistRecord[]> {
  await connection();
  const users = await usersCollection<Two5User & Document>();
  const docs = await users
    .find({}, { projection: { otpHash: 0 } })
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map((doc) => {
    const keys = Object.keys(doc).filter((key) => key !== "_id" && !HIDDEN.has(key));
    keys.sort((a, b) => {
      const ai = FIELD_ORDER.indexOf(a);
      const bi = FIELD_ORDER.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });

    const age = typeof doc.age === "number" ? doc.age : null;
    const createdAt = asIso(doc.createdAt);

    return {
      id: doc._id.toString(),
      accountId: textField(doc, "accountId"),
      name: textField(doc, "name") || "Unnamed",
      email: textField(doc, "email"),
      age,
      verified: doc.verified === true,
      createdAt,
      fields: keys.map((key) => ({ label: labelFor(key), value: formatValue(doc[key]) })),
    };
  });
}
