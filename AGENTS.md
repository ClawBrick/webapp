# AGENTS.md — ClawBrick Webapp

Developer reference for the ClawBrick webapp. Read this before making changes.

---

## What Is This

**ClawBrick** is a platform for deploying autonomous AI agents (called **OpenClaw** instances) onto cloud VMs. Users connect a Solana wallet, authenticate via message signing, then provision an AI agent running on UpCloud infrastructure via Terraform. Agents are controlled through a Telegram bot.

- **Frontend**: Next.js 16 (App Router), Vanilla CSS with CSS variables (clay design system), Framer Motion
- **Auth**: Solana wallet connect via [Reown AppKit](https://docs.reown.com/appkit) — no traditional auth
- **Backend**: Next.js API routes + Supabase (Postgres + RLS)
- **Infra**: UpCloud VMs provisioned via Terraform, executed server-side

---

## Local Dev Setup

```bash
# Install deps
pnpm install

# Copy env and fill in values (see section below)
cp .env.example .env

# Run dev server (port 3000)
pnpm dev
```

**Node version**: 20+. Use `pnpm`, not `npm`.

---

## Environment Variables

All variables live in `.env`. Never commit `.env` — only `.env.example`.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Server-side Supabase admin (API routes only) |
| `NEXT_PUBLIC_REOWN_PROJECT_ID` | ✅ | Reown AppKit wallet connect project ID |
| `NEXT_PUBLIC_HELIUS_RPC_URL` | ✅ | Helius Solana RPC — used for balance + SNS lookup |
| `UPCLOUD_USERNAME` | ✅ | UpCloud API username for Terraform |
| `UPCLOUD_PASSWORD` | ✅ | UpCloud API password for Terraform |
| `ENCRYPTION_KEY` | ✅ | 32-byte hex — encrypts Telegram tokens at rest |
| `CONTROL_SERVER_IP` | ✅ | IP of your control server (SSH whitelist in firewall) |
| `CLAWBRICK_DOMAIN` | optional | Base domain for agent subdomains (default: clawbrick.com) |
| `ADMIN_EMAIL` | optional | Let's Encrypt cert email (default: support@clawbrick.com) |

---

## Project Structure

```
webapp/
├── app/                        # Next.js App Router
│   ├── page.tsx                # Landing page (hero, features, manifesto CTA)
│   ├── manifesto/page.tsx      # Manifesto + 100K builder reward + email register
│   ├── agents/
│   │   ├── page.tsx            # Agent list dashboard
│   │   └── deploy/page.tsx     # Deploy new agent form
│   ├── profile/page.tsx        # Wallet profile: SNS name, SOL balance, tx history
│   ├── genevieve/page.tsx      # Hardware showcase page
│   ├── pricing/page.tsx        # Pricing page
│   ├── skills/page.tsx         # Skills marketplace
│   └── api/
│       ├── agents/route.ts         # GET: list user's agents
│       ├── agents/[id]/route.ts    # DELETE: destroy agent
│       └── agents/launch/route.ts  # POST: provision new agent via Terraform
│
├── components/
│   ├── Navbar.tsx              # Top nav — wallet connect, auth, SNS/balance fetch
│   ├── UserMenu.tsx            # Wallet popup — SNS badge, SOL balance, copy address
│   ├── AuthGuard.tsx           # Wraps pages that require wallet auth
│   ├── SignMessageModal.tsx    # Signature prompt modal on first connect
│   ├── Footer.tsx
│   ├── Providers.tsx           # Reown + theme providers
│   └── ui/ClayCard.tsx         # Design system: ClayCard, ClayButton, ClaySelect
│
├── lib/
│   ├── solana.ts               # getBalance(), getSNSDomain(), formatAddress()
│   ├── supabase.ts             # Supabase client, Agent type, UPCLOUD_ZONES const
│   ├── terraform/
│   │   └── provisioner.ts      # TerraformProvisioner class — runs tf commands
│   └── utils.ts                # cn() classname helper
│
├── terraform/openclaw/
│   ├── main.tf                 # UpCloud provider, upcloud_server, firewall rules
│   ├── variables.tf            # All TF input variables
│   └── bootstrap.sh            # Cloud-init script runs on VM boot
│
└── supabase/
    └── schema.sql              # Full DB schema — run in Supabase SQL editor
```

---

## Authentication Flow

1. User clicks **Connect Wallet** → Reown AppKit opens
2. On connect, `Navbar.tsx` detects `isConnected && !isAuthenticated` → auto-opens `SignMessageModal`
3. User signs a message (no on-chain tx) → signature stored in `localStorage`
4. On successful sign: balance + SNS domain fetched in parallel from Helius RPC, stored in `localStorage`
5. `AuthGuard` checks `localStorage.wallet_authenticated === "true"` — redirects to home if not set

**Key localStorage keys:**
- `wallet_address` — connected wallet address
- `wallet_authenticated` — `"true"` when signed
- `wallet_balance` — cached SOL balance string (e.g. `"1.45 SOL"`)
- `wallet_sns` — cached `.sol` domain name if found (e.g. `"alice.sol"`)

---

## SNS Integration

SNS domain resolution uses the **Helius DAS `searchAssets` API** — no extra npm package needed. The function `getSNSDomain(address)` is in `lib/solana.ts`.

It filters owned NFT assets by the SNS collection (`HYi4MBbZsZMM9UiMgtMN4FtPtMQVD91sF5vFrpZgR13`) and picks the shortest `.sol` name as the primary domain.

- Returns `null` gracefully if no domain found
- Results are cached in `localStorage` under `wallet_sns`
- The `UserMenu` navbar button shows SNS name instead of truncated address when available

---

## Agent Provisioning Flow

```
User submits deploy form
        ↓
POST /api/agents/launch
        ↓
 1. Validate inputs
 2. Create agent row in Supabase (status: "provisioning")
 3. Return agent.id immediately to client
        ↓ (background, async)
 4. TerraformProvisioner.provisionAgent(vars)
    - writes terraform.tfvars to /tmp/<agentId>/
    - runs: terraform init → terraform apply
    - reads outputs: instance_id, main_ip
 5. Update agent row: status → "running", instance_id, instance_ip, gateway_url
```

**Terraform workspace**: each agent gets its own temp dir at `/tmp/openclaw-<agentId>/`. The Terraform module lives at `terraform/openclaw/`.

**TerraformVars** (see `lib/terraform/provisioner.ts`):
- `upcloud_username` / `upcloud_password`
- `upcloud_zone` (default: `sg-sin1` — Singapore)
- `upcloud_plan` (default: `1xCPU-2GB`)
- `ssh_public_keys` — list of public keys to authorise on the server

---

## Database Schema

Key tables (see `supabase/schema.sql` for full DDL):

### `agents`
| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `user_id` | UUID | FK → `users.id` |
| `status` | TEXT | `pending\|provisioning\|ready\|running\|stopped\|error\|destroyed` |
| `upcloud_instance_id` | TEXT | UpCloud server ID (from TF output) |
| `main_ip` | TEXT | VM public IP |
| `subdomain` | TEXT | e.g. `abc123` → `abc123.clawbrick.com` |
| `deploy_region` | TEXT | UpCloud zone (e.g. `sg-sin1`) |
| `llm_provider` | TEXT | `anthropic\|openai\|openrouter\|ollama` |
| `llm_model` | TEXT | Model name |
| `telegram_bot_token_encrypted` | TEXT | AES-encrypted with `ENCRYPTION_KEY` |
| `provisioning_logs` | JSONB | Array of `{timestamp, message, level}` |

> **⚠️ Schema note**: `supabase/schema.sql` still references `vultr_instance_id`. Run this migration in Supabase SQL Editor:
> ```sql
> ALTER TABLE agents RENAME COLUMN vultr_instance_id TO upcloud_instance_id;
> ALTER TABLE agents ALTER COLUMN deploy_region SET DEFAULT 'sg-sin1';
> ```

---

## UpCloud / Terraform

Provider: `UpCloudLtd/upcloud ~> 5.0`

**Authentication**: username + password (not API token). Set `UPCLOUD_USERNAME` and `UPCLOUD_PASSWORD` in `.env`.

**Key zones:**
| Zone | Location |
|---|---|
| `sg-sin1` | Singapore (default) |
| `de-fra1` | Frankfurt |
| `uk-lon1` | London |
| `fi-hel1` | Helsinki |
| `us-nyc1` | New York |
| `au-syd1` | Sydney |

**Key plans:** `1xCPU-1GB`, `1xCPU-2GB` (default), `2xCPU-4GB`, `4xCPU-8GB`

To test Terraform locally:
```bash
cd terraform/openclaw
cp terraform.tfvars.example terraform.tfvars  # fill in values
terraform init
terraform plan
```

---

## Design System

CSS variables are defined in `app/globals.css` under `:root` and `[data-theme="light"]`.

Key tokens:
- `--clay-surface` — card/panel background
- `--clay-bg-primary` — page background
- `--clay-accent-primary` — brand orange/coral (`#E07A5F`)
- `--clay-accent-indigo` — secondary accent
- `--shadow-clay-floating` — elevated card shadow
- `--shadow-clay-pressed` — inset/depressed shadow
- `--clay-text-primary/secondary/tertiary/muted` — text hierarchy

Use `ClayCard`, `ClayButton`, `ClaySelect` from `components/ui/ClayCard.tsx` — don't write raw shadow classes inline.

---

## CI / Docker

- `.github/workflows/` — CI workflow (check before pushing)
- `Dockerfile` — multi-stage build for production Docker deployment
- `next.config.ts` — set to `output: "standalone"` for Docker

---

## Key External Links

- **Live app**: [clawbrick.com](https://clawbrick.com)
- **Docs**: [docs.clawbrick.com](https://docs.clawbrick.com)
- **Discord**: [discord.gg/clawbrickhq](https://discord.gg/clawbrickhq)
- **Twitter**: [@clawbrickhq](https://twitter.com/clawbrickhq)
- **Reown AppKit docs**: [docs.reown.com/appkit](https://docs.reown.com/appkit)
- **UpCloud Terraform provider**: [registry.terraform.io/providers/UpCloudLtd/upcloud](https://registry.terraform.io/providers/UpCloudLtd/upcloud/latest/docs)
- **Helius RPC**: [helius.dev](https://helius.dev)
