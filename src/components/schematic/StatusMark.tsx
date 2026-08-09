export type StatusState = 'idle' | 'active' | 'ok' | 'warn' | 'stop';

type Props = {
  state: StatusState;
  label: string;
  /** Optional prefix such as `LOOP/` or `CLAIM/`. */
  domain?: string;
};

/** State indicator: a mark plus an uppercase state label. */
export function StatusMark({ state, label, domain }: Props) {
  return (
    <span className={`status-mark status-mark--${state}`}>
      <span className="status-mark__dot" aria-hidden="true" />
      <span className="status-mark__text">
        {domain ? <span className="status-mark__domain">{domain}</span> : null}
        {label}
      </span>
    </span>
  );
}
