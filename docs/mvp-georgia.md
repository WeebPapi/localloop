# Georgia MVP Pilot

**Status:** Canonical
**Owner:** Aleksandre Kapanadze
**Last reviewed:** 2026-08-14
**Update when:** pilot scope, target users, success criteria, major inclusion,
or major exclusion changes.

## Pilot outcome

Validate that a small set of nearby Georgia businesses can use LocalLoop to run
one understandable, measurable cross-business reward loop without requiring
wallets, SOL, blockchain receipts, or crypto infrastructure.

## The smallest complete loop

```text
Advertiser creates a campaign with clear reward terms
  -> Host accepts and performs the qualifying interaction
  -> Customer completes the requirement and sees progress
  -> Customer requests or redeems the reward
  -> Advertiser validates the outcome
  -> LocalLoop records the result and makes it visible to participants
```

## Participants

| Participant | Need | MVP responsibility |
|---|---|---|
| Advertiser | Reach relevant nearby customers | Define campaign, reward, budget/terms, and validate redemption |
| Host business | A practical partnership with clear benefit | Accept a deal and verify the qualifying action |
| Customer | A reward worth the effort | Understand progress, unlock, and request redemption |
| LocalLoop team | Evidence to guide the next release | Onboard partners, support the loop, collect feedback, and measure outcomes |

## In scope

- A focused pilot geography and a small, deliberately selected business cohort
- One campaign supporting one or more host relationships
- Clear customer progress and reward terms
- Host verification, advertiser validation, and visible outcome states
- Basic operational support, feedback capture, and launch readiness work
- A wallet-free product experience that proves the operational value exchange
- A simulated pilot ledger for campaign budget and host compensation, expressed
  in ordinary pilot currency or clearly non-crypto units; it does not move money

## Out of scope for the first pilot

- Open self-serve marketplace growth
- Wallet-required business or customer flows, SOL-denominated product behavior,
  blockchain receipts, or crypto-dependent campaign operation
- Production payments, custody, escrow, or automated settlement
- Full POS integrations, fraud automation, or enterprise reporting
- Broad multi-city operations or a large uncurated business directory
- Feature work that does not help prove or operate the complete loop

## Product and technical-demo sequencing

The Georgia MVP is the product loop above. It does not depend on the existing
`/live/*` Solana devnet walkthrough, and completion of that walkthrough is not a
pilot milestone or launch gate.

The devnet walkthrough may be preserved as an isolated technical proof. It
receives new work only through an explicit issue and must retain its wallet,
secret, server-authority, and devnet safety rules. After pilot results are
reviewed, the team may decide whether a separately scoped verification or
receipt experiment is justified by a measured participant need.

## Success criteria to set before launch

Aleksandre must set numerical targets before inviting pilot users. At minimum,
record targets for:

- recruited businesses and activated partnerships;
- customers who start and complete the qualifying action;
- rewards requested and successfully redeemed;
- partner and customer qualitative feedback;
- time spent by the LocalLoop team to support one completed loop;
- critical defects or operational incidents during the pilot.

When those targets are agreed, add them here and link the launch project in
Linear. Do not bury the targets only in a project description.
