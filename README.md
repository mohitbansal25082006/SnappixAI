Here's the consolidated and well-formatted README.md file:

```markdown
# 📸 Snappix – AI Design-System Generator

![Deployed on Render](https://img.shields.io/badge/deployed%20on-Render-46e3b7?style=flat-square)

Drop a Figma screenshot → get a **production-ready React component** with **Tailwind CSS**, **Storybook stories**, **design tokens**, and **version history** – all in under 30 seconds.

## 🚀 Live Demo

**[https://snappix.onrender.com](https://snappix.onrender.com)**

## 🔥 Features

- 📤 **Drag-&-Drop Upload** - PNG, JPG, WebP screenshots accepted (≤ 5 MB)
- 🤖 **AI Vision** - GPT-4o parses layout, colors, typography & spacing
- ⚡ **Live Code Editor** - Monaco Editor + real-time Sandpack preview
- 🔄 **Version Control** - Save, diff, and restore every iteration
- 📦 **One-Click Export** - React component, Storybook stories, Tailwind tokens, or full Next.js starter
- 🔐 **Auth & Multi-tenancy** - Clerk-powered sign-in / sign-up per user
- 🗄️ **Cloud Native** - PostgreSQL (Supabase), Vercel Blob storage, Render Hosting

## 🛠️ Tech Stack

**Frontend**  
Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui

**Editor**  
Monaco Editor, Sandpack

**AI**  
OpenAI GPT-4o Vision

**Storage**  
Vercel Blob (images), PostgreSQL via Supabase

**Auth**  
Clerk

**Deployment**  
Render (Dockerless, auto-scaling)

## 🚀 Getting Started

### Quick Local Start

```bash
# 1. Clone & install
git clone https://github.com/mohitbansal25082006/snappixai.git
cd snappixai
npm install

# 2. Env vars
cp .env.example .env.local
# Fill in OpenAI, Clerk, Database & Blob credentials

# 3. DB & Prisma
npx prisma generate
npx prisma db push

# 4. Dev
npm run dev
```

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `OPENAI_API_KEY` | GPT-4o Vision |
| `POSTGRES_PRISMA_URL` | Supabase PostgreSQL |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk client key |
| `CLERK_SECRET_KEY` | Clerk server key |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage |

## 📖 How It Works

1. **Sign in** with Clerk
2. **Create a project** or pick an existing one
3. **Upload a screenshot** → Snappix runs AI analysis
4. **Edit** in the live Monaco editor with instant preview
5. **Save versions** – compare any two visually
6. **Export** as ZIP:
   - Single component
   - Complete design-system package
   - Ready-to-run Next.js project

## 📦 Export Formats

| Format | Contents |
|--------|----------|
| **React Component** | `.tsx`, `.css`, `package.json` |
| **Storybook Story** | `.stories.tsx`, knobs & controls |
| **Design Tokens** | `design-tokens.json`, `variables.css` |
| **Next.js Starter** | Full project with routing, Tailwind, TypeScript |

## 🎯 Use Cases

- **Design-to-Dev Handoff** – eliminate manual coding
- **Rapid Prototyping** – test UI ideas in minutes
- **Design-System Building** – generate reusable tokens & components
- **Portfolio Sites** – showcase components with live Storybook

## 🔐 Security

- **Clerk** for password-less, social & magic-link auth
- **Prisma Query Logging** off in production
- **HTTPS only** via Render + Cloudflare
- **No PII** stored in logs or telemetry

## 📊 Performance

- **Global CDN** via Render
- **Prisma Accelerate** (optional) for sub-50 ms queries
- **Lazy-loading** images, code-splitting, ISR on demand

## 🤝 Contributing

Found a bug or want a feature?  
Open an issue or PR – all contributions welcome!

## 🙏 Acknowledgements

- **OpenAI** for GPT-4o Vision
- **Clerk** for frictionless auth
- **Render** for zero-config deployment
- **shadcn/ui** for beautiful components

---

**Happy building!** 🎉
```

This version:
1. Maintains all the original content
2. Improves organization and readability
3. Uses consistent formatting
4. Preserves all markdown features
5. Is contained within a single markdown code block as requested
6. Adds a deployment badge for visual appeal
7. Groups related information more logically
