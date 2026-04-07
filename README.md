# EUGVRP Website

Website modern pentru serverul de roleplay EUGVRP (Europa Greenville Roleplay Community) pe Roblox.

## Caracteristici

- 🎨 Design modern cu animații Framer Motion
- 📱 Responsive (funcționează pe mobil și PC)
- 🛒 Sistem de shop pentru roluri VIP
- 📝 Formulare de aplicare pentru facțiuni (Poliție, Pompieri, DOT, Staff)
- 🔗 Integrare cu Discord webhook pentru notificări
- 🔐 Panou de administrare pentru gestionarea aplicațiilor
- 💾 Bază de date SQLite cu Prisma ORM

## Tehnologii

- Next.js 14 + TypeScript
- Tailwind CSS
- shadcn/ui components
- Framer Motion
- Prisma ORM + SQLite
- Discord Webhooks

## Instalare locală

```bash
# Instalează dependențele
npm install

# Configurează baza de date
npx prisma migrate dev

# Rulează aplicația în mod dezvoltare
npm run dev
```

Accesează http://localhost:3000

## Configurare Discord Webhook

1. Mergi pe canalul de Discord unde vrei să primești notificări
2. Click dreapta → Setări canal → Integrări → Webhooks
3. Creează un webhook și copiază URL-ul
4. Adaugă URL-ul în fișierul `.env` la variabila `DISCORD_WEBHOOK_URL`

## Deployment Gratuit pe Vercel

### Opțiunea 1: Vercel CLI (Recomandat)

```bash
# Instalează Vercel CLI
npm i -g vercel

# Login și deploy
vercel login
vercel
```

### Opțiunea 2: GitHub + Vercel

1. Creează un repository pe GitHub
2. Încarcă codul pe GitHub
3. Mergi pe https://vercel.com/new
4. Importă repository-ul
5. Setează variabilele de mediu
6. Click "Deploy"

### Opțiunea 3: Netlify

1. Încarcă codul pe GitHub
2. Mergi pe https://www.netlify.com/
3. Click "Add new site" → "Import an existing project"
4. Alege GitHub și repository-ul
5. Configurează build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

## Structura Proiectului

```
eugvrp-website/
├── src/
│   ├── app/              # Pagini Next.js
│   │   ├── api/          # API Routes
│   │   ├── apply/        # Pagini aplicare facțiuni
│   │   ├── admin/        # Panou administrare
│   │   └── page.tsx      # Pagina principală
│   ├── components/       # Componente reutilizabile
│   │   ├── ui/          # Componente shadcn/ui
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   └── lib/             # Utilitare (Prisma, Discord)
├── prisma/
│   └── schema.prisma    # Schema bazei de date
└── public/              # Fișiere statice
```

## Configurare Admin Panel

Parola implicită pentru panoul de admin este: `admin123`

**IMPORTANT**: În producție, configurează autentificare cu NextAuth!

## Pagini disponibile

- `/` - Pagina principală
- `/apply/politie` - Aplicare Poliție
- `/apply/pompieri` - Aplicare Pompieri
- `/apply/dot` - Aplicare DOT
- `/apply/staff` - Aplicare Staff
- `/admin` - Panou de administrare

## Discord Server

https://discord.gg/pEZEWVnNjV

---

Creat cu ❤️ pentru comunitatea Europa Greenville Roleplay Community (EUGVRP)
