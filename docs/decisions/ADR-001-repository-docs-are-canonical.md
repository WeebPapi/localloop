# ADR-001 - Repository documents are canonical context

**Status:** Accepted
**Date:** 2026-08-11
**Owner:** Aleksandre Kapanadze

## Context

The previous handover and epic files mixed product vision, implementation
history, task breakdown, and temporary hackathon instructions. Their size and
overlap made it easy for agents and contributors to rely on different versions
of the product story.

## Decision

Versioned Markdown under `docs/` is the canonical source for product vision,
Georgia MVP scope, current state, architecture, and durable decisions.
`AGENTS.md` is the mandatory entrypoint and requires documentation updates when
a documented contract changes. Linear links to the canonical documents but does
not duplicate them.

## Consequences

- `CONTEXT_HANDOVER.md` and `HACKATHON_EPICS.md` are retired from the working
  tree and remain recoverable through Git history.
- Every meaningful PR evaluates and records its documentation impact.
- Durable decisions receive append-only ADRs so later changes have a clear
  history.
