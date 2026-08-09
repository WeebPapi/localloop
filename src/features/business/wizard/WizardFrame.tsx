import type { ReactNode } from 'react';
import {
  RouteSteps,
  TechnicalPanel,
  type RouteStep,
} from '../../../components/schematic';
import { en } from '../../../copy/en';

const copy = en.campaignWizard;

type Props = {
  steps: RouteStep[];
  stepIndex: number;
  onSelectStep: (index: number) => void;
  title: string;
  body: string;
  children: ReactNode;
  aside: ReactNode;
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
  nextDisabled?: boolean;
  onCancel: () => void;
};

/** Route-diagram frame shared by every wizard step. */
export function WizardFrame({
  steps,
  stepIndex,
  onSelectStep,
  title,
  body,
  children,
  aside,
  onBack,
  onNext,
  nextLabel,
  nextDisabled,
  onCancel,
}: Props) {
  const step = steps[stepIndex];

  return (
    <div className="wizard-frame">
      <div className="wizard-frame__head">
        <h1 className="wizard-frame__title">{copy.title}</h1>
        <p className="prose">{copy.lede}</p>
        <RouteSteps
          steps={steps}
          currentIndex={stepIndex}
          onSelect={onSelectStep}
          label={copy.routeLabel}
        />
      </div>

      <div className="wizard-frame__grid">
        <TechnicalPanel
          index={`D.0${stepIndex + 1}`}
          label={step?.label ?? ''}
          frame="medium"
          status={{
            state: 'active',
            label: `Step ${stepIndex + 1} / ${steps.length}`,
            domain: 'SETUP/',
          }}
        >
          <h2>{title}</h2>
          <p className="prose">{body}</p>
          {children}
        </TechnicalPanel>

        {aside}
      </div>

      <div className="wizard-frame__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          {copy.cancel}
        </button>
        <div className="actions">
          {stepIndex > 0 ? (
            <button type="button" className="btn" onClick={onBack}>
              {copy.back}
            </button>
          ) : null}
          <button
            type="button"
            className="btn btn--primary"
            onClick={onNext}
            disabled={nextDisabled}
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
