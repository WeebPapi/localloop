import { Link, useParams } from 'react-router-dom';
import { PartnershipMark } from '../../components/BrandMark';
import { ProductShell } from '../../components/ProductShell';
import {
  FigureIndex,
  LoopTrace,
  StampProgress,
  TechnicalLabel,
  TechnicalPanel,
  Teleprinter,
  type LoopEdge,
  type LoopNode,
  type LoopNodeId,
} from '../../components/schematic';
import { en } from '../../copy/en';
import { formatSol, getOffer } from '../../mock/selectors';
import { useMockStore } from '../../mock/store';
import { claimMark } from './claimStatus';

const copy = en.customerApp;

export function DealDetailPage() {
  const { dealId = '' } = useParams();
  const { state, dispatch } = useMockStore();
  const offer = getOffer(state, dealId);

  if (!offer) {
    return (
      <ProductShell surface="B" meta="CUSTOMER / DEAL">
        <TechnicalPanel index="B.04" label="Deal">
          <h1>{copy.detailSection}</h1>
          <p>{copy.notFound}</p>
          <p>
            <Link className="btn" to="/app/deals">
              {copy.backToDeals}
            </Link>
          </p>
        </TechnicalPanel>
      </ProductShell>
    );
  }

  const { deal, campaign, advertiser, host, claim } = offer;
  const mark = claimMark(claim);
  const visits = claim?.verifiedVisits ?? 0;
  const pairLabel = `${host.name} × ${advertiser.name} · ${advertiser.sector}`;
  const labelSpeed = 28;
  const titleDelay = pairLabel.length * labelSpeed + 80;

  const activeNode: LoopNodeId =
    !claim || claim.status === 'locked' ? 'host' : 'advertiser';

  const nodes: [LoopNode, LoopNode, LoopNode] = [
    {
      id: 'advertiser',
      index: '01',
      title: advertiser.name,
      caption: en.landing.loopNodes.advertiserCaption,
    },
    {
      id: 'host',
      index: '02',
      title: host.name,
      caption: en.landing.loopNodes.hostCaption,
    },
    {
      id: 'customer',
      index: '03',
      title: en.landing.loopNodes.customerTitle,
      caption: en.landing.loopNodes.customerCaption,
    },
  ];

  const edges: [LoopEdge, LoopEdge, LoopEdge] = [
    {
      from: 'advertiser',
      to: 'host',
      label: en.landing.loopEdges.advertiserToHost,
    },
    { from: 'host', to: 'customer', label: en.landing.loopEdges.hostToCustomer },
    {
      from: 'customer',
      to: 'advertiser',
      label: en.landing.loopEdges.customerToAdvertiser,
    },
  ];

  return (
    <ProductShell surface="B" meta={`CUSTOMER / DEAL ${deal.id.toUpperCase()}`}>
      <div className="surface-stack">
        <p className="note">
          <Link to="/app/deals">← {copy.backToDeals}</Link>
        </p>

        <div className="deal-detail">
          <div className="surface-stack">
            <article className="deal-hero">
              <div className="deal-hero__media deal-hero__media--pair">
                <PartnershipMark host={host} advertiser={advertiser} size="lg" />
              </div>
              <TechnicalLabel tone="soft">
                <Teleprinter
                  text={pairLabel}
                  speed={labelSpeed}
                  caret={false}
                />
              </TechnicalLabel>
              <Teleprinter
                as="h1"
                className="deal-hero__title"
                text={deal.headline}
                delay={titleDelay}
              />
              <p className="deal-hero__perk">{campaign.perk}</p>
              <p className="note">{campaign.conditions}</p>
            </article>

            <TechnicalPanel
              index="B.04a"
              label={copy.criteriaSection}
              frame="medium"
            >
              <dl className="data-list">
                <div className="data-list__row">
                  <dt className="data-list__key">{copy.criteriaHost}</dt>
                  <dd className="data-list__value">
                    {host.name} — {host.address}
                  </dd>
                </div>
                <div className="data-list__row">
                  <dt className="data-list__key">
                    {deal.criterionKind === 'action'
                      ? copy.criteriaAction
                      : copy.criteriaVisits}
                  </dt>
                  <dd className="data-list__value">
                    {deal.criterion}
                  </dd>
                </div>
                <div className="data-list__row">
                  <dt className="data-list__key">{copy.criteriaPerk}</dt>
                  <dd className="data-list__value">{campaign.perk}</dd>
                </div>
                <div className="data-list__row">
                  <dt className="data-list__key">{copy.criteriaConditions}</dt>
                  <dd className="data-list__value">{campaign.conditions}</dd>
                </div>
                <div className="data-list__row">
                  <dt className="data-list__key">{copy.criteriaOneTime}</dt>
                  <dd className="data-list__value data-list__value--mono">
                    1 / customer
                  </dd>
                </div>
                <div className="data-list__row">
                  <dt className="data-list__key">{copy.criteriaPayout}</dt>
                  <dd className="data-list__value data-list__value--mono">
                    {formatSol(deal.payoutSol)}
                  </dd>
                </div>
              </dl>
            </TechnicalPanel>

            <TechnicalPanel index="B.04b" label={copy.partnersSection}>
              <FigureIndex value="02" caption={copy.partnersSection} />
              <LoopTrace
                nodes={nodes}
                edges={edges}
                active={activeNode}
                description={en.landing.loopDescription}
              />
            </TechnicalPanel>
          </div>

          <TechnicalPanel
            index="B.04c"
            label={copy.progressSection}
            frame="medium"
            status={mark}
            footer={
              claim ? (
                <Teleprinter text={`CLAIM/${claim.id}`} speed={22} />
              ) : (
                'CLAIM/NOT OPENED'
              )
            }
          >
            <StampProgress
              completed={visits}
              required={deal.requiredVisits}
              label={copy.progressLabel}
            />

            {!claim ? (
              <>
                <p className="note">{copy.claimHint}</p>
                <button
                  type="button"
                  className="btn btn--primary btn--block"
                  onClick={() => dispatch({ type: 'claim_deal', dealId: deal.id })}
                >
                  {copy.claimAction}
                </button>
              </>
            ) : null}

            {claim?.status === 'locked' ? (
              <>
                <div className="pass-status">
                  <h3 className="pass-status__title">{copy.lockedTitle}</h3>
                  <p className="pass-status__body">{copy.lockedBody}</p>
                </div>
                <button
                  type="button"
                  className="btn btn--primary btn--block"
                  onClick={() => dispatch({ type: 'log_visit', dealId: deal.id })}
                >
                  {deal.criterionKind === 'action'
                    ? copy.actionAction
                    : copy.visitAction}
                </button>
                <p className="note">
                  {deal.criterionKind === 'action'
                    ? copy.actionHint
                    : copy.visitHint}
                </p>
              </>
            ) : null}

            {claim?.status === 'unlocked' ? (
              <>
                <p className="note">
                  {deal.criterionKind === 'action'
                    ? deal.criterion
                    : copy.visitsDone}
                </p>
                <button
                  type="button"
                  className="btn btn--primary btn--block"
                  onClick={() =>
                    dispatch({ type: 'request_redemption', claimId: claim.id })
                  }
                >
                  {copy.redeemAction}
                </button>
                <p className="note">{copy.redeemHint}</p>
              </>
            ) : null}

            {claim?.status === 'redemption_requested' ? (
              <div className="pass-status">
                <h3 className="pass-status__title">{copy.requestedTitle}</h3>
                <p className="pass-status__body">{copy.requestedBody}</p>
              </div>
            ) : null}

            {claim?.status === 'redeemed' ? (
              <div className="pass-status pass-status--done">
                <h3 className="pass-status__title">{copy.redeemedTitle}</h3>
                <p className="pass-status__body">{copy.redeemedBody}</p>
              </div>
            ) : null}
          </TechnicalPanel>
        </div>
      </div>
    </ProductShell>
  );
}
