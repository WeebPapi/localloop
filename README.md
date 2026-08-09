# LocalLoop

Hackathon demo: a local B2B rewards network where an advertiser runs a campaign,
nearby host businesses unlock customer rewards, and verified redemption triggers
a host payout on Solana **devnet** — without moving funds from the connected
advertiser wallet.

## Two layers (please read)

**1. Product app — open `/` and click around.** The landing page, sign-up,
customer deal browsing, and the business dashboard with its create-campaign
wizard are fully mocked in the browser. No Phantom, no backend, no config.

```text
https://localloop-murex.vercel.app
```

**2. Working Solana MVP — `/live/*`.** The server-authoritative state machine
with real wallet signatures and devnet receipts. It depends on:

1. A browser with the **Phantom** wallet extension installed and unlocked
2. A reachable **backend** (local `npm run dev` / `npm start`, or a tunnelled API)

Without Phantom + API those routes cannot complete the wallet / funding / payout
path, so a quick judge pass should start at `/`.

**In our demo video we show both:**

1. The **product app** at `/` — landing, dual account types, customer deal
   claiming, and the business campaign wizard
2. The **working MVP** at `/live/*` on our device (Phantom + backend) — real
   `signMessage` authorization and server-funded Solana **devnet** receipts

## Quick start (app without Solana secrets)

```bash
cp .env.example .env   # fill Solana secrets when ready (see below)
npm install
npm run dev
```

- Frontend: http://localhost:5173  
- API: http://localhost:3001  

```bash
npm run typecheck
npm run test
npm run build
npm start              # serves API + dist/
npm run solana:check   # safe readiness check (never prints the private key)
```

Requires Node.js 20+.

The app starts safely when Solana secrets are missing:

- `/api/health` returns `solanaReady: false`
- Non-Solana pages and state transitions remain usable where valid
- Funding / payout actions return clear configuration errors (no fake Explorer receipts)

## Solana use cases (what chain is for)

1. **Advertiser authorization** — Magnolia’s connected wallet signs a plaintext
   challenge with `signMessage` only (no transfer, no fee).
2. **Funding proof** — after verification, the **server treasury** submits a
   memo-only transaction on Solana **devnet**. Campaign funding stays simulated.
3. **Host payout** — after redemption validation, the **server treasury** sends
   exactly **0.005** faucet-issued devnet SOL to `DEMO_HOST_PUBLIC_KEY` with the
   canonical payout memo. Idempotent per claim ID.

## Manual Solana setup checklist

Create a local `.env` (never commit it) from `.env.example`, then supply:

1. **`DEMO_TREASURY_SECRET_KEY`** — base58 secret of a disposable **devnet-only**
   keypair (server fee payer + memo/payout signer).
2. **`DEMO_HOST_PUBLIC_KEY`** — Camora demo wallet public address (payout destination).
3. **`SOLANA_RPC_URL`** — e.g. `https://api.devnet.solana.com` (must be devnet).
4. Keep **`SOLANA_CLUSTER=devnet`** exactly.
5. Fund the treasury public address at [faucet.solana.com](https://faucet.solana.com/)
   with enough faucet SOL for fees + one `0.005` payout.
6. Install / unlock **Phantom** (or another Wallet Standard wallet) for the
   Magnolia advertiser `signMessage` walkthrough — that wallet does **not** need
   funds for transfers.
7. Run `npm run solana:check` and confirm `solanaReady: true`.
8. Optional public tunnel: `ngrok http 3001` after `npm run build && npm start`
   (relative `/api` URLs — no CORS changes).

## Docs for agents

- [`AGENTS.md`](./AGENTS.md) — detailed repository rules
- [`CLAUDE.md`](./CLAUDE.md) — concise mirror
- [`DESIGN_LANGUAGE.md`](./DESIGN_LANGUAGE.md) — canonical visual specification
- [`CONTEXT_HANDOVER.md`](./CONTEXT_HANDOVER.md) — architecture & demo story
- [`HACKATHON_EPICS.md`](./HACKATHON_EPICS.md) — epics & acceptance criteria
