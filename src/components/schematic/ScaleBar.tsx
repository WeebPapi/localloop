export type ScaleBand = {
  label: string;
  value: number;
  tone: 'paid' | 'reserved' | 'remaining';
};

type Props = {
  total: number;
  bands: ScaleBand[];
  unit?: string;
};

function percent(value: number, total: number): number {
  if (total <= 0) return 0;
  return Math.max(0, Math.min(100, (value / total) * 100));
}

/** Proportional ledger bar: the campaign budget drawn to scale. */
export function ScaleBar({ total, bands, unit = 'SOL' }: Props) {
  const description = bands
    .map((band) => `${band.label} ${band.value} ${unit}`)
    .join(', ');

  return (
    <div className="scalebar">
      <div
        className="scalebar__track"
        role="img"
        aria-label={`Budget of ${total} ${unit}: ${description}`}
      >
        {bands.map((band) => (
          <span
            key={band.tone}
            className={`scalebar__band scalebar__band--${band.tone}`}
            style={{ width: `${percent(band.value, total)}%` }}
          />
        ))}
      </div>
      <dl className="scalebar__legend">
        {bands.map((band) => (
          <div key={band.tone} className="scalebar__legend-item">
            <dt className={`scalebar__key scalebar__key--${band.tone}`}>
              {band.label}
            </dt>
            <dd className="scalebar__value">
              {band.value} {unit}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
