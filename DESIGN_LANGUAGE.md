# LocalLoop — Design Language

This is the canonical visual specification for LocalLoop. It replaces the earlier
"visual direction is open" guidance in `AGENTS.md`, `CLAUDE.md`,
`CONTEXT_HANDOVER.md`, and `HACKATHON_EPICS.md`. Those documents reference this
file; change this file first, then reconcile the others.

## 1. Concept

> A neighborhood rewards network represented as a **survey plan crossed with a
> patch panel**, combining **architectural/blueprint** drafting with
> **circuit/systems diagram** topology and **post-industrial utility labeling**,
> using the **advertiser → host → customer → advertiser loop trace** as the
> recurring visual device.

```text
PRIMARY METAPHOR:      district survey + signal patch panel
PRIMARY GEOMETRY:      orthogonal traces, parcel blocks, node circles
PRIMARY LINE LANGUAGE: hairline construction / thin edges / medium frames / heavy section rules
PRIMARY TYPE CONTRAST: tight display sans vs monospace technical labels
PRIMARY MOTIF:         the closed loop (advertiser → host → customer → advertiser)
DATA USED AS DECORATION: SOL budgets, visit counts, claim IDs, campaign IDs, addresses
MOTION LANGUAGE:       trace flow along the loop, plus a teleprinter-style character reveal for headlines/labels tied to a real page load or state change; both disabled under reduced motion
```

The page is a **system being documented**, not a page with technical decoration
applied. Every mark should correspond to something real: a relationship, a
state, a measurement, an ID, a sequence, or a boundary.

## 2. Style families

Exactly three primary families plus one accent. Do not add more.

| Family | Why it fits |
|--------|-------------|
| Architectural / blueprint | The product is about physical neighboring businesses and foot traffic |
| Circuit / systems diagram | The campaign is literally a signal routed advertiser → host → customer |
| Post-industrial utility | Campaigns, deals, claims, and payouts are inventory with IDs and states |
| Brutalist information (accent) | Dense dashboard tables need exposed structure, not soft cards |

Explicitly rejected: purple/blue gradients, neon glow, glassmorphism, rounded
everything, fake terminal output, random hex strings, decorative binary, meaningless
PCB traces, `SYSTEM ONLINE` banners, fabricated coordinates.

## 3. Motif budget

```text
Primary:    orthogonal loop traces
Support:    node circles + registration crosses
Texture:    faint blueprint grid (and halftone for large numerals only)
Annotation: A.01 / B.02 section grammar, FIG. nn for diagrams, LOOP/ for states
```

Nothing else recurs. A motif used once is decoration and must be deleted.

## 4. Tokens

Defined in `src/styles/tokens.css`. Consume tokens; never hardcode a color, line
weight, or radius in a component.

```text
Surface:   --color-paper, --color-surface, --color-surface-sunk
Ink:       --color-ink, --color-ink-soft, --color-ink-faint
Line:      --color-line, --color-line-soft
Signal:    --color-signal (single accent), --color-signal-ink
State:     --color-ok, --color-warn, --color-stop
Lines:     --line-hair 0.5px, --line-thin 1px, --line-medium 1.5px, --line-heavy 3px
Grid:      --grid 48px, --grid-sm 12px
Radius:    --radius 0 (square by default; deliberate exceptions only)
Type:      --font-display, --font-ui, --font-mono
```

Color strategy is the **paper** system: off-white ground, near-black ink, a
single signal accent. State colors are reserved for state, never for emphasis.

## 5. Line hierarchy

Line weight carries meaning, exactly as in a technical drawing.

| Token | Use |
|-------|-----|
| `--line-hair` | Construction geometry, grid overlays, dividers inside a panel |
| `--line-thin` | Normal diagram edges, table rules, default panel borders |
| `--line-medium` | Active or focused boundaries, primary component frames |
| `--line-heavy` | Section separators and rare emphasis only |

Never give every box the same border strength.

## 6. Typography roles

Three roles, and no more than three families.

- **Display** — page titles, oversized numerals, section statements. Tight
  tracking, high contrast in scale.
- **Interface** — navigation, body copy, buttons, form labels. Legibility wins.
- **Technical** — monospace. IDs, budgets, counts, statuses, coordinates,
  timestamps, figure indices. Uppercase with generous letter-spacing at small
  sizes.

Technical microtype is metadata, never primary reading. Do not set body copy in
monospace.

## 7. Numbering grammar

One grammar across the whole product.

```text
Sections:   A.01  A.02  B.01
Figures:    FIG. 01
Steps:      STEP 2 / 5
States:     LOOP/ACTIVE   LOOP/IDLE   CLAIM/UNLOCKED
```

Letters group a surface (landing = A, customer = B, business = C, wizard = D).
Numbers are sequential within the surface and stable across renders.

## 8. Annotation

An annotation is: target → leader line → marker → label → optional detail. Use
annotations to explain real relationships (who pays whom, what unlocks a reward).
Never place essential information in a hover-only annotation.

## 9. Diagrams

Prefer inline SVG with `vector-effect="non-scaling-stroke"` for crisp lines at
any width. Orthogonal paths for the campaign loop; the loop must reflect actual
state (a funded campaign, an approved deal, a customer's progress) rather than
animating for its own sake.

Decorative SVG is `aria-hidden="true"`. Informative diagrams carry an accessible
text description and must not determine document reading order.

## 10. Density

Alternate density; do not make every section loud.

| Level | Surfaces |
|-------|----------|
| Low | Landing hero, calls to action, auth screens |
| Medium | Landing explainer sections, customer deal index and detail |
| High | Business dashboard panels, budget ledgers, wizard review, footers |

Whitespace is part of the drawing: use it to separate systems, imply scale, and
give leader lines room.

## 11. Composition modes

One dominant mode per surface.

```text
Landing            → technical manual (numbered figures, exploded explanation)
Auth               → precision grid (calm, centered, minimal)
Customer index     → archive (catalog rows and specimen cards)
Customer detail    → technical manual (criteria as a checklist figure)
Business dashboard → instrument panel (dense modules, live states)
Campaign wizard    → route diagram (steps as waypoints on the loop)
```

## 12. Usability guardrails (non-negotiable)

- Mobile-first at 375px; recompose diagrams for mobile rather than shrinking them
  (horizontal routes become vertical sequences, secondary construction geometry
  is hidden).
- Minimum 44px touch targets.
- Accessible contrast for all text, including microtype.
- Visible keyboard focus on every interactive element.
- Explicit loading, disabled, empty, success, and error states.
- `prefers-reduced-motion` disables trace animation and diagram assembly;
  teleprinter text reveals fall back to plain static text.
- Semantic landmarks and heading order; navigation stays obvious.

## 13. Performance

Inline SVG, CSS geometry, and reusable symbols. No canvas or WebGL for static
diagrams, no full-screen video, no hundreds of animated nodes.

## 14. Primitives

Implemented in `src/components/schematic/` and styled by
`src/styles/schematic.css`:

`TechnicalPanel`, `FigureIndex`, `TechnicalLabel`, `StatusMark`, `Annotation`,
`DimensionLine`, `RegistrationMark`, `GridOverlay`, `LoopTrace`, `ArchiveRow`,
`SectionMarker`, `ScaleBar`, `StampProgress`, `RouteSteps`, `Teleprinter`.

Compose pages from primitives. If a page needs a new visual device, add a
primitive rather than one-off markup.

`Teleprinter` is the discrete character-reveal device. It fires once per real
event (page load, a card entering view, a new claim ID appearing) and never on
unrelated re-renders. Do not apply it to body paragraphs or fine print.

## 15. Content-derived decoration

| Real content | Visual device |
|--------------|---------------|
| Campaign budget | Ledger gauge with reserved/paid/remaining bands |
| Visit requirement | Stamped progress cells (2/3) |
| Advertiser → host → customer | Loop trace with nodes |
| Campaign / claim ID | Serial plate microtype |
| Deal status | Status mark with state color |
| Business address | Coordinate-style label |
| Wizard steps | Waypoints on a route |

If a technical mark cannot be traced back to real content, remove it.

## 16. Checklist

Before calling a surface done: one clear metaphor, controlled line weights,
intentional empty space, legible annotations, real metadata, obvious navigation,
comfortable body copy, working keyboard access, visible focus, sufficient
contrast, correct mobile reading order, and no decoration without a role.
Motion (loop traces, teleprinter reveals) must map to real content or a real
state change, and must collapse cleanly under `prefers-reduced-motion`.
