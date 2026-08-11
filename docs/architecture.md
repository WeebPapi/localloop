# Architecture and Safety Boundaries

**Status:** Canonical
**Owner:** Aleksandre Kapanadze
**Last reviewed:** 2026-08-11
**Update when:** a domain rule, API/state contract, system boundary, deployment
assumption, or security requirement changes.

## Runtime model

```text
React + Vite frontend
        -> REST + Server-Sent Events
Node + Express API
        -> server-owned in-memory state
        -> validated domain transitions
        -> wallet message verification
        -> server-only Solana devnet signer
```

The live-demo server is authoritative. Browser code may render and submit user
intent, but it must not maintain a competing authoritative domain store.

## Ownership boundaries

| Area | Location | Contract |
|---|---|---|
| UI and presentation | `src/` | Render product and live-demo surfaces |
| Product mock state | `src/mock/` | Client-only app state and fixtures |
| Shared types and IDs | `shared/` | Cross-layer contracts; coordinate changes |
| Domain state | `server/domain/` | Seed, storage, validation, transitions |
| API and updates | `server/api/` | REST envelopes, errors, SSE revisions |
| Wallet checks | `server/wallet/` | One-time challenges and Ed25519 verification |
| Solana integration | `server/solana/` | Server-funded devnet proof and payout only |

## Domain model

- A **customer** or **business** is an account type.
- **Advertiser** and **host** are capabilities a business can hold at the same
  time; they are not mutually exclusive account types.
- A campaign belongs to an advertiser business. A deal connects the campaign to
  a host business. A claim belongs to a customer. Payout state is separate from
  deal and claim state.

Important demo lifecycle:

```text
signed authorization
-> confirmed server-funded devnet proof
-> campaign simulated-funded
-> host accepts deal
-> customer completes qualifying visits
-> claim unlocks
-> customer requests redemption
-> advertiser validates
-> server-funded devnet payout confirms
```

Validate transitions server-side and reject invalid or duplicate mutations.

## Wallet and Solana safety contract

- Connected advertiser wallets may use `connect`, `disconnect`, and
  `signMessage` only.
- Never request transaction signing, construct a transfer from the connected
  wallet, or make it a transaction fee payer.
- Campaign funding is a simulated ledger action authorized by a plaintext,
  one-time signed message.
- The server demo wallet alone records a memo-style funding proof and sends any
  faucet-funded host payout.
- Solana code must refuse a non-devnet cluster. Explorer URLs identify devnet.
- Do not fabricate receipts, transaction signatures, or success states.
- Secrets remain server-only and never appear in client code, logs, responses,
  Git, or `VITE_*` variables.

## Change discipline

When changing shared contracts, API envelopes, domain transitions, or wallet
behavior, update this document and any affected ADR in the same change. Use
tests to establish behavior; prose cannot substitute for validation.
