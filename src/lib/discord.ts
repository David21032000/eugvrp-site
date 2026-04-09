import axios from 'axios';

interface ApplicationData {
  id: string;
  discordUserId: string;
  discordUsername: string;
  faction: string;
  questions: Record<string, string>;
}

interface ReviewData {
  applicationId: string;
  discordUserId: string;
  faction: string;
  status: 'accepted' | 'rejected';
  reviewedBy: string;
  reviewNote?: string;
  discordRoleId?: string;
}

const factionColors: Record<string, number> = {
  police: 0x3498db,      // Blue
  staff: 0x9b59b6,       // Purple
  firefighter: 0xe74c3c, // Red
  dot: 0xf39c12,         // Orange
  sessionhost: 0x10b981, // Emerald/Green
};

const factionNames: Record<string, string> = {
  police: '👮 Poliție',
  staff: '👔 Staff',
  firefighter: '🔥 Pompieri',
  dot: '🛣️ DOT (Departamentul de Transport)',
  sessionhost: '⚡ Session Host',
};

const DEFAULT_ROLE_IDS: Record<string, string> = {
  // Add your actual Discord role IDs here
  police: process.env.DISCORD_ROLE_POLICE || '',
  staff: process.env.DISCORD_ROLE_STAFF || '',
  firefighter: process.env.DISCORD_ROLE_FIREFIGHTER || '',
  dot: process.env.DISCORD_ROLE_DOT || '',
  sessionhost: process.env.DISCORD_ROLE_SESSIONHOST || '',
};

export async function sendApplicationWebhook(application: ApplicationData) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('Discord webhook URL not configured');
    return;
  }

  const fields = Object.entries(application.questions).map(([question, answer]) => ({
    name: question.substring(0, 256),
    value: answer ? answer.substring(0, 1024) : 'Niciun răspuns',
    inline: false,
  }));

  const embed = {
    title: '📝 Cerere nouă pentru facțiune',
    description: `**${factionNames[application.faction] || application.faction}**`,
    color: factionColors[application.faction] || 0x95a5a6,
    fields: [
      {
        name: '👤 Discord User',
        value: `<@${application.discordUserId}> (${application.discordUsername})`,
        inline: true,
      },
      {
        name: '🆔 User ID',
        value: application.discordUserId,
        inline: true,
      },
      ...fields,
    ],
    timestamp: new Date().toISOString(),
    footer: {
      text: `Application ID: ${application.id}`,
    },
  };

  try {
    await axios.post(webhookUrl, {
      content: '🚨 **Aplicație nouă primită!** Verifică panoul de administrare: https://eugvrp.ro/admin',
      embeds: [embed],
    });
  } catch (error) {
    console.error('Failed to send Discord webhook:', error);
  }
}

/**
 * Assign a Discord role to a user via Discord Bot API
 */
export async function assignDiscordRole(userId: string, roleId: string): Promise<boolean> {
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const guildId = process.env.DISCORD_GUILD_ID;

  if (!botToken || !guildId) {
    console.error('Discord bot token or guild ID not configured');
    return false;
  }

  if (!roleId) {
    console.error('No role ID provided');
    return false;
  }

  try {
    await axios.put(
      `https://discord.com/api/v10/guilds/${guildId}/members/${userId}/roles/${roleId}`,
      {},
      {
        headers: {
          Authorization: `Bot ${botToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(`Role ${roleId} assigned to user ${userId}`);
    return true;
  } catch (error: any) {
    console.error('Failed to assign Discord role:', error.response?.data || error.message);
    return false;
  }
}

/**
 * Send notification when application is reviewed (accepted/rejected)
 */
export async function sendReviewWebhook(review: ReviewData) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('Discord webhook URL not configured');
    return;
  }

  const isAccepted = review.status === 'accepted';
  const statusEmoji = isAccepted ? '✅' : '❌';
  const color = isAccepted ? 0x2ecc71 : 0xe74c3c;

  const embed = {
    title: `${statusEmoji} Aplicație ${isAccepted ? 'Acceptată' : 'Respinsă'}`,
    description: `Aplicația pentru **${factionNames[review.faction] || review.faction}** a fost revizuită.`,
    color: color,
    fields: [
      {
        name: '👤 Applicant',
        value: `<@${review.discordUserId}>`,
        inline: true,
      },
      {
        name: '📋 Status',
        value: isAccepted ? '✅ Acceptat' : '❌ Respins',
        inline: true,
      },
      {
        name: '👨‍💼 Revizuit de',
        value: review.reviewedBy,
        inline: true,
      },
      ...(review.reviewNote ? [{
        name: '📝 Notă',
        value: review.reviewNote,
        inline: false,
      }] : []),
    ],
    timestamp: new Date().toISOString(),
    footer: {
      text: `Application ID: ${review.applicationId}`,
    },
  };

  try {
    await axios.post(webhookUrl, {
      content: isAccepted
        ? `🎉 Felicitări <@${review.discordUserId}>! Aplicația ta a fost acceptată!`
        : `📋 <@${review.discordUserId}>, aplicația ta a fost revizuită.`,
      embeds: [embed],
    });
  } catch (error) {
    console.error('Failed to send review webhook:', error);
  }
}

/**
 * Get the default role ID for a faction
 */
export function getFactionRoleId(faction: string): string | undefined {
  return DEFAULT_ROLE_IDS[faction] || undefined;
}
