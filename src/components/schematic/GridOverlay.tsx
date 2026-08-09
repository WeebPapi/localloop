type Props = {
  /** `plan` draws both axes, `rules` draws vertical structure only. */
  variant?: 'plan' | 'rules';
};

/** Faint blueprint grid. Decorative, sits behind content. */
export function GridOverlay({ variant = 'plan' }: Props) {
  return <div className={`grid-overlay grid-overlay--${variant}`} aria-hidden="true" />;
}
