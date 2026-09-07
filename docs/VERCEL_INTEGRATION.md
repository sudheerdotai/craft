# Vercel Integration & OAuth Architecture

**Craft** leverages Vercel's OAuth & REST API ecosystem to give users a zero-friction "vibe coding" experience while preserving a pure **Bring Your Own Key (BYOK)** philosophy.

---

## ⚡ How "Sign in with Vercel" Works

By connecting their Vercel account via OAuth (`https://vercel.com/oauth/authorize`), users grant Craft access to manage resources on their personal account or team space.

```
┌─────────────────┐       OAuth Authorization        ┌───────────────────────┐
│                 ├─────────────────────────────────►│                       │
│  User in Craft  │                                  │  Vercel OAuth Server  │
│                 │◄─────────────────────────────────┤                       │
└────────┬────────┘       User Access Token          └───────────────────────┘
         │
         ├───► Vercel AI Gateway (LLM Routing)
         ├───► One-Click App Deployment (/v13/deployments)
         ├───► Database Provisioning (Vercel Postgres / Neon)
         └───► Media & Asset Storage (Vercel Blob)
```

---

## 🛠️ Integrated Vercel Services

### 1. 🤖 Vercel AI Gateway

- **Function**: Routes prompt requests to top LLM models (Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 Pro) using the user's Vercel token or OIDC credentials.
- **Benefit**: Users don't need to manually copy individual API keys for Anthropic, OpenAI, or Google—Vercel AI Gateway handles routing and usage limits directly on their Vercel account.

### 2. 🚀 One-Click App Publishing

- **Function**: Craft generates Next.js project code in real-time and deploys it using the Vercel Deployments API (`POST /v13/deployments`).
- **Benefit**: Instantly provisions live URLs (e.g., `my-vibe-app.vercel.app`) with SSL certificates and automatic preview environments.

### 3. 💾 Vercel Postgres & Storage

- **Function**: Automatically creates databases (Vercel Postgres) and key-value stores (Vercel KV / Edge Config) via Vercel REST APIs (`/v1/storage/stores`).
- **Benefit**: Generated Next.js apps with Prisma, Drizzle, or raw SQL get database connection strings automatically injected into environment variables.

### 4. 🖼️ Vercel Blob (Image & Media Storage)

- **Function**: Provisions Vercel Blob stores for handling file uploads, user avatars, and AI-generated image assets.
- **Benefit**: Zero-config asset hosting with CDN distribution out of the box.

---

## 🔐 Security & Privacy (BYOK Principle)

- **Zero Middleware Storage**: OAuth tokens and API keys remain encrypted in client-side secure cookies or local user sessions.
- **Direct Resource Billing**: All compute, AI gateway calls, and storage costs are billed directly to the user's Vercel free/pro tier.
- **Open Source Transparency**: Users can audit the exact API calls made on their behalf.
