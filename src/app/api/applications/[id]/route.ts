export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server';
import { assignDiscordRole, sendReviewWebhook, getFactionRoleId } from '@/lib/discord';

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, reviewedBy, reviewNote } = body;

    if (!id || !status || !reviewedBy) {
      return NextResponse.json(
        { error: 'Missing required fields: id, status, reviewedBy' },
        { status: 400 }
      );
    }

    if (!['accepted', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be "accepted" or "rejected"' },
        { status: 400 }
      );
    }

    // Get the application
    const { prisma } = await import('@/lib/prisma');
    const application = await prisma.factionApplication.findUnique({
      where: { id },
    });

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    // Update the application
    const updatedApplication = await prisma.factionApplication.update({
      where: { id },
      data: {
        status,
        reviewedBy,
        reviewNote: reviewNote || null,
      },
    });

    // If accepted, try to assign Discord role
    let roleAssigned = false;
    if (status === 'accepted') {
      const roleId = application.discordRoleId || getFactionRoleId(application.faction);
      if (roleId) {
        roleAssigned = await assignDiscordRole(application.discordUserId, roleId);
      }

      // Update the application with the role ID that was used
      if (roleId && !application.discordRoleId) {
        await prisma.factionApplication.update({
          where: { id },
          data: { discordRoleId: roleId },
        });
      }
    }

    // Send Discord notification
    await sendReviewWebhook({
      applicationId: id,
      discordUserId: application.discordUserId,
      faction: application.faction,
      status: status as 'accepted' | 'rejected',
      reviewedBy,
      reviewNote,
      discordRoleId: application.discordRoleId || undefined,
    });

    return NextResponse.json({
      message: `Application ${status} successfully`,
      application: updatedApplication,
      roleAssigned,
    });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
}
