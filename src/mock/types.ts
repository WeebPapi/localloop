import type {
  CampaignStatus,
  ClaimStatus,
  DealStatus,
} from '../../shared/types';

export type AccountType = 'customer' | 'business';

export type BusinessLinks = {
  website?: string;
  instagram?: string;
  maps?: string;
};

export type MockBusiness = {
  id: string;
  name: string;
  category: string;
  address: string;
  /** Coordinate-style label used as technical metadata. */
  sector: string;
  image?: string;
  /** Brand logo asset when available; otherwise the UI uses a letter mark. */
  logo?: string;
  /** Public links shown on customer-facing deal cards. */
  links?: BusinessLinks;
};

/** What the customer must do to unlock the reward. */
export type DealCriterionKind = 'visits' | 'action';

export type MockCampaign = {
  id: string;
  name: string;
  advertiserBusinessId: string;
  status: CampaignStatus;
  perk: string;
  conditions: string;
  budgetSol: number;
  image?: string;
  createdAt: string;
  /** True for campaigns created in this browser through the wizard. */
  local?: boolean;
};

export type MockDeal = {
  id: string;
  campaignId: string;
  hostBusinessId: string;
  status: DealStatus;
  /**
   * Progress counter for the claim machine. Visit deals use the real count;
   * action deals use 1 (complete the single action).
   */
  requiredVisits: number;
  /** Human-readable unlock condition shown on the deal card. */
  criterion: string;
  criterionKind: DealCriterionKind;
  /** Short customer-facing deal line, e.g. “Try Yuzu · Get free coffee”. */
  headline: string;
  payoutSol: number;
  maxRedemptions: number;
  redemptionsPaid: number;
};

export type MockClaim = {
  id: string;
  dealId: string;
  campaignId: string;
  status: ClaimStatus;
  verifiedVisits: number;
  updatedAt: string;
};

export type MockActivity = {
  id: string;
  at: string;
  label: string;
};

export type MockState = {
  businesses: MockBusiness[];
  campaigns: MockCampaign[];
  deals: MockDeal[];
  claims: MockClaim[];
  activity: MockActivity[];
};

export type CampaignDraft = {
  name: string;
  perk: string;
  conditions: string;
  budgetSol: number;
  walletConnected: boolean;
  partners: {
    hostBusinessId: string;
    requiredVisits: number;
    payoutSol: number;
    maxRedemptions: number;
  }[];
};

export function criterionFromVisits(n: number): string {
  return `${n} verified ${n === 1 ? 'visit' : 'visits'}`;
}

/** The signed-in business identity created at registration. */
export const OWN_BUSINESS_ID = 'your-business';
