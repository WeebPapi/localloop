# LocalLoop Agent Guide

This repository is the canonical home for LocalLoop's product context. Do not
treat Linear, chat history, or a task description as a competing product spec.
When they conflict, use the documents below and raise the conflict before
coding.

## Start here

Before meaningful work:

1. Read [`docs/agent-context.md`](./docs/agent-context.md).
2. Read the task's Linear issue, including its acceptance criteria and linked
   decisions.
3. Read the additional canonical document relevant to the work:
   - product or scope: [`docs/vision.md`](./docs/vision.md) and
     [`docs/mvp-georgia.md`](./docs/mvp-georgia.md)
   - implementation state: [`docs/current-state.md`](./docs/current-state.md)
   - API, state, wallet, or infrastructure: [`docs/architecture.md`](./docs/architecture.md)
   - visual work: [`DESIGN_LANGUAGE.md`](./DESIGN_LANGUAGE.md)
   - a prior decision: [`docs/decisions/`](./docs/decisions/)
4. Inspect the code you will change. Do not infer current behavior from docs
   alone.

## Documentation is part of the change

A change is incomplete until its documentation impact has been handled in the
same pull request.

Update documentation when a change affects any of the following:

- the target customer, value proposition, Georgia pilot scope, success measure,
  or an explicit non-goal;
- a user journey, route, product promise, seed scenario, or important current
  limitation;
- a domain rule, API contract, state transition, data boundary, deployment
  boundary, or security constraint;
- a durable product or technical decision.

| Change | Update |
|---|---|
| Mission, customer, product thesis | `docs/vision.md` |
| Pilot scope, success criteria, inclusion/exclusion | `docs/mvp-georgia.md` |
| Shipped state, routes, mocks, known gaps | `docs/current-state.md` |
| Architecture, contracts, system/security boundaries | `docs/architecture.md` |
| A durable choice or reversal | new or superseding ADR in `docs/decisions/` |
| Visual system | `DESIGN_LANGUAGE.md` |

Routine refactors, isolated copy fixes, and implementation details that do not
change the documented contract do not require a docs edit. In that case, say
`Docs: not required` in the PR description and state why. Never change a
canonical document merely to make it look recently updated.

## Product and runtime boundaries

### Delivery sequence

The Georgia MVP must prove the complete reward loop without wallets, SOL,
blockchain receipts, or a deployed `/live/*` environment. Unless an issue
explicitly says otherwise, product and pilot work targets the wallet-free
product routes and their mocked state.

Do not add new wallet, Solana, receipt, or crypto-dependent behavior to product
routes. The existing live demo is an isolated technical proof, not a parallel
product track or milestone gate. Work on it only through an explicit issue and
preserve every safety rule below. See
[`ADR-004`](./docs/decisions/ADR-004-georgia-mvp-is-crypto-independent.md).

The repository has two intentionally different layers:

1. **Product app** (`/`, `/auth/*`, `/app/*`, `/business/*`) is a mocked,
   client-state product experience.
2. **Live demo** (`/live/*`) is a server-authoritative demo with wallet message
   verification and Solana devnet receipts.

Do not weaken the live layer while changing product surfaces. The detailed
boundary and current limitations are in `docs/current-state.md` and
`docs/architecture.md`.

| Area | Path | Responsibility |
|---|---|---|
| Frontend UI | `src/` | Views, components, styles, presentation copy |
| Product mock state | `src/mock/` | Client-only product-app fixtures, session, storage |
| Shared contracts | `shared/` | Types, IDs, API envelopes |
| Server domain | `server/domain/` | Authoritative demo state and transitions |
| Server API | `server/api/` | REST and SSE |
| Wallet verification | `server/wallet/` | Challenges and Ed25519 verification |
| Solana | `server/solana/` | Server-only devnet proof and payout |

Notify dependent work before changing `shared/` contracts or IDs.

## Delivery rules

- Use Node.js 20 or newer.
- Run `npm run typecheck` and `npm run build` after every meaningful
  integration. Run focused tests where available.
- Keep finished user-facing English copy centralized in `src/copy/en.ts`.
- Preserve explicit loading, disabled, success, empty, and error states.
- Represent product-app campaign budget and host compensation through a
  wallet-free simulated pilot ledger. Do not use SOL or a mock wallet as an MVP
  requirement.
- Build mobile-first for 375px, with visible focus, accessible contrast,
  44px minimum touch targets, and reduced-motion support.
- [`DESIGN_LANGUAGE.md`](./DESIGN_LANGUAGE.md) is the visual authority. Read it
  before changing UI; compose from `src/components/schematic/` where relevant.

## Wallet and secret safety - non-negotiable

- A connected advertiser wallet may only connect, disconnect, and
  `signMessage`.
- Never call or request `sendTransaction`, `signTransaction`, or
  `signAllTransactions` from the connected wallet.
- Campaign funding is a simulated application-ledger action; only the server
  demo wallet submits devnet transactions and pays fees.
- Refuse Solana service outside `SOLANA_CLUSTER=devnet`.
- Never put a private key in client code, logs, API responses, Git, or a
  `VITE_*` variable.
- Label funding as simulated and chain activity as devnet demo activity.

Commit `.env.example` only. Never commit `.env`, generated keypairs, or
`node_modules`.
