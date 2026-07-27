# FlyRank Frontend AI Capstone App

- **Live Preview URL:** https://flyrank-frontend-ai-capstone.vercel.app
- **Repository:** https://github.com/Ekazadex/Flyrank-Frontend-AI-Capstone

## 🚀 FE-04 Deployment & Routes
- `/` — Root Layout & Main Landing Page
- `/overview` — Project Overview & Vision Placeholder
- `/dashboard` — Analytics & Command Center Placeholder
- `/insights` — AI Recommendations & Insights Placeholder
- `/settings` — Profile & Security Settings Placeholder
- `/health` — Server Data Fetching Health-Check Page (JSONPlaceholder integration)

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router, React 19)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment Target:** Vercel

## ⚙️ Getting Started Locally
To set up and run this project locally:

```bash
# Clone the repository
git clone https://github.com/Ekazadex/Flyrank-Frontend-AI-Capstone.git

# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Environment Variables
Create a local environment configuration file based on `.env.example`:

```bash
cp .env.example .env.local
```

Never commit `.env.local` or sensitive secrets to the repository.

## ✅ Submission Checklist (FE-04)
- [x] Live Preview URL configured and deployed on Vercel
- [x] Every screen from the spec exists as a routed placeholder (`/`, `/overview`, `/dashboard`, `/insights`, `/settings`, `/health`)
- [x] Server Components by default; Client Components only where required
- [x] Responsive layout tested across mobile (375px) and desktop (1280px)
- [x] Health-check page fetches and renders external data
- [x] Zero secrets committed to the repository

