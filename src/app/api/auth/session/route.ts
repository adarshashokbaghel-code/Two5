import { NextResponse } from "next/server";

import { readSession, SESSION_COOKIE, sessionCookieOptions, type Two5User } from "@/lib/auth";
import { usersCollection } from "@/lib/mongo";

export async function GET(request: Request) {
  const token = request.headers.get("cookie")?.match(/(?:^|;\s*)two5_session=([^;]+)/)?.[1];
  const session = readSession(token ? decodeURIComponent(token) : undefined);
  if (!session) return NextResponse.json({ user: null });

  const users = await usersCollection<Two5User>();
  const user = await users.findOne({ email: session.email, verified: true });
  if (!user) return NextResponse.json({ user: null });

  return NextResponse.json({
    user: {
      accountId: user.accountId,
      email: user.email,
      name: user.name,
      age: user.age,
    },
  });
}

export async function DELETE(request: Request) {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions(request), maxAge: 0 });
  return response;
}
