# LocalLoop — Agent Rules

This is a **new** full-stack hackathon demo. Do not assume an existing POC,
legacy component tree, or reusable client-side domain store. Inspect the repo,
then implement against `CONTEXT_HANDOVER.md` and `HACKATHON_EPICS.md`.

Keep those two docs synchronized with any change to routes, state, IDs, copy,
design, APIs, or Solana behavior. If they conflict, reconcile before coding.
[`DESIGN_LANGUAGE.md`](./DESIGN_LANGUAGE.md) is the single source of truth for
visual decisions.

The repository now contains two layers:

1. **Product app** (`/`, `/auth/*`, `/app/*`, `/business/*`) — the mocked
   landing, auth, customer, and business experience. Client state only.
2. **Live demo** (`/live/*`) — the server-authoritative state machine with real
   wallet signatures and Solana devnet receipts. Fully intact, simply not wired
   into the product app.

Do not delete or weaken the live layer while building product surfaces.

## Ownership boundaries

| Area | Path | Notes |
|------|------|--------|
| Frontend UI | `src/` | Views, components, styles, copy presentation |
| Shared contracts | `shared/` | Types, IDs, API envelopes — notify dependents before changing |
| Server domain | `server/domain/` | Authoritative state, seed, transitions |
| Server API | `server/api/` | REST + SSE |
| Wallet verify | `server/wallet/` | Challenges + Ed25519 verification |
| Solana (server-only) | `server/solana/` | Devnet funding proof + host payout |

Do not edit another active epic owner’s files without coordination.
Only LL-105 may access the server demo treasury secret.

## Architecture

```text
React + Vite frontend
        ↓ REST + Server-Sent Events
Node + Express API
        ├─ server-owned in-memory demo state
        ├─ validated domain transitions
        ├─ Ed25519 wallet-signature verification
        └─ server-only Solana devnet signer
```

- Server state is authoritative; frontend state is a projection.
- No database. No Docker by default. No production auth. No Anchor program.
- Backend restart resets in-memory state — acceptable demo limitation.

### Required scripts (Node 20+)

```bash
npm install
npm run dev          # Vite :5173 + Express :3001 via concurrently
npm run typecheck    # tsc --noEmit (client + server)
npm run build        # typecheck + vite build
npm start            # Express serves API + dist/
```

Every meaningful integration finishes with `npm run typecheck` and `npm run build`.

### Routes

The product app is mock-driven and needs no API. The API + Solana demo lives
under `/live/*`.

Product (mocked, client state only):

```text
/                              Landing
/auth                          Choose account type
/auth/register?type=…          Register as customer or business
/auth/login                    Sign in
/app/deals                     Customer default view
/app/deals/:dealId             Deal detail, criteria, claim actions
/business                      Business dashboard default view
/business/campaigns/new        Create-campaign wizard
```

Live demo (server-authoritative, Solana devnet):

```text
/live
/live/customer/:customerId
/live/business/:businessId/advertiser
/live/business/:businessId/host
```

Live aliases:

```text
/live/customer   → /live/customer/nino
/live/advertiser → /live/business/magnolia-film-lab/advertiser
/live/host       → /live/business/camora/host
```

Reject or redirect a live business workspace when the business lacks that
capability. `/demo-preview` no longer exists; the landing page replaced it.

## Business model

- **Customer** and **business** are the only account types anyone registers as.
- **Advertiser** and **host** are *states derived from data*, not signup choices:
  a business is a **host** when it has accepted deals, and an **advertiser**
  when it owns an active campaign with a budget.
- Same business may advertise one campaign and host another.
- `Business.capabilities[]` remains the server-side representation for the live
  demo; the product app derives the same distinction from campaigns and deals.

Navigation must stay distinct:

- `DemoPersonaSwitcher` — live-demo tooling (Nino / Magnolia / Camora), labelled
  "Demo mode". Only appears under `/live/*`.
- `BusinessWorkspaceSwitcher` — advertiser/host tasks for the same business.

## English copy

All app-owned UI copy must be clear, natural English. Keep business names,
`LocalLoop`, addresses, wallet addresses, signatures, IDs, `SOL`, `devnet`, and
URLs in their conventional form.

- Set `<html lang="en">`.
- Keep user-facing terminology centralized in `src/copy/en.ts`; do not expose
  raw enum values as finished UI copy.
- Prefer direct, concise language. Clearly distinguish simulated funding from
  real server-funded devnet activity.

## Design direction

The visual system is **fixed and specified** in [`DESIGN_LANGUAGE.md`](./DESIGN_LANGUAGE.md).
Read it before touching UI. Summary:

- Concept: a neighborhood rewards network drawn as a survey plan crossed with a
  patch panel. Architectural/blueprint + circuit/systems diagram +
  post-industrial utility labeling, with brutalist information design as accent.
- Recurring motif: the advertiser → host → customer → advertiser loop trace.
- Paper color system: off-white ground, near-black ink, one signal accent, plus
  reserved state colors. Square corners by default.
- Line weight carries meaning (`--line-hair` … `--line-heavy`); do not give
  every box the same border.
- Three type roles: display, interface, and monospace technical. Microtype is
  metadata, never body copy.
- One numbering grammar: `A.01`, `FIG. 01`, `STEP 2 / 5`, `LOOP/ACTIVE`.
- Compose from the primitives in `src/components/schematic/`; add a primitive
  instead of one-off decorative markup.
- Every technical mark must trace back to real content. Delete decoration that
  has no informational or hierarchical role.

Guardrails: mobile-first at 375px, responsive on desktop, ≥44px touch targets,
accessible contrast, visible focus, readable typography, `prefers-reduced-motion`
support, and explicit loading, disabled, success, empty, and error states.
Recompose diagrams for mobile rather than shrinking them.

## Solana wallet safety (non-negotiable)

Connected advertiser wallet must never lose funds — not even devnet SOL.

- Frontend may use: connect, disconnect, `signMessage` only.
- Frontend must never call: `sendTransaction`, `signTransaction`,
  `signAllTransactions`.
- Never construct a transfer with the connected wallet as source or fee payer.
- Campaign funding is a **simulated** ledger action authorized by a signed message.
- Only the server demo wallet submits devnet txs and pays fees.
- Refuse Solana service start unless `SOLANA_CLUSTER === 'devnet'`.
- Server private key must never appear in source, logs, API responses, Git, or
  any `VITE_*` variable.
- Explorer links always include `?cluster=devnet`.
- Label funding as simulated; on-chain activity as devnet demo — never as
  production escrow or real advertiser funding.

## Secrets

Commit `.env.example` only. Never commit `.env`, generated keypairs, or
`node_modules`.

## Epic ownership (P0)

| Epic | Owner focus |
|------|-------------|
| LL-101 | Foundation, shared contracts, shell, copy, styles |
| LL-102 | Server domain, REST, SSE, DemoStateProvider |
| LL-103 | Customer + host feature views |
| LL-104 | Advertiser workspace + dual-capability UX |
| LL-105 | Wallet auth + server Solana funding proof / payout |
