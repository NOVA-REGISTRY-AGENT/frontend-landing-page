# NOVA REGISTRY | Autonomous AI Payments on Stellar

The first autonomous AI agent ecosystem for machine-to-machine payments on the Stellar blockchain. Protect your AI-generated music IP with the x402 protocol and Soroban smart contracts.

## 🚀 Features

- **Claude AI Powered:** Leverages Claude Haiku for intelligent decision-making. The agent autonomously decides when and how to register your music IP.
- **x402 Protocol:** Native HTTP payment barriers. When the agent hits a 402 Payment Required response, it automatically handles micropayments.
- **Soroban Smart Contracts:** Secure, rust-based smart contracts handle the intellectual property registration on-chain.
- **Ed25519 Signatures:** Industry-standard cryptography ensures every AI transaction is cryptographically verifiable.
- **Instant Settlements:** Leveraging the Stellar network for sub-5-second finality on all machine-to-machine payments.
- **Machine Economy:** Fully automated workflows from IP generation to on-chain registration without human intervention.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) & Custom UI
- **Blockchain:** Stellar SDK & Soroban

## 📦 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18.x or later is recommended).

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd frontend-nova-2
   ```

2. Install the dependencies:
   ```bash
   npm install --legacy-peer-deps
   # or using pnpm
   pnpm install
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💻 Simulation Demo

Navigate to `/simulation` or click the "Demo" button on the hero section to see a real-time visual simulation of the autonomous agent interacting with the Stellar blockchain, resolving a 402 payment, and securing a music file IP.
