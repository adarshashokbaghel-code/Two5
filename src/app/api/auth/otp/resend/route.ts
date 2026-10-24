import { NextResponse } from "next/server";

import { resendOtp } from "@/lib/auth";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a valid request." }, { status: 400 });
  }

  const email =
    typeof body === "object" && body && "email" in body ? String(body.email) : "";
  const result = await resendOtp(email).catch(() => ({
    ok: false as const,
    status: 500,
    error: "Could not resend the code.",
  }));

  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ ok: true, email: result.email });
}
