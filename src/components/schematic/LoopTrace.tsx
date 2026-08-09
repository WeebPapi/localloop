import { useIsCompact } from './useMediaQuery';

export type LoopNodeId = 'advertiser' | 'host' | 'customer';

export type LoopNode = {
  id: LoopNodeId;
  index: string;
  title: string;
  caption: string;
};

export type LoopEdge = {
  from: LoopNodeId;
  to: LoopNodeId;
  label: string;
};

type Props = {
  nodes: [LoopNode, LoopNode, LoopNode];
  edges: [LoopEdge, LoopEdge, LoopEdge];
  /** Highlights the node whose turn it is. */
  active?: LoopNodeId | null;
  /** Animates the outbound traces to indicate flow. */
  animated?: boolean;
  description: string;
};

/**
 * The advertiser -> host -> customer -> advertiser loop, the product's
 * recurring motif. Recomposes to a vertical sequence on narrow screens.
 */
export function LoopTrace({
  nodes,
  edges,
  active = null,
  animated = false,
  description,
}: Props) {
  const compact = useIsCompact();
  const traceClass = animated ? 'loop__trace loop__trace--live' : 'loop__trace';

  if (compact) {
    const y = [86, 246, 406];
    return (
      <svg
        className="loop loop--vertical"
        viewBox="0 0 300 500"
        role="img"
        aria-label={description}
      >
        <path
          className="loop__construction"
          d="M46 60V462"
          strokeDasharray="4 6"
          fill="none"
        />
        {[0, 1].map((i) => (
          <path
            key={`edge-${i}`}
            className={traceClass}
            d={`M46 ${y[i] + 22}V${y[i + 1] - 26}`}
            fill="none"
            markerEnd="url(#loop-arrow)"
          />
        ))}
        <path
          className={`${traceClass} loop__trace--return`}
          d={`M46 ${y[2] + 22}V462H278V22H46V${y[0] - 26}`}
          fill="none"
          markerEnd="url(#loop-arrow)"
        />
        {edges.slice(0, 2).map((edge, i) => (
          <text
            key={edge.label}
            className="loop__edge-label"
            x="66"
            y={y[i] + 76}
          >
            {edge.label}
          </text>
        ))}
        <text className="loop__edge-label" x="162" y="486" textAnchor="middle">
          {edges[2].label}
        </text>
        {nodes.map((node, i) => (
          <g
            key={node.id}
            className={`loop__node${active === node.id ? ' loop__node--active' : ''}`}
          >
            <circle className="loop__node-ring" cx="46" cy={y[i]} r="22" />
            <text className="loop__node-index" x="46" y={y[i] + 5}>
              {node.index}
            </text>
            <text className="loop__node-title" x="82" y={y[i] - 2}>
              {node.title}
            </text>
            <text className="loop__node-caption" x="82" y={y[i] + 18}>
              {node.caption}
            </text>
          </g>
        ))}
        <LoopDefs />
      </svg>
    );
  }

  const x = [110, 380, 650];
  return (
    <svg
      className="loop loop--horizontal"
      viewBox="0 0 760 250"
      role="img"
      aria-label={description}
    >
      <path
        className="loop__construction"
        d="M110 176V214M380 176V214M650 176V214"
        strokeDasharray="4 6"
        fill="none"
      />
      {[0, 1].map((i) => (
        <path
          key={`edge-${i}`}
          className={traceClass}
          d={`M${x[i] + 30} 84H${x[i + 1] - 34}`}
          fill="none"
          markerEnd="url(#loop-arrow)"
        />
      ))}
      <path
        className={`${traceClass} loop__trace--return`}
        d={`M${x[2] + 30} 84H730V214H30V84H${x[0] - 34}`}
        fill="none"
        markerEnd="url(#loop-arrow)"
      />
      {edges.slice(0, 2).map((edge, i) => (
        <text
          key={edge.label}
          className="loop__edge-label"
          x={(x[i] + x[i + 1]) / 2}
          y="70"
          textAnchor="middle"
        >
          {edge.label}
        </text>
      ))}
      <text className="loop__edge-label" x="380" y="234" textAnchor="middle">
        {edges[2].label}
      </text>
      {nodes.map((node, i) => (
        <g
          key={node.id}
          className={`loop__node${active === node.id ? ' loop__node--active' : ''}`}
        >
          <circle className="loop__node-ring" cx={x[i]} cy="84" r="30" />
          <text className="loop__node-index" x={x[i]} y="90" textAnchor="middle">
            {node.index}
          </text>
          <text
            className="loop__node-title"
            x={x[i]}
            y="140"
            textAnchor="middle"
          >
            {node.title}
          </text>
          <text
            className="loop__node-caption"
            x={x[i]}
            y="160"
            textAnchor="middle"
          >
            {node.caption}
          </text>
        </g>
      ))}
      <LoopDefs />
    </svg>
  );
}

function LoopDefs() {
  return (
    <defs>
      <marker
        id="loop-arrow"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0 1L9 5L0 9Z" fill="currentColor" />
      </marker>
    </defs>
  );
}
