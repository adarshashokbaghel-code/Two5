import { NextResponse } from "next/server";

import { readSession } from "@/lib/auth";
import { createReservedOrder } from "@/lib/payments";

function sessionEmail(request: Request) {
  const token = request.headers.get("cookie")?.match(/(?:^|;\s*)two5_session=([^;]+)/)?.[1];
  return readSession(token ? decodeURIComponent(token) : undefined)?.email ?? null;
}

export async function POST(request: Request) {
  const email = sessionEmail(request);
  if (!email) return NextResponse.json({ error: "Verify your email before paying." }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a valid request." }, { status: 400 });
  }
  const currency = typeof body === "object" && body && "currency" in body ? String(body.currency) : "";
  const result = await createReservedOrder(email, currency).catch((error: unknown) => ({
    ok: false as const,
    status: 502,
    error: error instanceof Error ? error.message : "Could not start checkout.",
  }));
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json(result);
}
