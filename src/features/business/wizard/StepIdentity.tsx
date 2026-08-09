import { en } from '../../../copy/en';
import type { CampaignDraft } from '../../../mock/types';

const copy = en.campaignWizard;

type Props = {
  draft: CampaignDraft;
  onChange: (patch: Partial<CampaignDraft>) => void;
};

export function StepIdentity({ draft, onChange }: Props) {
  return (
    <div className="form">
      <div className="field">
        <label className="field__label" htmlFor="campaign-name">
          {copy.nameLabel}
        </label>
        <input
          id="campaign-name"
          className="field__input"
          value={draft.name}
          placeholder={copy.namePlaceholder}
          onChange={(event) => onChange({ name: event.target.value })}
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="campaign-perk">
          {copy.perkLabel}
        </label>
        <input
          id="campaign-perk"
          className="field__input"
          value={draft.perk}
          placeholder={copy.perkPlaceholder}
          onChange={(event) => onChange({ perk: event.target.value })}
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="campaign-conditions">
          {copy.conditionsLabel}
        </label>
        <textarea
          id="campaign-conditions"
          className="field__textarea"
          value={draft.conditions}
          placeholder={copy.conditionsPlaceholder}
          onChange={(event) => onChange({ conditions: event.target.value })}
        />
      </div>
    </div>
  );
}
