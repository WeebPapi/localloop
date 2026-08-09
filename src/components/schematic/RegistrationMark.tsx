type Props = {
  size?: number;
  className?: string;
};

/** Printer's registration cross. Decorative — used at layout intersections. */
export function RegistrationMark({ size = 18, className }: Props) {
  return (
    <svg
      className={['registration-mark', className].filter(Boolean).join(' ')}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20 2V38M2 20H38"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx="20"
        cy="20"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
