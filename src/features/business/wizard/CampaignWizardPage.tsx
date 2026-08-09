import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductShell } from '../../../components/ProductShell';
import {
  ScaleBar,
  TechnicalLabel,
  TechnicalPanel,
  type RouteStep,
} from '../../../components/schematic';
import { en } from '../../../copy/en';
import { formatSol } from '../../../mock/selectors';
import { useSession } from '../../../mock/session';
import { useMockStore } from '../../../mock/store';
import { OWN_BUSINESS_ID, type CampaignDraft } from '../../../mock/types';
import { StepBudget } from './StepBudget';
import { StepDeals } from './StepDeals';
import { StepIdentity } from './StepIdentity';
import { StepPartners } from './StepPartners';
import { StepReview } from './StepReview';
import { WizardFrame } from './WizardFrame';

const copy = en.campaignWizard;

const steps: RouteStep[] = [
  { id: 'identity', label: copy.stepIdentity },
  { id: 'budget', label: copy.stepBudget },
  { id: 'partners', label: copy.stepPartners },
  { id: 'deals', label: copy.stepDeals },
  { id: 'review', label: copy.stepReview },
];

const emptyDraft: CampaignDraft = {
  name: '',
  perk: '',
  conditions: '',
  budgetSol: 0.05,
  walletConnected: false,
  partners: [],
};

export function CampaignWizardPage() {
  const navigate = useNavigate();
  const { session } = useSession();
  const { state, dispatch } = useMockStore();
  const businessId = session?.businessId ?? OWN_BUSINESS_ID;

  const [draft, setDraft] = useState<CampaignDraft>(emptyDraft);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onChange = (patch: Partial<CampaignDraft>) => {
    setDraft((current) => ({ ...current, ...patch }));
    setError(null);
  };

  const committed = useMemo(
    () =>
      draft.partners.reduce(
        (sum, partner) => sum + partner.payoutSol * partner.maxRedemptions,
        0,
      ),
    [draft.partners],
  );

  const overBudget = committed > draft.budgetSol;

  const stepValid = (index: number): string | null => {
    if (index === 0) {
      return draft.name.trim() && draft.perk.trim() && draft.conditions.trim()
        ? null
        : copy.validationName;
    }
    if (index === 1) {
      return draft.budgetSol > 0 && draft.walletConnected
        ? null
        : copy.validationBudget;
    }
    if (index === 2) {
      return draft.partners.length > 0 ? null : copy.partnersNone;
    }
    if (index === 3) {
      return overBudget ? copy.dealOverBudget : null;
    }
    return null;
  };

  const onNext = () => {
    const problem = stepValid(stepIndex);
    if (problem) {
      setError(problem);
      return;
    }

    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
      setError(null);
      return;
    }

    dispatch({ type: 'create_campaign', businessId, draft });
    navigate('/business', { replace: true });
  };

  const aside = (
    <TechnicalPanel
      index="D.00"
      label={copy.reviewBudget}
      density="high"
      status={{
        state: overBudget ? 'stop' : 'active',
        label: overBudget ? 'Over budget' : 'Draft',
        domain: 'CAMPAIGN/',
      }}
      footer={`PARTNERS/${String(draft.partners.length).padStart(2, '0')}`}
    >
      <p className="metric">
        <span className="metric__value">{formatSol(draft.budgetSol)}</span>
        <span className="metric__label">{copy.budgetLabel}</span>
      </p>

      <ScaleBar
        total={Math.max(draft.budgetSol, committed)}
        bands={[
          { label: copy.dealCapacity, value: committed, tone: 'reserved' },
          {
            label: en.businessApp.ledgerRemaining,
            value: Math.max(0, draft.budgetSol - committed),
            tone: 'remaining',
          },
        ]}
      />

      <TechnicalLabel tone="soft">
        {draft.name.trim() || copy.namePlaceholder}
      </TechnicalLabel>
      {overBudget ? <p className="note note--alert">{copy.dealOverBudget}</p> : null}
    </TechnicalPanel>
  );

  const body: Record<number, { title: string; body: string }> = {
    0: { title: copy.identityTitle, body: copy.identityBody },
    1: { title: copy.budgetTitle, body: copy.budgetBody },
    2: { title: copy.partnersTitle, body: copy.partnersBody },
    3: { title: copy.dealsTitle, body: copy.dealsBody },
    4: { title: copy.reviewTitle, body: copy.reviewBody },
  };

  return (
    <ProductShell surface="D" meta={`WIZARD / STEP ${stepIndex + 1} OF 5`}>
      <WizardFrame
        steps={steps}
        stepIndex={stepIndex}
        onSelectStep={(index) => {
          setStepIndex(index);
          setError(null);
        }}
        title={body[stepIndex]?.title ?? ''}
        body={body[stepIndex]?.body ?? ''}
        aside={aside}
        onBack={() => {
          setStepIndex(Math.max(0, stepIndex - 1));
          setError(null);
        }}
        onNext={onNext}
        nextLabel={stepIndex === steps.length - 1 ? copy.publish : copy.next}
        nextDisabled={stepIndex === steps.length - 1 && overBudget}
        onCancel={() => navigate('/business')}
      >
        {stepIndex === 0 ? (
          <StepIdentity draft={draft} onChange={onChange} />
        ) : null}
        {stepIndex === 1 ? <StepBudget draft={draft} onChange={onChange} /> : null}
        {stepIndex === 2 ? (
          <StepPartners
            draft={draft}
            businesses={state.businesses}
            ownBusinessId={businessId}
            onChange={onChange}
          />
        ) : null}
        {stepIndex === 3 ? (
          <StepDeals
            draft={draft}
            businesses={state.businesses}
            onChange={onChange}
          />
        ) : null}
        {stepIndex === 4 ? (
          <StepReview draft={draft} businesses={state.businesses} />
        ) : null}

        {error ? (
          <p className="note note--alert" role="alert">
            {error}
          </p>
        ) : null}
      </WizardFrame>
    </ProductShell>
  );
}
