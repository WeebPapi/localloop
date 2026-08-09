import { Link } from 'react-router-dom';
import { ProductShell } from '../../components/ProductShell';
import {
  Annotation,
  FigureIndex,
  GridOverlay,
  LoopTrace,
  SectionMarker,
  TechnicalPanel,
  type LoopEdge,
  type LoopNode,
} from '../../components/schematic';
import { en } from '../../copy/en';
import { defaultRouteFor, useSession } from '../../mock/session';

const copy = en.landing;

const loopNodes: [LoopNode, LoopNode, LoopNode] = [
  {
    id: 'advertiser',
    index: '01',
    title: copy.loopNodes.advertiserTitle,
    caption: copy.loopNodes.advertiserCaption,
  },
  {
    id: 'host',
    index: '02',
    title: copy.loopNodes.hostTitle,
    caption: copy.loopNodes.hostCaption,
  },
  {
    id: 'customer',
    index: '03',
    title: copy.loopNodes.customerTitle,
    caption: copy.loopNodes.customerCaption,
  },
];

const loopEdges: [LoopEdge, LoopEdge, LoopEdge] = [
  {
    from: 'advertiser',
    to: 'host',
    label: copy.loopEdges.advertiserToHost,
  },
  { from: 'host', to: 'customer', label: copy.loopEdges.hostToCustomer },
  {
    from: 'customer',
    to: 'advertiser',
    label: copy.loopEdges.customerToAdvertiser,
  },
];

export function LandingPage() {
  const { session } = useSession();
  const primaryHref = session ? defaultRouteFor(session.type) : '/auth';

  return (
    <ProductShell surface="A" meta={copy.metaIndex}>
      <div className="surface-stack">
        <section className="hero">
          <GridOverlay variant="plan" />

          <p className="hero__top">
            <span>FIG. 00 / {copy.metaIndex}</span>
            <span>{copy.status}</span>
          </p>

          <div className="hero__body">
            <p className="hero__eyebrow">{copy.eyebrow}</p>
            <h1 className="hero__title">{copy.title}</h1>
            <p className="hero__lede">{copy.lede}</p>
          </div>

          <div className="hero__foot">
            <div className="actions">
              <Link className="btn btn--primary" to={primaryHref}>
                {copy.heroPrimary}
              </Link>
              <a className="btn" href="#how">
                {copy.heroSecondary}
              </a>
            </div>
            <p className="hero__coords">{copy.heroMeta}</p>
          </div>
        </section>

        <section aria-labelledby="loop-heading">
          <SectionMarker
            index="A.01"
            title={copy.loopFigure}
            titleId="loop-heading"
          />
          <div className="loop-figure">
            <FigureIndex value="01" caption={copy.loopFigure} />
            <LoopTrace
              nodes={loopNodes}
              edges={loopEdges}
              animated
              description={copy.loopDescription}
            />
            <div className="loop-figure__annotations">
              <Annotation
                index="01"
                label={copy.loopNodes.advertiserTitle}
                detail={copy.advertiserRole.definition}
              />
              <Annotation
                index="02"
                label={copy.loopNodes.hostTitle}
                detail={copy.hostRole.definition}
              />
              <Annotation
                index="03"
                label={copy.loopNodes.customerTitle}
                detail={copy.customerRole.definition}
              />
            </div>
          </div>
        </section>

        <section id="how" aria-labelledby="how-heading">
          <SectionMarker
            index="A.02"
            title={copy.sections.how}
            detail={copy.howBody}
            titleId="how-heading"
          />
          <div className="steps">
            {copy.steps.map((step) => (
              <article className="step" key={step.index}>
                <p className="step__index">{step.index}</p>
                <div>
                  <h3 className="step__title">{step.title}</h3>
                  <p className="step__body">{step.body}</p>
                  <p className="step__meta">{step.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="sides-heading">
          <SectionMarker
            index="A.03"
            title={copy.sections.sides}
            titleId="sides-heading"
          />
          <div className="panel-grid panel-grid--two">
            <TechnicalPanel
              index={`${copy.customerSide.index}.00`}
              label={copy.customerSide.label}
              frame="medium"
              density="low"
            >
              <h3 className="side-card__title">{copy.customerSide.title}</h3>
              <p>{copy.customerSide.body}</p>
              <ul className="side-card__points">
                {copy.customerSide.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="actions">
                <Link
                  className="btn btn--primary"
                  to="/auth/register?type=customer"
                >
                  {copy.customerSide.cta}
                </Link>
              </p>
            </TechnicalPanel>

            <TechnicalPanel
              index={`${copy.businessSide.index}.00`}
              label={copy.businessSide.label}
              frame="medium"
              density="low"
            >
              <h3 className="side-card__title">{copy.businessSide.title}</h3>
              <p>{copy.businessSide.body}</p>
              <ul className="side-card__points">
                {copy.businessSide.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="actions">
                <Link
                  className="btn btn--primary"
                  to="/auth/register?type=business"
                >
                  {copy.businessSide.cta}
                </Link>
              </p>
            </TechnicalPanel>
          </div>
        </section>

        <section aria-labelledby="roles-heading">
          <SectionMarker
            index="A.04"
            title={copy.sections.roles}
            detail={copy.rolesBody}
            titleId="roles-heading"
          />
          <div className="panel-grid panel-grid--two">
            <TechnicalPanel
              index="A.04a"
              label="State"
              status={{ state: 'active', label: 'Advertiser', domain: 'ROLE/' }}
            >
              <p className="role-card__term">{copy.advertiserRole.label}</p>
              <p className="role-card__definition">
                {copy.advertiserRole.definition}
              </p>
              <p className="role-card__detail">{copy.advertiserRole.detail}</p>
            </TechnicalPanel>

            <TechnicalPanel
              index="A.04b"
              label="State"
              status={{ state: 'ok', label: 'Host', domain: 'ROLE/' }}
            >
              <p className="role-card__term">{copy.hostRole.label}</p>
              <p className="role-card__definition">
                {copy.hostRole.definition}
              </p>
              <p className="role-card__detail">{copy.hostRole.detail}</p>
            </TechnicalPanel>
          </div>
          <p className="note" style={{ marginTop: 'var(--space-4)' }}>
            {copy.rolesBoth}
          </p>
        </section>

        <section aria-labelledby="start-heading">
          <SectionMarker
            index="A.05"
            title={copy.sections.start}
            detail={copy.startBody}
            titleId="start-heading"
          />
          <div className="actions">
            <Link className="btn btn--primary" to="/auth">
              {copy.heroPrimary}
            </Link>
            <Link className="btn" to="/auth/login">
              {en.auth.signIn}
            </Link>
          </div>
          <TechnicalPanel
            index="A.05a"
            label="Solana"
            density="high"
            className="panel-grid"
          >
            <p className="note">{copy.liveLinkDetail}</p>
            <p>
              <Link className="btn btn--ghost btn--small" to="/live">
                {copy.liveLink}
              </Link>
            </p>
          </TechnicalPanel>
        </section>
      </div>
    </ProductShell>
  );
}
