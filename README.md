# ClawBrick

ClawBrick is a platform for easy deployment of openclaw agents. Additionally, Builders can publish and list skills that agents can use to integrate tools into their functionality.

There is also an option to pre-order Genevieve (a hardware unit) that hosts users' agents locally with open-source LLMs, ensuring data and inferences never leave their hardware. 

## Features

- **User Authentication**: Connect with Solana wallets and email via Reown AppKit
- **Agent Deployment**: Create, configure, and manage openclaw agents
- **Skills Marketplace**: Publish and discover skills to extend agent capabilities
- **Hardware Pre-order**: Pre-order local hardware boxes for private AI inference

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Package Manager**: pnpm
- **Authentication**: Reown AppKit with Solana adapter
- **Deployment**: GitHub Pages via GitHub Actions (Static Export)

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- A Reown (formerly WalletConnect) project ID

### Installation

1. Clone the repository:
```bash
git clone https://github.com/clawbrick/webapp.git
cd webapp
```

2. Install dependencies:
```bash
pnpm install
```

3. Copy the environment variables file:
```bash
cp .env.example .env.local
```

4. Fill in your environment variables:
```env
NEXT_PUBLIC_REOWN_PROJECT_ID=your_reown_project_id
```

5. Run the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_REOWN_PROJECT_ID` | Your Reown project ID | Yes |

## Project Structure

```
webapp/
├── app/                    # Next.js App Router
│   ├── agents/            # Agents page
│   ├── skills/            # Skills marketplace page
│   ├── preorder/          # Hardware pre-order page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Navbar.tsx         # Navigation bar
│   └── Providers.tsx      # App providers (AppKit)
├── lib/                   # Utility libraries
│   ├── mock-db.ts         # Mock database (localStorage)
│   └── utils.ts           # Helper functions
├── supabase/              # Database
│   └── schema.sql         # Database schema (for future server deployment)
├── types/                 # TypeScript types
│   └── index.ts           # Type definitions
├── .github/workflows/     # CI/CD
│   └── deploy.yml         # GitHub Actions workflow
├── next.config.ts         # Next.js configuration
└── package.json           # Dependencies
```

## Deployment

This project is configured to deploy to GitHub Pages via GitHub Actions using static export.

### Setup

1. Go to your repository Settings → Pages
2. Set Source to "GitHub Pages"
3. Select "GitHub Actions" as the source
4. Add the following secret in Settings → Secrets and variables → Actions:
   - `NEXT_PUBLIC_REOWN_PROJECT_ID`: Your Reown project ID

5. Push to the `main` or `master` branch to trigger deployment

### Manual Deployment

You can also trigger deployment manually from the Actions tab.

### Local Build Test

To test the static export locally:

```bash
pnpm build
# Serve the dist folder
npx serve dist
```

## Architecture Notes

This implementation uses a **static export** approach suitable for GitHub Pages:

- **Client-side storage**: Uses localStorage for data persistence (mock database)
- **Client-side auth**: Wallet-based authentication with Reown AppKit
- **No server required**: All functionality works in the browser

For a production deployment with a backend:
1. Uncomment and configure the Supabase integration in `lib/supabase.ts`
2. Set up the database using `supabase/schema.sql`
3. Configure server environment variables
4. Deploy to a platform supporting serverless functions (Vercel, Netlify, etc.)

## Sample Data

The app comes pre-loaded with sample skills:
- Twitter Integration
- Discord Bot
- Data Analysis
- Web Scraping
- Solana Wallet

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Reown](https://reown.com/) for the wallet connection SDK
- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
