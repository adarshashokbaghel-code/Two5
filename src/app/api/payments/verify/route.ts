import { NextResponse } from "next/server";

import { readSession } from "@/lib/auth";
import { confirmReservedPayment } from "@/lib/payments";

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
  const record = typeof body === "object" && body ? body : {};
  const orderId = "razorpay_order_id" in record ? String(record.razorpay_order_id) : "";
  const paymentId = "razorpay_payment_id" in record ? String(record.razorpay_payment_id) : "";
  const signature = "razorpay_signature" in record ? String(record.razorpay_signature) : "";
  const result = await confirmReservedPayment(email, orderId, paymentId, signature).catch((error: unknown) => ({
    ok: false as const,
    status: 502,
    error: error instanceof Error ? error.message : "Could not confirm the payment.",
  }));
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json(result);
}
