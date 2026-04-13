require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

// Aici ne stocăm gamepass-urile și rolurile asociate. 
// FIXME: Trebuie să înlocuiești aceste ID-uri cu cele pe care mi le vei da ulterior!
const VIP_PACKAGES = {
  // gamePassId: roleId
  '12345678': '111111111111111111', // VIP
  '87654321': '222222222222222222', // Patron
  '99999999': '333333333333333333'  // SuperM
};

// Define slash commands
const commands = [
  new SlashCommandBuilder()
    .setName('claim')
    .setDescription('Revendică gradul VIP achiziționat pe Roblox')
    .addStringOption(option =>
      option.setName('roblox_username')
        .setDescription('Numele tău complet de pe Roblox')
        .setRequired(true))
].map(command => command.toJSON());

client.once('ready', async () => {
  console.log(`Bot logged in as ${client.user.tag}!`);
  
  // Register slash commands
  try {
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
    
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Eroare la înregistrarea comenzilor:', error);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'claim') {
    const robloxUsername = interaction.options.getString('roblox_username');
    const discordUserId = interaction.user.id;
    const discordUsername = interaction.user.tag;

    // Acknowledge interaction (deoarece API-ul de la ROBLOX poate dura)
    await interaction.deferReply({ ephemeral: true });

    try {
      // 1. Obținem roblox userId din userName
      const userRes = await fetch('https://users.roblox.com/v1/usernames/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usernames: [robloxUsername],
          excludeBannedUsers: false
        })
      });
      
      const userData = await userRes.json();
      
      if (!userData.data || userData.data.length === 0) {
        return interaction.editReply(`Nu am putut găsi utilizatorul **${robloxUsername}** pe Roblox. Verifică dacă l-ai scris corect.`);
      }

      const robloxUserId = userData.data[0].id.toString();
      let roleGranted = false;
      let grantedPasses = [];

      // 2. Trecem prin toate pachetele configurate să vedem care gamepass este deținut
      for (const [gamePassId, roleId] of Object.entries(VIP_PACKAGES)) {
        
        // Verificăm dacă a făcut claim deja în baza de date
        const alreadyClaimed = await prisma.claimedPass.findUnique({
          where: {
            robloxUserId_gamePassId: {
              robloxUserId: robloxUserId,
              gamePassId: gamePassId
            }
          }
        });

        if (alreadyClaimed) {
           continue; 
        }

        // 3. Verificăm deținerea pe inventarul de Roblox (Acest API necesită de obicei ca inventarul să fie PUBLIC)
        const inventoryRes = await fetch(`https://inventory.roblox.com/v1/users/${robloxUserId}/items/GamePass/${gamePassId}/is-owned`);
        
        if (!inventoryRes.ok) {
           console.log(`Failed to fetch inventory for pass ${gamePassId}: ${inventoryRes.statusText}`);
           continue; 
        }

        const responseText = await inventoryRes.text();
        const isOwned = (responseText === 'true' || responseText === true);

        if (isOwned) {
          // 4. Salvare în BD
          await prisma.claimedPass.create({
            data: {
              discordUserId,
              discordUsername,
              robloxUserId,
              robloxUsername,
              gamePassId
            }
          });

          // 5. Acordare rol de Discord
          const member = await interaction.guild.members.fetch(discordUserId);
          if (member) {
            await member.roles.add(roleId).catch(err => console.error("Could not add role: ", err));
            roleGranted = true;
            grantedPasses.push(gamePassId);
          }
        }
      }

      if (roleGranted) {
        return interaction.editReply(`✅ Revendicare cu succes! Ai primit rolul VIP corespunzător.`);
      } else {
        return interaction.editReply(`❌ Nu a fost găsit niciun Gamepass valid, nou cumpărat, pe contul **${robloxUsername}**. Ai grijă ca inventarul tău de Roblox să fie PUBLIC. Dacă ai făcut /claim deja, gradul a fost salvat.`);
      }

    } catch (error) {
      console.error(error);
      return interaction.editReply(`Eroare internă la conectarea sistemului Roblox. Te rog deschide un ticket!`);
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);