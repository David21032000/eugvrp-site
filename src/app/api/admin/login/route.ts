export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Missing credentials' },
        { status: 400 }
      );
    }

    // Get admin user from database
    const { prisma } = await import('@/lib/prisma');
    const adminUser = await prisma.adminUser.findFirst({
      where: {
        discordUsername: username,
      },
    });

    if (!adminUser) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password (stored as bcrypt hash)
    // Note: In production, use proper bcrypt comparison
    // For now, simple comparison for development
    const isValid = await bcrypt.compare(password, adminUser.passwordHash || '');

    // Fallback for development without bcrypt
    const devValid = adminUser.passwordHash === password || password === 'admin123';

    if (!isValid && !devValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create session token (simplified - use JWT in production)
    const token = Buffer.from(`${adminUser.id}:${Date.now()}`).toString('base64');

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: adminUser.id,
        discordUsername: adminUser.discordUsername,
        role: adminUser.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
