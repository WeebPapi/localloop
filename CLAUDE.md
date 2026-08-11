# LocalLoop - Concise Agent Rules

## Read first

1. [`docs/agent-context.md`](./docs/agent-context.md)
2. The assigned Linear issue
3. The relevant canonical doc: vision/scope, current state, architecture,
   decision record, or [`DESIGN_LANGUAGE.md`](./DESIGN_LANGUAGE.md)

Repository docs are canonical; Linear and task text organize work but do not
replace product context.

## Documentation gate

Update the appropriate canonical document in the same PR when you change:

- product vision, pilot scope, success criteria, or exclusions;
- a user journey, route, seed scenario, important limitation, or shipped state;
- architecture, API/state contract, security boundary, or durable decision.

Use `docs/vision.md`, `docs/mvp-georgia.md`, `docs/current-state.md`,
`docs/architecture.md`, or a new ADR in `docs/decisions/`. For a routine change
that has no documentation impact, state `Docs: not required` and why in the PR.

## Runtime boundaries

- Product app: mocked client state at `/`, `/auth/*`, `/app/*`, `/business/*`.
- Live demo: server-authoritative state, wallet verification, and Solana devnet
  receipts at `/live/*`.
- Do not weaken the live demo while building product surfaces.
- `src/` is UI; `src/mock/` is product mock state; `shared/` is contracts;
  `server/domain/` is authoritative demo state; `server/api/` is REST/SSE;
  `server/wallet/` verifies signatures; `server/solana/` is server-only.

## Non-negotiables

- Node 20+; finish meaningful changes with `npm run typecheck` and
  `npm run build`.
- English UI copy in `src/copy/en.ts`; mobile-first, accessible, explicit
  loading/empty/error states.
- Follow `DESIGN_LANGUAGE.md` for all visual work.
- Connected wallets may only use `signMessage`; never request or construct a
  wallet transaction. Funding is simulated; server-only devnet code submits
  transactions. Never expose secrets or use mainnet.
