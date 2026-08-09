import type { ReactNode } from 'react';
import { StatusMark, type StatusState } from './StatusMark';

type Props = {
  children: ReactNode;
  /** Section grammar reference, e.g. `C.02`. */
  index?: string;
  label?: string;
  status?: { state: StatusState; label: string; domain?: string };
  /** Density follows DESIGN_LANGUAGE.md §10. */
  density?: 'low' | 'medium' | 'high';
  /** `medium` frames an active component; `heavy` separates a section. */
  frame?: 'thin' | 'medium' | 'heavy';
  footer?: ReactNode;
  className?: string;
};

/** Framed module with an ID plate, the workhorse container of the system. */
export function TechnicalPanel({
  children,
  index,
  label,
  status,
  density = 'medium',
  frame = 'thin',
  footer,
  className,
}: Props) {
  const hasPlate = Boolean(index || label || status);

  return (
    <section
      className={[
        'tpanel',
        `tpanel--${density}`,
        `tpanel--frame-${frame}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {hasPlate ? (
        <header className="tpanel__plate">
          <span className="tpanel__id">
            {index ? <span className="tpanel__index">{index}</span> : null}
            {label ? <span className="tpanel__label">{label}</span> : null}
          </span>
          {status ? (
            <StatusMark
              state={status.state}
              label={status.label}
              domain={status.domain}
            />
          ) : null}
        </header>
      ) : null}
      <div className="tpanel__body">{children}</div>
      {footer ? <footer className="tpanel__footer">{footer}</footer> : null}
    </section>
  );
}
