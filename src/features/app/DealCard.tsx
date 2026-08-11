import { useId, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PartnershipMark } from '../../components/BrandMark';
import { StatusMark, Teleprinter, useInView } from '../../components/schematic';
import { en } from '../../copy/en';
import type { Offer } from '../../mock/selectors';
import type { BusinessLinks, MockBusiness } from '../../mock/types';
import { claimMark } from './claimStatus';

const copy = en.customerApp;

type Props = {
  offer: Offer;
  index: string;
  /** Zero-based deck position used to stagger the headline reveal. */
  stagger?: number;
};

type PlaceKind = 'visit' | 'reward';

function preferredLink(
  links: BusinessLinks | undefined,
  kind: PlaceKind,
): string | undefined {
  if (!links) return undefined;
  if (kind === 'visit') {
    return links.maps ?? links.website ?? links.instagram;
  }
  return links.instagram ?? links.website ?? links.maps;
}

function PlaceBlock({
  role,
  instruction,
  business,
  kind,
}: {
  role: string;
  instruction?: string;
  business: MockBusiness;
  kind: PlaceKind;
}) {
  const href = preferredLink(business.links, kind);
  const name = href ? (
    <a
      className="deal-card__place-link"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <span className="deal-card__place-name">{business.name}</span>
      <span className="deal-card__place-jump" aria-hidden="true">
        ↗
      </span>
    </a>
  ) : (
    <span className="deal-card__place-name">{business.name}</span>
  );

  return (
    <div className={`deal-card__place deal-card__place--${kind}`}>
      <p className="deal-card__place-role">
        <span className="deal-card__place-lead">
          <span>{role}</span>
          {instruction ? (
            <span className="deal-card__place-arrow" aria-hidden="true">
              →
            </span>
          ) : null}
        </span>
        {instruction ? (
          <span className="deal-card__place-ask">{instruction}</span>
        ) : null}
      </p>
      {name}
      <p className="deal-card__place-meta">{business.category}</p>
    </div>
  );
}

export function DealCard({ offer, index, stagger = 0 }: Props) {
  const [open, setOpen] = useState(false);
  const drawerId = useId();
  const [cardRef, inView] = useInView<HTMLElement>();
  const { deal, campaign, advertiser, host, claim } = offer;
  const mark = claimMark(claim);

  let progress: ReactNode = null;
  if (claim && deal.criterionKind === 'visits') {
    progress = (
      <span className="deal-card__chip">
        {claim.verifiedVisits}/{deal.requiredVisits}
      </span>
    );
  } else if (claim && deal.criterionKind === 'action') {
    progress = (
      <span className="deal-card__chip">
        {claim.verifiedVisits >= deal.requiredVisits
          ? copy.actionDone
          : copy.actionPending}
      </span>
    );
  }

  return (
    <article
      ref={cardRef}
      className={`deal-card${open ? ' deal-card--open' : ''}`}
      data-index={index}
    >
      <div className="deal-card__plate">
        <div className="deal-card__marks">
          <PartnershipMark host={host} advertiser={advertiser} size="md" />
          <div className="deal-card__meta">
            <span className="deal-card__index">{index}</span>
            <StatusMark state={mark.state} label={mark.label} />
            {progress}
          </div>
        </div>

        <div className="deal-card__body">
          <p className="deal-card__pair">
            <span>{host.name}</span>
            <span className="deal-card__pair-x" aria-hidden="true">
              ×
            </span>
            <span>{advertiser.name}</span>
          </p>
          <Teleprinter
            as="h3"
            className="deal-card__title"
            text={deal.headline}
            trigger={inView}
            delay={Math.min(stagger, 6) * 90}
            caret={false}
          />
        </div>

        <div className="deal-card__places">
          <PlaceBlock
            role={copy.placeVisit}
            instruction={deal.criterion}
            business={host}
            kind="visit"
          />
          <PlaceBlock
            role={copy.placeReward}
            business={advertiser}
            kind="reward"
          />
        </div>
      </div>

      <button
        type="button"
        className="deal-card__toggle"
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="deal-card__toggle-rule" aria-hidden="true" />
        <span className="deal-card__toggle-label">
          <span className="deal-card__toggle-glyph" aria-hidden="true">
            {open ? '▴' : '▾'}
          </span>
          {open ? copy.collapseDeal : copy.expandDeal}
        </span>
        <span className="deal-card__toggle-rule" aria-hidden="true" />
      </button>

      <div
        id={drawerId}
        className="deal-card__drawer"
        data-open={open ? 'true' : 'false'}
        aria-hidden={open ? undefined : true}
        inert={open ? undefined : true}
      >
        <div className="deal-card__drawer-inner">
          <div className="deal-card__drawer-panel">
            <div className="deal-card__drawer-grid">
              <div>
                <p className="deal-card__place-role">{copy.finePrint}</p>
                <p className="deal-card__drawer-copy">{campaign.conditions}</p>
              </div>
            </div>

            <Link
              className="btn btn--primary deal-card__open"
              to={`/app/deals/${deal.id}`}
              tabIndex={open ? undefined : -1}
            >
              {copy.openDeal}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
