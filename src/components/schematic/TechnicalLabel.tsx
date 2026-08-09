import type { ReactNode } from 'react';

type Tone = 'default' | 'soft' | 'signal';

type Props = {
  children: ReactNode;
  tone?: Tone;
  as?: 'span' | 'p' | 'div' | 'dt';
  className?: string;
};

/** Monospace microtype for metadata: IDs, counts, states, coordinates. */
export function TechnicalLabel({
  children,
  tone = 'default',
  as: Tag = 'span',
  className,
}: Props) {
  return (
    <Tag
      className={[`tech-label`, `tech-label--${tone}`, className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  );
}
