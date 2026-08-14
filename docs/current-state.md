# Current Product and Implementation State

**Status:** Canonical
**Owner:** Aleksandre Kapanadze
**Last reviewed:** 2026-08-14
**Update when:** a route, user journey, implementation boundary, meaningful
capability, or known limitation changes.

## What exists in this repository

### Product app - mocked client experience

The product-facing routes are intentionally mock-driven and do not require a
wallet, backend, or Solana configuration:

```text
/                              Landing
/auth                          Choose account type
/auth/register?type=customer   Customer registration
/auth/register?type=business   Business registration
/auth/login                    Sign in
/app/deals                     Customer deal index
/app/deals/:dealId             Deal detail and claim actions
/business                      Business dashboard
/business/campaigns/new        Campaign creation wizard
```

Its state lives in the client reducer and local storage under `src/mock/`. Any
wallet or budget interaction in this layer is explicitly mock UI and must not
claim to create a real transaction or show a blockchain receipt.

### Known product-alignment gap

The campaign wizard and some product-facing copy still use a mock wallet, SOL
budgets, SOL-denominated host payouts, and prominent links to the devnet demo.
Those elements predate the accepted product-first sequencing decision and are
not Georgia MVP requirements. Follow-up product work should replace them with a
wallet-free simulated pilot ledger and remove the technical demo from primary
product navigation. Until that work lands, the UI must remain explicit that no
wallet action or value transfer occurs.

### Live demo - server-authoritative technical proof

The `/live/*` routes use the Node/Express API, server-owned in-memory state,
wallet message verification, and Solana devnet receipts:

```text
/live
/live/customer/:customerId
/live/business/:businessId/advertiser
/live/business/:businessId/host

/live/customer      -> /live/customer/nino
/live/advertiser    -> /live/business/magnolia-film-lab/advertiser
/live/host          -> /live/business/camora/host
```

The seeded walkthrough uses Nino as customer, Magnolia Film Lab as advertiser,
and Camora as host. TSRE Gym illustrates a second, proposed host relationship.
The live layer is a demo constraint, not production infrastructure: state is
in-memory and resets on server restart.

The live layer is also not a Georgia MVP dependency, pilot milestone, launch
gate, or target production architecture. It is preserved as an optional
technical proof and should receive new feature work only through an explicit,
separately justified issue. Its existing safety guarantees remain mandatory
whenever the code is run or changed.

## Current technical constraints

- No database, production authentication, Docker, or custom Solana program
- Node.js 20+; `npm run dev`, `npm run typecheck`, `npm run build`, and
  `npm start` are the primary commands
- Vite serves the frontend on port 5173 in development; Express serves the API
  on port 3001 and serves the production build
- The API layer is authoritative for live-demo state; the frontend is a
  projection and receives updates through REST and SSE

## Verification rule

This page records the intended, repository-level state. For a specific behavior,
inspect the relevant route and tests before asserting that it works. Update this
page when a user-visible boundary changes; do not update it for local refactors
that preserve the same behavior.
