# LocalLoop Agent Context

**Status:** Canonical
**Owner:** Aleksandre Kapanadze
**Last reviewed:** 2026-08-14
**Update when:** the product thesis, pilot scope, implementation boundary, or a
durable decision changes.

## The one-minute brief

LocalLoop is building a local business rewards network for a Georgia pilot. An
advertiser runs a campaign with nearby host businesses; customers complete a
qualifying action at a host to unlock a reward from the advertiser. The goal is
to make local partnerships measurable and useful to all three sides.

The codebase currently contains both a mocked product experience and a separate
server-authoritative live demo. Do not mistake the demo's current Solana devnet
implementation for production payments infrastructure, and do not let product
surface work weaken its safety guarantees.

Product delivery is sequenced deliberately: prove the wallet-free Georgia MVP
loop first. The `/live/*` devnet walkthrough is an optional, isolated technical
proof, not a pilot dependency or parallel product-development track. New wallet
or Solana product work requires an explicit later decision grounded in pilot
evidence.

## Read the right context

- For **product choices**, read [`vision.md`](./vision.md) and
  [`mvp-georgia.md`](./mvp-georgia.md).
- For **what is actually in the repository**, read
  [`current-state.md`](./current-state.md) and inspect the relevant code.
- For **backend, state, wallet, or Solana work**, read
  [`architecture.md`](./architecture.md) and relevant ADRs.
- For **visual work**, read [`../DESIGN_LANGUAGE.md`](../DESIGN_LANGUAGE.md).

## Non-negotiable facts

- Customers and businesses are account types. Advertiser and host are business
  capabilities, not permanent signup types.
- The Georgia MVP must work without wallets, SOL, blockchain receipts, or a
  running `/live/*` environment.
- The product app is mocked and client-side; the `/live/*` demo owns its state
  on the server.
- Existing live-demo safety code remains protected when touched, but live-demo
  completion does not gate product or pilot milestones.
- A connected advertiser wallet signs a message only. It never sends, signs, or
  pays for a transaction.
- Server-side Solana activity is devnet-only and must be described truthfully.
- A documentation update is required whenever a change alters the product,
  pilot, current state, architecture, or a durable decision.
