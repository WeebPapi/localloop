import type { StatusState } from '../../components/schematic';
import { claimStatusLabel, en } from '../../copy/en';
import type { MockClaim } from '../../mock/types';

export type ClaimMark = { state: StatusState; label: string };

/** One mapping from claim state to the visual state vocabulary. */
export function claimMark(claim: MockClaim | undefined): ClaimMark {
  if (!claim) return { state: 'idle', label: en.customerApp.notStarted };

  switch (claim.status) {
    case 'locked':
      return { state: 'active', label: claimStatusLabel.locked };
    case 'unlocked':
      return { state: 'ok', label: claimStatusLabel.unlocked };
    case 'redemption_requested':
      return { state: 'warn', label: claimStatusLabel.redemption_requested };
    case 'redeemed':
      return { state: 'ok', label: claimStatusLabel.redeemed };
    case 'declined':
      return { state: 'stop', label: claimStatusLabel.declined };
    default:
      return { state: 'idle', label: en.customerApp.notStarted };
  }
}
