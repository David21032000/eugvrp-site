// Script pentru creare cont admin
// Usage: node create-admin.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // CONFIGUREAZĂ AICI DATELE TALE
    const discordUserId = '123456789012345678'; // ÎNLOCUIEȘTE cu Discord ID-ul tău
    const discordUsername = 'numele_tău_discord'; // ÎNLOCUIEȘTE cu username-ul tău
    const password = 'parola_ta_puternica'; // ÎNLOCUIEȘTE cu parola dorită

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = await prisma.adminUser.create({
      data: {
        discordUserId,
        discordUsername,
        passwordHash,
        role: 'admin', // sau 'moderator'
        active: true,
      },
    });

    console.log('✅ Admin creat cu succes!');
    console.log('Username:', discordUsername);
    console.log('Rol:', admin.role);
    console.log('');
    console.log('Accesează: http://localhost:3000/admin');
  } catch (error) {
    console.error('❌ Eroare:', error.message);
    if (error.message.includes('Unique constraint')) {
      console.log('\n💡 Username-ul sau Discord ID-ul există deja în baza de date.');
    }
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
