import { StatusMark } from '../../../components/schematic';
import { en } from '../../../copy/en';
import type { CampaignDraft } from '../../../mock/types';

const copy = en.campaignWizard;

type Props = {
  draft: CampaignDraft;
  onChange: (patch: Partial<CampaignDraft>) => void;
};

export function StepBudget({ draft, onChange }: Props) {
  return (
    <div className="form">
      <div className="field">
        <label className="field__label" htmlFor="campaign-budget">
          {copy.budgetLabel}
        </label>
        <input
          id="campaign-budget"
          className="field__input"
          type="number"
          min="0"
          step="0.005"
          inputMode="decimal"
          value={draft.budgetSol}
          onChange={(event) =>
            onChange({ budgetSol: Number(event.target.value) })
          }
        />
      </div>

      <div className="deal-terms__group">
        <p className="field__label">{copy.budgetWalletTitle}</p>
        <StatusMark
          state={draft.walletConnected ? 'ok' : 'idle'}
          label={
            draft.walletConnected
              ? copy.budgetWalletConnected
              : copy.budgetWalletDisconnected
          }
          domain="WALLET/"
        />
        {draft.walletConnected ? null : (
          <button
            type="button"
            className="btn"
            onClick={() => onChange({ walletConnected: true })}
          >
            {copy.budgetConnect}
          </button>
        )}
        <p className="note">{copy.budgetMockNote}</p>
      </div>
    </div>
  );
}
