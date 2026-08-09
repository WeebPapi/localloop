type Props = {
  label: string;
  /** `full` spans its container; `inline` sits beside content. */
  variant?: 'full' | 'inline';
};

/** Drafting dimension line used to measure a real quantity. */
export function DimensionLine({ label, variant = 'full' }: Props) {
  return (
    <div className={`dimension dimension--${variant}`}>
      <svg
        className="dimension__rule"
        viewBox="0 0 300 12"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M1 6H299"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M1 1V11M299 1V11"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="dimension__label">{label}</span>
    </div>
  );
}
