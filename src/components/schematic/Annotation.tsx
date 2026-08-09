import type { ReactNode } from 'react';

type Props = {
  index: string;
  label: string;
  detail?: ReactNode;
  /** Which side the leader line runs to. */
  side?: 'left' | 'right';
};

/** Callout: marker, leader line, label, optional detail. Never hover-only. */
export function Annotation({ index, label, detail, side = 'left' }: Props) {
  return (
    <div className={`annotation annotation--${side}`}>
      <span className="annotation__marker" aria-hidden="true">
        {index}
      </span>
      <span className="annotation__leader" aria-hidden="true" />
      <span className="annotation__content">
        <span className="annotation__label">{label}</span>
        {detail ? <span className="annotation__detail">{detail}</span> : null}
      </span>
    </div>
  );
}
