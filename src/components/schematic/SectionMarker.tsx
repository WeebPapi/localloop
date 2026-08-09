import type { ReactNode } from 'react';

type Props = {
  index: string;
  title: string;
  detail?: ReactNode;
  /** Id for the rendered heading so a section can label itself with it. */
  titleId?: string;
  /** Use `h1` when this marker is the page title. */
  level?: 1 | 2;
};

/** `A.01 / Overview` section head with a heavy rule beneath it. */
export function SectionMarker({
  index,
  title,
  detail,
  titleId,
  level = 2,
}: Props) {
  const Heading = level === 1 ? 'h1' : 'h2';

  return (
    <div className="section-marker">
      <div className="section-marker__row">
        <span className="section-marker__index">{index}</span>
        <Heading className="section-marker__title" id={titleId}>
          {title}
        </Heading>
      </div>
      {detail ? <div className="section-marker__detail">{detail}</div> : null}
    </div>
  );
}
