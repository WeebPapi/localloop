# ADR-002 - Connected wallets never fund or sign transactions

**Status:** Accepted
**Date:** 2026-08-11
**Owner:** Aleksandre Kapanadze

## Context

The live demo uses Solana devnet receipts to demonstrate verifiable technical
flows. Asking an advertiser's connected wallet to fund or sign a transaction
would create avoidable risk and make the product claim misleading.

## Decision

Connected advertiser wallets can sign a plaintext authorization message only.
Campaign funding is simulated in application state. A server-controlled,
devnet-only wallet pays fees for the funding proof and any demo payout.

## Consequences

- Browser code must never expose transaction-signing calls in this flow.
- UI must describe funding as simulated and chain activity as devnet demo
  activity.
- Production settlement, custody, and payment design remain outside current
  scope.
