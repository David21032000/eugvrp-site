import axios from 'axios';

interface ApplicationData {
  id: string;
  discordUserId: string;
  discordUsername: string;
  faction: string;
  questions: Record<string, string>;
}

const factionColors: Record<string, number> = {
  police: 0x3498db,      // Blue
  staff: 0x9b59b6,       // Purple
  firefighter: 0xe74c3c, // Red
  dot: 0xf39c12,         // Orange
};

const factionNames: Record<string, string> = {
  police: '👮 Poliție',
  staff: '👔 Staff',
  firefighter: '🔥 Pompieri',
  dot: '🛣️ DOT (Departamentul de Transport)',
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
    title: '📝 Cerere nouă pentru factiune',
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
      content: '🚨 **Aplicatie noua primita!** Verifica panoul de administrare.',
      embeds: [embed],
    });
  } catch (error) {
    console.error('Failed to send Discord webhook:', error);
  }
}
