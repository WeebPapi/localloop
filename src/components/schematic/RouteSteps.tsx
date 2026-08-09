export type RouteStep = {
  id: string;
  label: string;
};

type Props = {
  steps: RouteStep[];
  currentIndex: number;
  onSelect?: (index: number) => void;
  label: string;
};

/** Wizard steps as waypoints on a route rather than a progress bar. */
export function RouteSteps({ steps, currentIndex, onSelect, label }: Props) {
  return (
    <nav className="route" aria-label={label}>
      <ol className="route__list">
        {steps.map((step, index) => {
          const state =
            index < currentIndex
              ? 'done'
              : index === currentIndex
                ? 'current'
                : 'ahead';
          const reachable = Boolean(onSelect) && index < currentIndex;

          return (
            <li key={step.id} className={`route__item route__item--${state}`}>
              {reachable ? (
                <button
                  type="button"
                  className="route__node"
                  onClick={() => onSelect?.(index)}
                  aria-label={`Back to step ${index + 1}: ${step.label}`}
                >
                  <RouteNodeContent index={index} step={step} state={state} />
                </button>
              ) : (
                <span
                  className="route__node"
                  aria-current={state === 'current' ? 'step' : undefined}
                >
                  <RouteNodeContent index={index} step={step} state={state} />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function RouteNodeContent({
  index,
  step,
  state,
}: {
  index: number;
  step: RouteStep;
  state: string;
}) {
  return (
    <>
      <span className="route__waypoint" aria-hidden="true">
        {state === 'done' ? '×' : String(index + 1).padStart(2, '0')}
      </span>
      <span className="route__label">{step.label}</span>
    </>
  );
}
