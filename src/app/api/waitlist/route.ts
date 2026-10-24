import { NextResponse } from "next/server";

import { validateWaitlist } from "@/lib/waitlist";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a valid request." }, { status: 400 });
  }

  const parsed = validateWaitlist({
    name: typeof body === "object" && body && "name" in body ? String(body.name) : "",
    email: typeof body === "object" && body && "email" in body ? String(body.email) : "",
    age: typeof body === "object" && body && "age" in body ? String(body.age) : "",
  });

  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const configured = Boolean(
    process.env.WAITLIST_WEBHOOK_URL || process.env.SUPABASE_URL,
  );

  if (!configured) {
    return NextResponse.json(
      {
        error:
          "Waitlist storage is not configured yet. Add WAITLIST_WEBHOOK_URL or SUPABASE_URL to enable signups.",
        code: "not_configured",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
