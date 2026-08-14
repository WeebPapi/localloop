# Architecture Decision Records

ADRs capture durable decisions that would otherwise become ambiguous in chat,
Linear comments, or code review. They are concise and append-only: reverse a
decision with a new ADR rather than silently rewriting history.

## Current decisions

| ADR | Decision |
|---|---|
| [`ADR-001`](./ADR-001-repository-docs-are-canonical.md) | Repository documents are canonical context |
| [`ADR-002`](./ADR-002-connected-wallet-safety.md) | Connected wallets never fund or sign transactions |
| [`ADR-003`](./ADR-003-business-capabilities-not-account-types.md) | Advertiser and host are business capabilities |
| [`ADR-004`](./ADR-004-georgia-mvp-is-crypto-independent.md) | Georgia MVP is crypto-independent |

## Naming

Use `ADR-NNN-short-title.md`, for example
`ADR-004-identity-verification-boundary.md`.

## Template

```markdown
# ADR-NNN - Title

Status: Proposed | Accepted | Superseded by ADR-NNN
Date: YYYY-MM-DD
Owner: Aleksandre Kapanadze

## Context

## Decision

## Consequences

## Supersedes / related work
```

Create an ADR when a choice changes the product contract, the team will need to
revisit its reasoning, or several implementation paths remain plausible. Do not
create one for routine local code choices.
