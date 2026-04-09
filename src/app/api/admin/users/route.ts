export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// GET - List all admin users
export async function GET(request: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma');
    const users = await prisma.adminUser.findMany({
      select: {
        id: true,
        discordUsername: true,
        role: true,
        active: true,
        lastLogin: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching admin users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST - Create new admin user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { discordUserId, discordUsername, password, role = 'moderator' } = body;

    if (!discordUserId || !discordUsername || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { prisma } = await import('@/lib/prisma');

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.adminUser.create({
      data: {
        discordUserId,
        discordUsername,
        passwordHash,
        role,
        active: true,
      },
    });

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: user.id,
        discordUsername: user.discordUsername,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Error creating admin user:', error);
    if (error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'Username or Discord ID already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

// DELETE - Remove admin user
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
    }

    const { prisma } = await import('@/lib/prisma');
    await prisma.adminUser.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
