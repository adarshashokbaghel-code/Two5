import { createHmac, timingSafeEqual } from "crypto";

import { isReservedCurrency, reservedPrices, type ReservedCurrency } from "@/content/reserved-price";
import type { Two5User } from "@/lib/auth";
import { usersCollection } from "@/lib/mongo";

export type Two5Payment = {
  orderId: string;
  paymentId?: string;
  currency: ReservedCurrency;
  amountMinor: number;
  status: "created" | "paid";
  method?: string;
  createdAt: Date;
  paidAt?: Date;
};

type RazorpayPayment = {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
  method?: string;
};

function keys() {
  const keyId = process.env.RAZORPAY_LIVE_KEY_ID || process.env.RAZORPAY_KEY_ID || "";
  const keySecret = process.env.RAZORPAY_LIVE_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET || "";
  if (!keyId || !keySecret) throw new Error("Razorpay is not configured.");
  return { keyId, keySecret };
}

async function razorpay<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const { keyId, keySecret } = keys();
  const response = await fetch(`https://api.razorpay.com/v1${path}`, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: init?.body === undefined ? undefined : JSON.stringify(init.body),
  });
  const body = (await response.json().catch(() => ({}))) as { error?: { description?: string } };
  if (!response.ok) {
    throw new Error(body.error?.description || "Razorpay could not complete that request.");
  }
  return body as T;
}

function signaturesMatch(orderId: string, paymentId: string, signature: string) {
  const expected = createHmac("sha256", keys().keySecret).update(`${orderId}|${paymentId}`).digest("hex");
  const left = Buffer.from(expected);
  const right = Buffer.from(signature);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function createReservedOrder(email: string, currencyInput: string) {
  if (!isReservedCurrency(currencyInput)) {
    return { ok: false as const, status: 400, error: "Choose USD or INR." };
  }
  const currency = currencyInput;
  const price = reservedPrices[currency];
  const users = await usersCollection<Two5User>();
  const user = await users.findOne({ email, verified: true });
  if (!user) return { ok: false as const, status: 401, error: "Verify your email before paying." };
  if (user.premiumUser) {
    return { ok: false as const, status: 409, error: "This account already has a reserved place." };
  }

  const receipt = `T5${user.accountId.replace("-", "")}${Date.now().toString(36)}`.slice(0, 40);
  const order = await razorpay<{ id: string }>("/orders", {
    method: "POST",
    body: {
      amount: price.minor,
      currency,
      receipt,
      notes: {
        purpose: "two5_reserved",
        accountId: user.accountId,
        email: user.email,
      },
    },
  });

  const row: Two5Payment = {
    orderId: order.id,
    currency,
    amountMinor: price.minor,
    status: "created",
    createdAt: new Date(),
  };
  await users.updateOne({ email }, { $push: { payments: row }, $set: { updatedAt: new Date() } });

  return {
    ok: true as const,
    orderId: order.id,
    amountMinor: price.minor,
    currency,
    keyId: keys().keyId,
    label: price.label,
  };
}

export async function confirmReservedPayment(email: string, orderId: string, paymentId: string, signature: string) {
  if (!orderId || !paymentId || !signature) {
    return { ok: false as const, status: 400, error: "Missing payment details." };
  }
  if (!signaturesMatch(orderId, paymentId, signature)) {
    return { ok: false as const, status: 400, error: "Payment could not be verified." };
  }

  const users = await usersCollection<Two5User>();
  const user = await users.findOne({ email, verified: true });
  if (!user) return { ok: false as const, status: 401, error: "Verify your email before paying." };

  const row = user.payments?.find((payment) => payment.orderId === orderId);
  if (!row) return { ok: false as const, status: 404, error: "That order is not on this account." };
  if (row.paymentId === paymentId && row.status === "paid") {
    return { ok: true as const, premiumUser: true, currency: row.currency, amountMinor: row.amountMinor };
  }

  let payment = await razorpay<RazorpayPayment>(`/payments/${paymentId}`);
  if (payment.order_id !== orderId) {
    return { ok: false as const, status: 400, error: "Payment does not match the order." };
  }
  if (payment.status === "authorized") {
    payment = await razorpay<RazorpayPayment>(`/payments/${paymentId}/capture`, {
      method: "POST",
      body: { amount: row.amountMinor, currency: row.currency },
    });
  }
  if (payment.status !== "captured") {
    return { ok: false as const, status: 409, error: "Payment is not captured yet." };
  }
  if (Number(payment.amount) !== row.amountMinor || payment.currency.toUpperCase() !== row.currency) {
    return { ok: false as const, status: 400, error: "Payment amount does not match the reserved place." };
  }

  const now = new Date();
  await users.updateOne(
    { email, "payments.orderId": orderId },
    {
      $set: {
        premiumUser: true,
        premiumAt: user.premiumAt ?? now,
        updatedAt: now,
        "payments.$.status": "paid",
        "payments.$.paymentId": payment.id,
        "payments.$.method": payment.method || "razorpay",
        "payments.$.paidAt": now,
      },
    },
  );

  return { ok: true as const, premiumUser: true, currency: row.currency, amountMinor: row.amountMinor };
}
