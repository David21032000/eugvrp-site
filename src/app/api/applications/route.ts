export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server';
import { sendApplicationWebhook } from '@/lib/discord';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { discordUserId, discordUsername, faction, questions } = body;

    if (!discordUserId || !discordUsername || !faction || !questions) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

  // Create application in database
  const { prisma } = await import('@/lib/prisma');
  const application = await prisma.factionApplication.create({
      data: {
        discordUserId,
        discordUsername,
        faction,
        questions: JSON.stringify(questions),
      },
    });

    // Send Discord webhook notification
    await sendApplicationWebhook({
      id: application.id,
      discordUserId,
      discordUsername,
      faction,
      questions,
    });

    return NextResponse.json(
      { message: 'Application submitted successfully', application },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const faction = searchParams.get('faction');

    const where: any = {};
    if (status) where.status = status;
    if (faction) where.faction = faction;

  const { prisma } = await import('@/lib/prisma');
  const applications = await prisma.factionApplication.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
