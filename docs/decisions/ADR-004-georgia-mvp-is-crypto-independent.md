# ADR-004 - Georgia MVP is crypto-independent

**Status:** Accepted
**Date:** 2026-08-14
**Owner:** Aleksandre Kapanadze

## Context

The repository contains a mocked product experience and an existing Solana
devnet technical walkthrough. Some product-facing mock UI also uses SOL budgets
and a mock wallet. That history can make the devnet proof appear to be a
parallel MVP track or a dependency of the core reward loop.

The Georgia pilot is intended to learn whether nearby businesses and customers
can understand, operate, and benefit from the complete advertiser, host,
customer, redemption, and recorded-outcome loop. Requiring crypto
infrastructure before proving that exchange would test two hypotheses at once
and obscure what the team learns.

## Decision

The Georgia MVP must work without wallets, SOL, blockchain receipts, or a
deployed `/live/*` environment.

- Product-facing campaign budget and host compensation are represented by a
  wallet-free simulated pilot ledger in ordinary pilot currency or clearly
  non-crypto units.
- The existing `/live/*` server, wallet-verification, and Solana devnet code is
  preserved as an isolated technical proof.
- Live-demo completion is not a product milestone, pilot-readiness dependency,
  or beta-launch gate.
- New wallet, Solana, receipt, or crypto-dependent product work requires an
  explicit later decision grounded in pilot evidence about a concrete trust or
  verification problem.
- Whenever the existing live demo is run or changed, ADR-002 and the documented
  server-authority, wallet, secret, and devnet safety rules remain mandatory.

## Consequences

- Planning and implementation prioritize the non-crypto product loop.
- Product mock UI that currently requires a mock wallet or uses SOL is a known
  alignment gap and should be removed through normal domain-owned work.
- The primary product UI should not promote the devnet walkthrough; deliberate
  technical demonstrations may still open it directly.
- CI continues to run live-demo safety and domain-transition tests so dormant
  code cannot silently regress.
- Pilot results, rather than existing technical code, determine whether a later
  verification or receipt experiment should be proposed.

## Supersedes / related work

- Related: ADR-002 - Connected wallets never fund or sign transactions
- Does not supersede ADR-002; it narrows when the technical proof is relevant to
  product delivery.
