import { NextResponse } from "next/server";

import { SESSION_COOKIE, sessionCookieOptions, verifyOtp } from "@/lib/auth";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a valid request." }, { status: 400 });
  }

  const record = typeof body === "object" && body ? body : {};
  const email = "email" in record ? String(record.email) : "";
  const code = "code" in record ? String(record.code) : "";
  const result = await verifyOtp(email, code).catch(() => ({
    ok: false as const,
    status: 500,
    error: "Could not verify the code.",
  }));

  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });

  const response = NextResponse.json({ ok: true, ...result.user });
  response.cookies.set(SESSION_COOKIE, result.token, sessionCookieOptions(request));
  return response;
}
