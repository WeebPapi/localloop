# LocalLoop

LocalLoop is a local B2B rewards network: an advertiser runs a campaign, nearby
host businesses help customers unlock rewards, and verified redemption produces
a visible outcome. The repository currently contains a polished product demo and
a separate Solana devnet technical proof.

## Two layers

### Product app

Open `/` and explore the landing page, sign-up flow, customer deal browsing,
business dashboard, and campaign wizard. This experience is mocked in the
browser: it needs no Phantom wallet, backend, or Solana configuration.

```text
https://localloop-murex.vercel.app
```

### Live demo

The `/live/*` routes demonstrate server-authoritative state, wallet message
verification, and real Solana devnet receipts. They require:

1. A browser with Phantom (or a compatible Wallet Standard wallet) installed
   and unlocked.
2. A reachable backend, started locally with `npm run dev` or `npm start`, or
   exposed through a tunnel.

For a quick product walkthrough, start at `/`. The live demo is a separate,
technical proof with its own setup requirements.

## Quick start

```bash
cp .env.example .env
npm install
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:3001

```bash
npm run typecheck
npm run test
npm run build
npm start
npm run solana:check
```

Node.js 20 or newer is required.

The app starts safely without Solana secrets:

- `/api/health` returns `solanaReady: false`.
- Non-Solana pages and valid state transitions remain usable.
- Funding and payout actions return clear configuration errors; they never
  fabricate an Explorer receipt.

## Solana demo safety

1. The advertiser wallet signs a plaintext authorization using `signMessage`;
   it does not transfer funds or pay fees.
2. After verification, the server treasury records a memo-style funding proof
   on Solana devnet. Campaign funding remains simulated application state.
3. After redemption validation, the server treasury can send exactly `0.005`
   faucet-issued devnet SOL to the demo host wallet.

The connected wallet must never send, sign, or pay for a transaction.

## Local devnet setup

Create a local `.env` from `.env.example`, never commit it, and supply:

1. `DEMO_TREASURY_SECRET_KEY`: a disposable devnet-only server keypair.
2. `DEMO_HOST_PUBLIC_KEY`: the demo payout destination.
3. `SOLANA_RPC_URL`: a devnet endpoint.
4. `SOLANA_CLUSTER=devnet` exactly.

Fund the treasury with faucet SOL, unlock Phantom for the advertiser signing
walkthrough, and run `npm run solana:check` before the live demo. An optional
public tunnel can be started with `ngrok http 3001` after `npm run build && npm
start`.

## Documentation

- [`AGENTS.md`](./AGENTS.md): agent rules and documentation-update gate
- [`docs/`](./docs/README.md): canonical vision, Georgia MVP scope, current
  state, architecture, and decisions
- [`CLAUDE.md`](./CLAUDE.md): concise agent-rules mirror
- [`DESIGN_LANGUAGE.md`](./DESIGN_LANGUAGE.md): canonical visual system
