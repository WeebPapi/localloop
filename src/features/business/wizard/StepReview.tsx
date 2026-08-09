import { en } from '../../../copy/en';
import { formatSol } from '../../../mock/selectors';
import type { CampaignDraft, MockBusiness } from '../../../mock/types';

const copy = en.campaignWizard;

type Props = {
  draft: CampaignDraft;
  businesses: MockBusiness[];
};

export function StepReview({ draft, businesses }: Props) {
  return (
    <div className="form">
      <div className="review-block">
        <span className="review-block__label">{copy.reviewOffer}</span>
        <p className="review-block__value">
          <strong>{draft.name}</strong> — {draft.perk}
        </p>
        <p className="note">{draft.conditions}</p>
      </div>

      <div className="review-block">
        <span className="review-block__label">{copy.reviewBudget}</span>
        <p className="review-block__value">{formatSol(draft.budgetSol)}</p>
        <p className="note">{copy.budgetMockNote}</p>
      </div>

      <div className="review-block">
        <span className="review-block__label">{copy.reviewPartners}</span>
        <ul className="partner-list">
          {draft.partners.map((partner) => {
            const business = businesses.find(
              (item) => item.id === partner.hostBusinessId,
            );
            return (
              <li key={partner.hostBusinessId}>
                <span>{business?.name ?? partner.hostBusinessId}</span>
                <span className="partner-list__terms">
                  {partner.requiredVisits} {en.businessApp.visitsRequired} ·{' '}
                  {formatSol(partner.payoutSol)} {en.businessApp.perRedemption} ·{' '}
                  {partner.maxRedemptions} {en.businessApp.maxRedemptions}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
