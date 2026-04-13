import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { discordUserId, discordUsername, faction, questions } = body;

    if (!discordUserId || !faction || !questions) {
      return NextResponse.json(
        { error: "Date incomplete" },
        { status: 400 }
      );
    }

    // Creare intrare în DB - pe Vercel va fi PostgreSQL, local SQLite
    const application = await prisma.factionApplication.create({
      data: {
        discordUserId,
        discordUsername,
        faction,
        questions: JSON.stringify(questions),
        status: "pending",
      },
    });

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (error) {
    console.error("Application processing error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
