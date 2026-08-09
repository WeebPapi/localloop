import { TechnicalLabel } from '../../../components/schematic';
import { en } from '../../../copy/en';
import { formatSol } from '../../../mock/selectors';
import type { CampaignDraft, MockBusiness } from '../../../mock/types';

const copy = en.campaignWizard;

type Props = {
  draft: CampaignDraft;
  businesses: MockBusiness[];
  onChange: (patch: Partial<CampaignDraft>) => void;
};

export function StepDeals({ draft, businesses, onChange }: Props) {
  const patchPartner = (
    hostBusinessId: string,
    patch: Partial<CampaignDraft['partners'][number]>,
  ) => {
    onChange({
      partners: draft.partners.map((partner) =>
        partner.hostBusinessId === hostBusinessId
          ? { ...partner, ...patch }
          : partner,
      ),
    });
  };

  return (
    <div className="deal-terms">
      {draft.partners.map((partner) => {
        const business = businesses.find(
          (item) => item.id === partner.hostBusinessId,
        );
        const capacity = partner.payoutSol * partner.maxRedemptions;

        return (
          <fieldset className="deal-terms__group" key={partner.hostBusinessId}>
            <legend className="deal-terms__name">
              {business?.name ?? partner.hostBusinessId}
            </legend>

            <div className="form__row form__row--three">
              <div className="field">
                <label
                  className="field__label"
                  htmlFor={`visits-${partner.hostBusinessId}`}
                >
                  {copy.dealVisits}
                </label>
                <input
                  id={`visits-${partner.hostBusinessId}`}
                  className="field__input"
                  type="number"
                  min="1"
                  step="1"
                  inputMode="numeric"
                  value={partner.requiredVisits}
                  onChange={(event) =>
                    patchPartner(partner.hostBusinessId, {
                      requiredVisits: Math.max(1, Number(event.target.value)),
                    })
                  }
                />
              </div>

              <div className="field">
                <label
                  className="field__label"
                  htmlFor={`payout-${partner.hostBusinessId}`}
                >
                  {copy.dealPayout}
                </label>
                <input
                  id={`payout-${partner.hostBusinessId}`}
                  className="field__input"
                  type="number"
                  min="0"
                  step="0.001"
                  inputMode="decimal"
                  value={partner.payoutSol}
                  onChange={(event) =>
                    patchPartner(partner.hostBusinessId, {
                      payoutSol: Math.max(0, Number(event.target.value)),
                    })
                  }
                />
              </div>

              <div className="field">
                <label
                  className="field__label"
                  htmlFor={`max-${partner.hostBusinessId}`}
                >
                  {copy.dealMax}
                </label>
                <input
                  id={`max-${partner.hostBusinessId}`}
                  className="field__input"
                  type="number"
                  min="1"
                  step="1"
                  inputMode="numeric"
                  value={partner.maxRedemptions}
                  onChange={(event) =>
                    patchPartner(partner.hostBusinessId, {
                      maxRedemptions: Math.max(1, Number(event.target.value)),
                    })
                  }
                />
              </div>
            </div>

            <TechnicalLabel tone="soft">
              {copy.dealCapacity}: {formatSol(capacity)}
            </TechnicalLabel>
          </fieldset>
        );
      })}
    </div>
  );
}
