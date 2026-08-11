# LocalLoop Canonical Documentation

**Status:** Canonical
**Decision owner:** Aleksandre Kapanadze
**Last reviewed:** 2026-08-11

These versioned Markdown files are the source of truth for LocalLoop's product
and technical context. Linear is the work-management layer: it should link to
these documents rather than repeat their detailed content.

## Read order

| Need | Read |
|---|---|
| Fast orientation | [`agent-context.md`](./agent-context.md) |
| Product mission and guardrails | [`vision.md`](./vision.md) |
| Georgia MVP pilot scope | [`mvp-georgia.md`](./mvp-georgia.md) |
| What exists today | [`current-state.md`](./current-state.md) |
| System, domain, and safety boundaries | [`architecture.md`](./architecture.md) |
| Why a durable decision was made | [`decisions/`](./decisions/) |
| Visual system | [`../DESIGN_LANGUAGE.md`](../DESIGN_LANGUAGE.md) |

## Authority and maintenance

When documents disagree, the most recently accepted ADR wins; otherwise, use
the document named for the subject and ask Aleksandre to resolve the conflict.

Update a document in the same PR when the product contract it describes changes.
Do not duplicate an entire document in Linear, an issue, or a chat. Link to the
canonical file and include only the task-specific context needed to act.

The retired `CONTEXT_HANDOVER.md` and `HACKATHON_EPICS.md` remain available in
Git history but are not current sources of truth.
