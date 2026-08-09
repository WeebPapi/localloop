import type {
  MockBusiness,
  MockCampaign,
  MockClaim,
  MockDeal,
  MockState,
} from './types';

export type Offer = {
  deal: MockDeal;
  campaign: MockCampaign;
  advertiser: MockBusiness;
  host: MockBusiness;
  claim?: MockClaim;
};

export type Ledger = {
  total: number;
  paid: number;
  reserved: number;
  remaining: number;
};

function round(value: number): number {
  return Number(value.toFixed(6));
}

export function getBusiness(
  state: MockState,
  id: string,
): MockBusiness | undefined {
  return state.businesses.find((business) => business.id === id);
}

export function getCampaign(
  state: MockState,
  id: string,
): MockCampaign | undefined {
  return state.campaigns.find((campaign) => campaign.id === id);
}

export function getDeal(state: MockState, id: string): MockDeal | undefined {
  return state.deals.find((deal) => deal.id === id);
}

export function getClaimForDeal(
  state: MockState,
  dealId: string,
): MockClaim | undefined {
  return state.claims.find((claim) => claim.dealId === dealId);
}

/** Every deal a customer can act on: active deal on a live campaign. */
export function getOffers(state: MockState): Offer[] {
  return state.deals.flatMap((deal) => {
    if (deal.status !== 'active') return [];
    const campaign = getCampaign(state, deal.campaignId);
    if (!campaign || campaign.status === 'draft') return [];
    const advertiser = getBusiness(state, campaign.advertiserBusinessId);
    const host = getBusiness(state, deal.hostBusinessId);
    if (!advertiser || !host) return [];
    return [
      {
        deal,
        campaign,
        advertiser,
        host,
        claim: getClaimForDeal(state, deal.id),
      },
    ];
  });
}

export function getOffer(state: MockState, dealId: string): Offer | undefined {
  return getOffers(state).find((offer) => offer.deal.id === dealId);
}

/**
 * Simulated ledger: paid is confirmed host payouts, reserved is the payout
 * capacity of active deals capped by what is left.
 */
export function getLedger(state: MockState, campaign: MockCampaign): Ledger {
  const deals = state.deals.filter(
    (deal) => deal.campaignId === campaign.id && deal.status === 'active',
  );
  const paid = deals.reduce(
    (sum, deal) => sum + deal.redemptionsPaid * deal.payoutSol,
    0,
  );
  const remaining = Math.max(0, campaign.budgetSol - paid);
  const capacity = deals.reduce(
    (sum, deal) =>
      sum + (deal.maxRedemptions - deal.redemptionsPaid) * deal.payoutSol,
    0,
  );

  return {
    total: round(campaign.budgetSol),
    paid: round(paid),
    remaining: round(remaining),
    reserved: round(Math.min(remaining, capacity)),
  };
}

export function getAdvertiserCampaigns(
  state: MockState,
  businessId: string,
): MockCampaign[] {
  return state.campaigns.filter(
    (campaign) => campaign.advertiserBusinessId === businessId,
  );
}

export function getIncomingRequests(
  state: MockState,
  businessId: string,
): MockDeal[] {
  return state.deals.filter(
    (deal) => deal.hostBusinessId === businessId && deal.status === 'proposed',
  );
}

export function getHostedDeals(
  state: MockState,
  businessId: string,
): MockDeal[] {
  return state.deals.filter(
    (deal) => deal.hostBusinessId === businessId && deal.status === 'active',
  );
}

/**
 * Advertiser and host are derived states, never signup choices:
 * host = accepted deals, advertiser = an active campaign with a budget.
 */
export function getBusinessRoles(
  state: MockState,
  businessId: string,
): { isAdvertiser: boolean; isHost: boolean } {
  const isAdvertiser = getAdvertiserCampaigns(state, businessId).some(
    (campaign) => campaign.status !== 'draft' && campaign.budgetSol > 0,
  );
  return { isAdvertiser, isHost: getHostedDeals(state, businessId).length > 0 };
}

/** Claims waiting for this advertiser to validate a redemption. */
export function getRedemptionQueue(
  state: MockState,
  businessId: string,
): { claim: MockClaim; campaign: MockCampaign; deal: MockDeal }[] {
  return state.claims.flatMap((claim) => {
    if (claim.status !== 'redemption_requested') return [];
    const campaign = getCampaign(state, claim.campaignId);
    const deal = getDeal(state, claim.dealId);
    if (!campaign || !deal) return [];
    if (campaign.advertiserBusinessId !== businessId) return [];
    return [{ claim, campaign, deal }];
  });
}

export function getHostEarnings(state: MockState, businessId: string): number {
  return round(
    getHostedDeals(state, businessId).reduce(
      (sum, deal) => sum + deal.redemptionsPaid * deal.payoutSol,
      0,
    ),
  );
}

export function formatSol(value: number): string {
  return `${round(value)} SOL`;
}
