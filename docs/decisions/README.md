# Architecture Decision Records

ADRs capture durable decisions that would otherwise become ambiguous in chat,
Linear comments, or code review. They are concise and append-only: reverse a
decision with a new ADR rather than silently rewriting history.

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
