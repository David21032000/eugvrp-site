# EUGVRP Website - Configurare Discord Bot

## Rezumat Modificări

### ✅ Completat:

1. **Branding actualizat**:
   - "Elite Unite Greenville Roleplay" → "Europa Greenville Roleplay Community"
   - Număr membri schimbat din "1000+" în "5000+" (mai realist)

2. **VIP Tiers redenumite**:
   - VIP → VIP (păstrat)
   - VIP+ → **Patron**
   - Donator → **SuperM** (Super Member)

3. **Aplicație Session Host adăugată**:
   - Pagină nouă: `/apply/sessionhost`
   - Întrebări specifice pentru rolul de Session Host
   - Adăugat în secțiunea de facțiuni pe homepage

4. **Admin Panel îmbunătățit**:
   - Login cu username/parolă
   - Distribuție pe facțiuni în dashboard
   - Accept/Respinge aplicații cu notă de evaluare
   - Persistență sesiune via localStorage
   - Design îmbunătățit cu animații

5. **Integrare Discord**:
   - Webhook pentru notificări când se primește o aplicație
   - Webhook pentru notificări când se acceptă/respinge
   - Auto-assign rol Discord la acceptare

---

## Configurare Discord Bot

### 1. Creează un Discord Bot

1. Mergi la [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" și denumește-l "EUGVRP Bot"
3. Mergi la secțiunea "Bot" din meniul din stânga
4. Click "Reset Token" și copiază token-ul (îl vei folosi în `.env`)

### 2. Permisiuni necesare

În secțiunea "Bot", activează:
- ✅ **SERVER MEMBERS INTENT**
- ✅ **MESSAGE CONTENT INTENT**

### 3. Invită bot-ul pe server

Mergi la "OAuth2" → "URL Generator":
- Selectează scope: `bot`, `applications.commands`
- Permisiuni bot: `Manage Roles`, `Send Messages`, `Embed Links`, `Mention Everyone`

Copiază URL-ul generat și deschide-l pentru a invita bot-ul.

### 4. Găsește Guild ID

1. Activează "Developer Mode" în Discord (Setări → Avansat)
2. Right-click pe numele serverului → "Copy Server ID"
3. Acesta este `DISCORD_GUILD_ID`

### 5. Creează Webhook

1. Mergi pe canalul unde vrei să primești notificări
2. Setări canal → Integrări → Webhooks → "New Webhook"
3. Copiază URL-ul webhook-ului (acesta este `DISCORD_WEBHOOK_URL`)

### 6. Creează Rolurile

Creează rolurile pentru fiecare facțiune și copiază ID-urile:
1. Creează rolul (ex: "👮 Poliție", "⚡ Session Host")
2. Right-click pe rol → "Copy Role ID"
3. Salvează aceste ID-uri în `.env`

---

## Variabile Environment

Actualizează fișierul `.env` cu următoarele:

```env
# Database
DATABASE_URL="file:./dev.db"

# Discord Configuration
DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN"
DISCORD_BOT_TOKEN="YOUR_BOT_TOKEN"
DISCORD_GUILD_ID="YOUR_GUILD_ID"

# Discord Role IDs (pentru auto-assign la acceptare)
DISCORD_ROLE_POLICE="ROLE_ID_HERE"
DISCORD_ROLE_STAFF="ROLE_ID_HERE"
DISCORD_ROLE_FIREFIGHTER="ROLE_ID_HERE"
DISCORD_ROLE_DOT="ROLE_ID_HERE"
DISCORD_ROLE_SESSIONHOST="ROLE_ID_HERE"

# NextAuth (pentru autentificare - optional)
NEXTAUTH_SECRET="your-secret-key-min-32-characters"
NEXTAUTH_URL="http://localhost:3000"
```

---

## Creare Cont Admin

Pentru a crea un cont de admin, rulează comanda SQL în baza de date:

```sql
-- Folosește bcrypt pentru hash (sau parola simplă pentru dev)
INSERT INTO AdminUser (id, discordUserId, discordUsername, passwordHash, role, active)
VALUES (
  lower(hex(randomblob(16))),
  'YOUR_DISCORD_ID',
  'your_username',
  '$2a$10$...', -- bcrypt hash sau 'admin123' pentru dev
  'admin',
  true
);
```

Sau folosește parola simplă `admin123` pentru development.

---

## Migrare Database

După modificarea schemei, rulează:

```bash
# Generare migrare
npx prisma migrate dev --name add_sessionhost_and_role_system

# Sau pentru SQLite (fără migrări):
npx prisma db push

# Generare client Prisma
npx prisma generate
```

---

## Pornire Aplicație

```bash
# Development
npm run dev

# Build production
npm run build
npm start
```

---

## Structură Facțiuni

| Facțiune | URL | Rol Discord |
|----------|-----|-------------|
| Poliție | `/apply/politie` | `DISCORD_ROLE_POLICE` |
| Pompieri | `/apply/pompieri` | `DISCORD_ROLE_FIREFIGHTER` |
| DOT | `/apply/dot` | `DISCORD_ROLE_DOT` |
| Staff | `/apply/staff` | `DISCORD_ROLE_STAFF` |
| Session Host | `/apply/sessionhost` | `DISCORD_ROLE_SESSIONHOST` |

---

## Funcționalități Noi

### Notificări Discord:

1. **Aplicație nouă primită** → Webhook pe canalul de aplicări
2. **Aplicație acceptată** → Notificare + auto-assign rol
3. **Aplicație respinsă** → Notificare cu motiv

### Admin Panel:

- Accesibil la: `/admin`
- Login cu username/parolă
- Dashboard cu statistici
- Review aplicații cu Accept/Respinge
- Notă de evaluare (opțională)
- Distribuție pe facțiuni

---

## Troubleshooting

### Bot nu assignează roluri?

1. Verifică dacă bot-ul este deasupra rolurilor pe care vrei să le assigneze în ierarhia de permisiuni
2. Verifică dacă token-ul este corect
3. Verifică dacă Guild ID este corect
4. Asigură-te că bot-ul are permisiunea "Manage Roles"

### Webhook nu funcționează?

1. Verifică URL-ul webhook-ului
2. Asigură-te că webhook-ul nu a fost șters din Discord
3. Verifică console logs pentru erori

### Login nu funcționează?

1. Verifică dacă există utilizator în tabela AdminUser
2. Pentru development, folosește parola `admin123`
3. Verifică console logs pentru erori

---

## Link-uri Importante

- **Homepage**: `http://localhost:3000`
- **Admin Panel**: `http://localhost:3000/admin`
- **Aplicații**:
  - `/apply/politie`
  - `/apply/pompieri`
  - `/apply/dot`
  - `/apply/staff`
  - `/apply/sessionhost`

---

Pentru întrebări sau probleme, contactează developer-ul sau consultă documentația Next.js.
