type Props = {
  completed: number;
  required: number;
  label: string;
};

/** Visit requirement drawn as stamped cells: the 2/3 progress device. */
export function StampProgress({ completed, required, label }: Props) {
  const cells = Array.from({ length: required }, (_, i) => i < completed);

  return (
    <div className="stamps">
      <div
        className="stamps__row"
        role="img"
        aria-label={`${label}: ${completed} of ${required}`}
      >
        {cells.map((filled, i) => (
          <span
            key={i}
            className={`stamps__cell${filled ? ' stamps__cell--filled' : ''}`}
          >
            <span className="stamps__cell-index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
          </span>
        ))}
      </div>
      <p className="stamps__count">
        <span className="stamps__count-value">
          {completed}/{required}
        </span>
        <span className="stamps__count-label">{label}</span>
      </p>
    </div>
  );
}
