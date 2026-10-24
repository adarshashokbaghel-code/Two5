import { NextResponse } from "next/server";

import { startOtp } from "@/lib/auth";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a valid request." }, { status: 400 });
  }

  const record = typeof body === "object" && body ? body : {};
  const result = await startOtp({
    name: "name" in record ? String(record.name) : "",
    email: "email" in record ? String(record.email) : "",
    age: "age" in record ? String(record.age) : "",
  }).catch(() => ({ ok: false as const, status: 500, error: "Could not start verification." }));

  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ ok: true, email: result.email });
}
