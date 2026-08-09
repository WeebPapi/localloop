type Props = {
  value: string;
  caption?: string;
};

/** `FIG. 04` marker used to label diagrams. */
export function FigureIndex({ value, caption }: Props) {
  return (
    <p className="figure-index">
      <span className="figure-index__value">FIG. {value}</span>
      {caption ? <span className="figure-index__caption">{caption}</span> : null}
    </p>
  );
}
