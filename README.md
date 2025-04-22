# DG Mimarlik Website

A responsive, server-side rendered architecture studio website built with **Next.js 15 App Router**, **Firebase Realtime Database**, and **YouTube API**.

---

## 📁 Folder Structure

```
app/
├── layout.js              → App layout and metadata
├── page.js                → Home page (with featured sections)
├── projects/
│   └── page.js            → Project list with tag filtering (SSR)
│   └── [id]/page.js       → Project detail page (SSR + static paths)
├── videos/page.js         → YouTube embedded video gallery
├── admin/                 → Firebase-admin authenticated panel
│   ├── references/        → Admin page for adding/editing projects
│   └── companys/          → Admin page for partner companies
components/
├── Footer.js              → Footer section (SSR)
├── Navbar.js              → Navigation bar
├── OurProjects.js         → Home: Recent "completed" projects (SSR)
├── OnGoingProjects.js     → Home: Latest "ongoing" projects (SSR)
├── Companys.js            → Home: Partner companies grid (SSR)
├── ImagePopup.js          → Client-only image popup (modal)
lib/
└── firebaseAdmin.js       → Firebase Admin SDK configuration
firebase.js                → Firebase Client SDK config
.env.local                 → Environment variables (client+server)
public/                    → Static assets (logo, placeholder, etc.)
```

---

## 📦 Dependencies

| Package              | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| next                | Next.js framework with App Router                                           |
| react               | React core                                                                  |
| firebase            | Firebase Client SDK (auth + realtime database)                             |
| firebase-admin      | Firebase Admin SDK for SSR data access                                      |
| react-icons         | Icon set for social and UI icons                                            |
| dotenv              | For handling `.env` configs locally (required by Firebase Admin SDK)        |

---

## 🔐 Environment Variables (`.env.local`)

```
# Firebase Client SDK (for public usage)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_DATABASE_URL=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# YouTube API Key
NEXT_PUBLIC_YOUTUBE_API_KEY=...

# Firebase Admin SDK (server-side only)
FIREBASE_SERVICE_ACCOUNT_KEY={...}   # JSON stringified private key from Firebase service account
```

> You can obtain your `FIREBASE_SERVICE_ACCOUNT_KEY` from Firebase Console → Project Settings → Service Accounts → Generate New Private Key → Paste entire JSON string (escaped).

---

## 💡 What Is SSR vs Client Components Here?

| Page / Component     | Type     | Description                                              |
|----------------------|----------|----------------------------------------------------------|
| `/projects`          | SSR      | Fetches projects + tags, filters by selected tag         |
| `/projects/[id]`     | SSR      | Fetches project detail using static params               |
| `OnGoingProjects.js` | SSR      | Fetches last 3 ongoing projects                          |
| `OurProjects.js`     | SSR      | Fetches last 6 completed projects                        |
| `Footer.js`          | SSR      | Displays latest 3 ongoing projects dynamically           |
| `Companys.js`        | SSR      | Displays all partner companies                          |
| `ImagePopup.js`      | Client   | Enables image click-to-zoom feature with state          |
| `admin/` pages       | Client   | Auth-protected admin panel, real-time DB integration    |
| `videos/page.js`     | Client   | Fetches YouTube videos dynamically with pagination      |

---

## ⚙️ Features

- Fully SSR for SEO critical pages (projects, homepage, footer)
- Firebase Admin SDK for secure Realtime DB reading
- Reusable layout + global styles
- YouTube integration with pagination support
- Admin panel for references and partner companies
- Tagging system with dynamic filtering
- Fully responsive layout and mobile-first design

---

## 🔧 Setup & Run

```bash
git clone https://github.com/your-username/dg-mimarlik.git
cd dg-mimarlik
npm install
cp .env.example .env.local # and fill in your credentials
npm run dev
```

Project will be available at [http://localhost:3000](http://localhost:3000)

---

## ✨ License
This project is built for internal use and portfolio. Contact for reuse or questions.

---

Feel free to customize and extend the architecture for blogs, galleries, or multi-language support.

