const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once('ready', () => {
  console.log(`Bot logged in as ${client.user.tag}!`);
  console.log('Bot is online and ready!');
});

client.on('guildMemberAdd', async (member) => {
  console.log(`New member joined: ${member.user.tag}`);
  // Optional: Welcome message or auto-assign roles
});

client.login(process.env.DISCORD_BOT_TOKEN);