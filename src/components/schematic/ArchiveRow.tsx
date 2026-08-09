import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { StatusMark, type StatusState } from './StatusMark';

export type ArchiveColumn = {
  label: string;
  value: ReactNode;
};

type Props = {
  index: string;
  title: string;
  columns: ArchiveColumn[];
  status?: { state: StatusState; label: string };
  to?: string;
  action?: string;
  media?: ReactNode;
};

/** Catalogued artifact row — the customer deal index and campaign lists. */
export function ArchiveRow({
  index,
  title,
  columns,
  status,
  to,
  action,
  media,
}: Props) {
  const body = (
    <>
      <span className="archive-row__index">{index}</span>
      {media ? <span className="archive-row__media">{media}</span> : null}
      <span className="archive-row__main">
        <span className="archive-row__title">{title}</span>
        <span className="archive-row__columns">
          {columns.map((column) => (
            <span key={column.label} className="archive-row__cell">
              <span className="archive-row__cell-label">{column.label}</span>
              <span className="archive-row__cell-value">{column.value}</span>
            </span>
          ))}
        </span>
      </span>
      <span className="archive-row__tail">
        {status ? <StatusMark state={status.state} label={status.label} /> : null}
        {to ? <span className="archive-row__action">{action ?? 'Open'}</span> : null}
      </span>
    </>
  );

  if (to) {
    return (
      <Link className="archive-row archive-row--link" to={to}>
        {body}
      </Link>
    );
  }

  return <div className="archive-row">{body}</div>;
}
