# LocalLoop — Concise Agent Rules

New full-stack demo (not a POC refactor). Follow `CONTEXT_HANDOVER.md` +
`HACKATHON_EPICS.md` + `DESIGN_LANGUAGE.md`. Keep them in sync. Reconcile
conflicts before coding.

## Two layers

- **Product app** (mocked, client state): `/`, `/auth/*`, `/app/*`, `/business/*`
- **Live demo** (server + Solana devnet): `/live/*` — intact, just disconnected

Never weaken the live layer while building product surfaces.

## Boundaries

- `src/` UI · `shared/` contracts · `server/domain/` state · `server/api/` REST/SSE
- `server/wallet/` verify · `server/solana/` server-only (LL-105 only for secrets)
- `src/mock/` product-app mock data, session, storage
- Do not edit another owner’s files without coordination.
- Server state is authoritative for `/live/*`; client is a projection. No DB / Docker / prod auth.

## Commands

```bash
npm run dev | typecheck | build | start # Node 20+
```

Finish meaningful work with typecheck + build.

## Routes

Product: `/` · `/auth` · `/auth/register` · `/auth/login` · `/app/deals` ·
`/app/deals/:dealId` · `/business` · `/business/campaigns/new`

Live: `/live` · `/live/customer/:id` · `/live/business/:id/advertiser|host`
Aliases: `/live/customer`→nino · `/live/advertiser`→magnolia · `/live/host`→camora
Enforce business capabilities on live workspace routes. `/demo-preview` is gone.

## Model

Only **customer** and **business** register. Advertiser/host are derived states:
host = has accepted deals; advertiser = owns an active campaign with a budget.
Keep demo persona switcher (live only) ≠ business workspace switcher.

## Copy & design

English UI; `lang="en"`; centralize finished UI terms in `src/copy/en.ts`.
Design language is **fixed** — see `DESIGN_LANGUAGE.md`: survey plan × patch
panel; blueprint + systems diagram + post-industrial labeling; loop trace motif;
paper palette with one signal accent; meaningful line weights; display/interface/
mono type roles; `A.01` / `FIG. 01` / `LOOP/ACTIVE` numbering; compose from
`src/components/schematic/`. No gradients-as-decoration, no crypto-dashboard
clichés, no mark without real content behind it.

Guardrails: 375px mobile-first, ≥44px targets, contrast, visible focus,
reduced-motion support, explicit loading/disabled/empty/success/error states.

## Solana safety

`signMessage` only on connected wallet — never send/sign transactions.
Funding = simulated ledger. Server demo wallet only on **devnet**.
No secrets in `VITE_*`, Git, logs, or API. Explorer: `?cluster=devnet`.
Product-app wallet and budget steps are mock UI with no Explorer links.
