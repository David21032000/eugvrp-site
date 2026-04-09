export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server';
import { sendApplicationWebhook } from '@/lib/discord';

export async function POST(request: NextRequest) {
  try {
    console.log('📝 Primire aplicație...');
    const body = await request.json();
    console.log('📦 Body primit:', body);
    
    const { discordUserId, discordUsername, faction, questions } = body;

    if (!discordUserId || !discordUsername || !faction || !questions) {
      console.error('⚠️ Câmpuri lipsă:', { discordUserId, discordUsername, faction, questions });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

  // Create application in database
  console.log('💾 Se salvează în baza de date...');
  const { prisma } = await import('@/lib/prisma');
  const application = await prisma.factionApplication.create({
      data: {
        discordUserId,
        discordUsername,
        faction,
        questions: JSON.stringify(questions),
      },
    });

    console.log('✅ Aplicație salvată:', application.id);

    // Send Discord webhook notification (non-blocking)
    sendApplicationWebhook({
      id: application.id,
      discordUserId,
      discordUsername,
      faction,
      questions,
    }).catch(err => console.error('Webhook error:', err));

    return NextResponse.json(
      { message: 'Application submitted successfully', application },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Eroare la creare aplicație:', error);
    return NextResponse.json(
      { error: 'Failed to submit application', details: String(error) },
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
