import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { clearState, loadState, saveState } from './campaignStorage';
import { seedState } from './data';
import {
  criterionFromVisits,
  type CampaignDraft,
  type MockCampaign,
  type MockClaim,
  type MockDeal,
  type MockState,
} from './types';

export type MockAction =
  | { type: 'ensure_business'; id: string; name: string }
  | { type: 'claim_deal'; dealId: string }
  | { type: 'log_visit'; dealId: string }
  | { type: 'request_redemption'; claimId: string }
  | { type: 'validate_redemption'; claimId: string }
  | { type: 'respond_partnership'; dealId: string; accept: boolean }
  | { type: 'create_campaign'; businessId: string; draft: CampaignDraft }
  | { type: 'reset' };

function slug(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'campaign'
  );
}

function logActivity(state: MockState, label: string): MockState['activity'] {
  return [
    {
      id: `act-${state.activity.length + 1}-${Date.now()}`,
      at: new Date().toISOString(),
      label,
    },
    ...state.activity,
  ].slice(0, 40);
}

function campaignName(state: MockState, campaignId: string): string {
  return (
    state.campaigns.find((campaign) => campaign.id === campaignId)?.name ??
    'Campaign'
  );
}

function businessName(state: MockState, businessId: string): string {
  return (
    state.businesses.find((business) => business.id === businessId)?.name ??
    'Business'
  );
}

export function mockReducer(state: MockState, action: MockAction): MockState {
  switch (action.type) {
    case 'ensure_business': {
      const existing = state.businesses.find(
        (business) => business.id === action.id,
      );
      if (existing && existing.name === action.name) return state;
      const record = {
        id: action.id,
        name: action.name,
        category: 'Your business',
        address: 'Tbilisi',
        sector: 'SECTOR — / YOUR SITE',
      };
      return {
        ...state,
        businesses: existing
          ? state.businesses.map((business) =>
              business.id === action.id
                ? { ...business, name: action.name }
                : business,
            )
          : [...state.businesses, record],
      };
    }

    case 'claim_deal': {
      const deal = state.deals.find((item) => item.id === action.dealId);
      if (!deal || deal.status !== 'active') return state;
      if (state.claims.some((claim) => claim.dealId === deal.id)) return state;

      const claim: MockClaim = {
        id: `LL-${slug(deal.id).toUpperCase()}-001`,
        dealId: deal.id,
        campaignId: deal.campaignId,
        status: 'locked',
        verifiedVisits: 0,
        updatedAt: new Date().toISOString(),
      };

      return {
        ...state,
        claims: [...state.claims, claim],
        activity: logActivity(
          state,
          `Reward pass opened for ${campaignName(state, deal.campaignId)}`,
        ),
      };
    }

    case 'log_visit': {
      const deal = state.deals.find((item) => item.id === action.dealId);
      const claim = state.claims.find((item) => item.dealId === action.dealId);
      if (!deal || !claim) return state;
      if (claim.status !== 'locked') return state;
      if (claim.verifiedVisits >= deal.requiredVisits) return state;

      const verifiedVisits = claim.verifiedVisits + 1;
      const unlocked = verifiedVisits >= deal.requiredVisits;

      return {
        ...state,
        claims: state.claims.map((item) =>
          item.id === claim.id
            ? {
                ...item,
                verifiedVisits,
                status: unlocked ? 'unlocked' : 'locked',
                updatedAt: new Date().toISOString(),
              }
            : item,
        ),
        activity: logActivity(
          state,
          unlocked
            ? `${campaignName(state, deal.campaignId)} reward unlocked at ${verifiedVisits}/${deal.requiredVisits} visits`
            : `${businessName(state, deal.hostBusinessId)} verified a visit — ${verifiedVisits}/${deal.requiredVisits}`,
        ),
      };
    }

    case 'request_redemption': {
      const claim = state.claims.find((item) => item.id === action.claimId);
      if (!claim || claim.status !== 'unlocked') return state;

      return {
        ...state,
        claims: state.claims.map((item) =>
          item.id === claim.id
            ? {
                ...item,
                status: 'redemption_requested',
                updatedAt: new Date().toISOString(),
              }
            : item,
        ),
        activity: logActivity(
          state,
          `Redemption requested for ${campaignName(state, claim.campaignId)}`,
        ),
      };
    }

    case 'validate_redemption': {
      const claim = state.claims.find((item) => item.id === action.claimId);
      if (!claim || claim.status !== 'redemption_requested') return state;
      const deal = state.deals.find((item) => item.id === claim.dealId);
      if (!deal) return state;

      return {
        ...state,
        claims: state.claims.map((item) =>
          item.id === claim.id
            ? { ...item, status: 'redeemed', updatedAt: new Date().toISOString() }
            : item,
        ),
        deals: state.deals.map((item) =>
          item.id === deal.id
            ? { ...item, redemptionsPaid: item.redemptionsPaid + 1 }
            : item,
        ),
        activity: logActivity(
          state,
          `Redemption validated — ${deal.payoutSol} SOL recorded for ${businessName(state, deal.hostBusinessId)}`,
        ),
      };
    }

    case 'respond_partnership': {
      const deal = state.deals.find((item) => item.id === action.dealId);
      if (!deal || deal.status !== 'proposed') return state;

      if (!action.accept) {
        return {
          ...state,
          deals: state.deals.filter((item) => item.id !== deal.id),
          activity: logActivity(
            state,
            `Partnership request from ${campaignName(state, deal.campaignId)} declined`,
          ),
        };
      }

      return {
        ...state,
        deals: state.deals.map((item) =>
          item.id === deal.id ? { ...item, status: 'active' } : item,
        ),
        activity: logActivity(
          state,
          `Now hosting ${campaignName(state, deal.campaignId)}`,
        ),
      };
    }

    case 'create_campaign': {
      const id = `${slug(action.draft.name)}-${Date.now().toString(36)}`;
      const campaign: MockCampaign = {
        id,
        name: action.draft.name,
        advertiserBusinessId: action.businessId,
        status: 'live',
        perk: action.draft.perk,
        conditions: action.draft.conditions,
        budgetSol: action.draft.budgetSol,
        createdAt: new Date().toISOString(),
        local: true,
      };

      const deals: MockDeal[] = action.draft.partners.map((partner, index) => {
        const host = state.businesses.find(
          (business) => business.id === partner.hostBusinessId,
        );
        const hostLabel = host?.name ?? 'partner';
        const criterion = criterionFromVisits(partner.requiredVisits);
        return {
          id: `${id}-deal-${index + 1}`,
          campaignId: id,
          hostBusinessId: partner.hostBusinessId,
          status: 'active' as const,
          requiredVisits: partner.requiredVisits,
          criterion,
          criterionKind: 'visits' as const,
          headline: `Visit ${hostLabel} · Get ${action.draft.perk}`,
          payoutSol: partner.payoutSol,
          maxRedemptions: partner.maxRedemptions,
          redemptionsPaid: 0,
        };
      });

      return {
        ...state,
        campaigns: [campaign, ...state.campaigns],
        deals: [...state.deals, ...deals],
        activity: logActivity(
          state,
          `Campaign “${campaign.name}” published with a ${campaign.budgetSol} SOL simulated budget`,
        ),
      };
    }

    case 'reset':
      return seedState;

    default:
      return state;
  }
}

type StoreContextValue = {
  state: MockState;
  dispatch: (action: MockAction) => void;
  resetDemo: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function MockStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(mockReducer, undefined, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const resetDemo = useCallback(() => {
    clearState();
    dispatch({ type: 'reset' });
  }, []);

  const value = useMemo(
    () => ({ state, dispatch, resetDemo }),
    [state, resetDemo],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useMockStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useMockStore must be used within MockStoreProvider');
  }
  return ctx;
}
