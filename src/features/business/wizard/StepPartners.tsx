import { useMemo, useState } from 'react';
import { TechnicalLabel } from '../../../components/schematic';
import { en } from '../../../copy/en';
import { partnerCandidateIds } from '../../../mock/data';
import type { MockBusiness } from '../../../mock/types';
import type { CampaignDraft } from '../../../mock/types';

const copy = en.campaignWizard;

type Props = {
  draft: CampaignDraft;
  businesses: MockBusiness[];
  ownBusinessId: string;
  onChange: (patch: Partial<CampaignDraft>) => void;
};

export function StepPartners({
  draft,
  businesses,
  ownBusinessId,
  onChange,
}: Props) {
  const [query, setQuery] = useState('');

  const candidates = useMemo(() => {
    const term = query.trim().toLowerCase();
    return businesses.filter((business) => {
      if (business.id === ownBusinessId) return false;
      if (!partnerCandidateIds.includes(business.id)) return false;
      if (!term) return true;
      return (
        business.name.toLowerCase().includes(term) ||
        business.category.toLowerCase().includes(term)
      );
    });
  }, [businesses, ownBusinessId, query]);

  const toggle = (hostBusinessId: string) => {
    const selected = draft.partners.some(
      (partner) => partner.hostBusinessId === hostBusinessId,
    );
    onChange({
      partners: selected
        ? draft.partners.filter(
            (partner) => partner.hostBusinessId !== hostBusinessId,
          )
        : [
            ...draft.partners,
            {
              hostBusinessId,
              requiredVisits: 3,
              payoutSol: 0.005,
              maxRedemptions: 10,
            },
          ],
    });
  };

  return (
    <div className="form">
      <div className="field">
        <label className="field__label" htmlFor="partner-search">
          {copy.partnersSearch}
        </label>
        <input
          id="partner-search"
          className="field__input"
          type="search"
          value={query}
          placeholder={copy.partnersSearchPlaceholder}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="partner-picker">
        {candidates.length === 0 ? (
          <p className="empty">{copy.partnersEmpty}</p>
        ) : (
          candidates.map((business) => {
            const selected = draft.partners.some(
              (partner) => partner.hostBusinessId === business.id,
            );
            return (
              <button
                type="button"
                key={business.id}
                className={`partner-option${selected ? ' partner-option--selected' : ''}`}
                aria-pressed={selected}
                onClick={() => toggle(business.id)}
              >
                <span className="partner-option__main">
                  <span className="partner-option__name">{business.name}</span>
                  <span className="partner-option__meta">
                    {business.category} · {business.sector}
                  </span>
                </span>
                <TechnicalLabel tone={selected ? 'signal' : 'soft'}>
                  {selected ? copy.remove : copy.add}
                </TechnicalLabel>
              </button>
            );
          })
        )}
      </div>

      {draft.partners.length === 0 ? (
        <p className="note">{copy.partnersNone}</p>
      ) : null}
    </div>
  );
}
