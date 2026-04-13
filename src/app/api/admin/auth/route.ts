import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_USERNAME = "EUGVRP";
// SHA-256 hash of "ADMIN_EUGVRP2026"
const ADMIN_PASSWORD_HASH = "69adfc8814e20ca46c235575379a2447c862234c7aa72a31dd998067c5b204fd";
const SESSION_TOKEN = "eugvrp-admin-session-2026-secure";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const passwordHash = crypto.createHash("sha256").update(password || "").digest("hex");

  if (username === ADMIN_USERNAME && passwordHash === ADMIN_PASSWORD_HASH) {
    const cookieStore = await cookies();
    cookieStore.set("admin-session", SESSION_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 12, // 12 ore
      path: "/",
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Utilizator sau parolă incorectă." }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-session");
  return NextResponse.json({ success: true });
}
