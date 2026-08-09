import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductShell } from '../../components/ProductShell';
import {
  ScaleBar,
  SectionMarker,
  StatusMark,
  TechnicalLabel,
  TechnicalPanel,
} from '../../components/schematic';
import { en } from '../../copy/en';
import {
  formatSol,
  getAdvertiserCampaigns,
  getBusiness,
  getBusinessRoles,
  getHostEarnings,
  getHostedDeals,
  getIncomingRequests,
  getLedger,
  getRedemptionQueue,
} from '../../mock/selectors';
import { useSession } from '../../mock/session';
import { useMockStore } from '../../mock/store';
import { OWN_BUSINESS_ID } from '../../mock/types';

const copy = en.businessApp;

export function DashboardPage() {
  const { session } = useSession();
  const { state, dispatch } = useMockStore();
  const businessId = session?.businessId ?? OWN_BUSINESS_ID;
  const businessName = session?.name ?? 'Your business';
  const business = getBusiness(state, businessId);

  useEffect(() => {
    if (!business) {
      dispatch({ type: 'ensure_business', id: businessId, name: businessName });
    }
  }, [business, businessId, businessName, dispatch]);

  const campaigns = getAdvertiserCampaigns(state, businessId);
  const requests = getIncomingRequests(state, businessId);
  const hosted = getHostedDeals(state, businessId);
  const queue = getRedemptionQueue(state, businessId);
  const roles = getBusinessRoles(state, businessId);
  const earned = getHostEarnings(state, businessId);
  const committed = campaigns.reduce(
    (sum, campaign) => sum + campaign.budgetSol,
    0,
  );

  return (
    <ProductShell
      surface="C"
      meta={`BUSINESS / ${campaigns.length} CAMPAIGNS / ${hosted.length} HOSTED`}
    >
      <div className="surface-stack">
        <section aria-labelledby="identity-heading">
          <TechnicalPanel
            index="C.01a"
            label={copy.identitySection}
            frame="medium"
            status={
              roles.isAdvertiser
                ? { state: 'active', label: copy.roleAdvertiser, domain: 'ROLE/' }
                : roles.isHost
                  ? { state: 'ok', label: copy.roleHost, domain: 'ROLE/' }
                  : { state: 'idle', label: copy.roleNone, domain: 'ROLE/' }
            }
          >
            <div className="identity">
              <div>
                <TechnicalLabel tone="soft">
                  {business?.sector ?? 'SECTOR — / YOUR SITE'}
                </TechnicalLabel>
                <h1 className="identity__name" id="identity-heading">
                  {business?.name ?? businessName}
                </h1>
                <p className="note">{copy.dashboardLede}</p>
              </div>

              <div className="role-flags">
                <div
                  className={`role-flag${roles.isAdvertiser ? ' role-flag--on' : ''}`}
                >
                  <StatusMark
                    state={roles.isAdvertiser ? 'active' : 'idle'}
                    label={copy.roleAdvertiser}
                  />
                  <p className="role-flag__why">
                    {roles.isAdvertiser
                      ? copy.roleAdvertiserWhy
                      : en.landing.advertiserRole.definition}
                  </p>
                </div>
                <div className={`role-flag${roles.isHost ? ' role-flag--on' : ''}`}>
                  <StatusMark
                    state={roles.isHost ? 'ok' : 'idle'}
                    label={copy.roleHost}
                  />
                  <p className="role-flag__why">
                    {roles.isHost ? copy.roleHostWhy : en.landing.hostRole.definition}
                  </p>
                </div>
              </div>

              {!roles.isAdvertiser && !roles.isHost ? (
                <p className="note">{copy.roleNoneWhy}</p>
              ) : null}
            </div>
          </TechnicalPanel>
        </section>

        <section aria-labelledby="metrics-heading">
          <h2 id="metrics-heading" className="visually-hidden">
            {copy.metricsSection}
          </h2>
          <TechnicalPanel index="C.02" label={copy.metricsSection} density="high">
            <div className="metric-grid">
              <p className="metric">
                <span className="metric__value">{campaigns.length}</span>
                <span className="metric__label">{copy.metricCampaigns}</span>
              </p>
              <p className="metric">
                <span className="metric__value">{formatSol(committed)}</span>
                <span className="metric__label">{copy.metricBudget}</span>
              </p>
              <p className="metric">
                <span className="metric__value">{hosted.length}</span>
                <span className="metric__label">{copy.metricHosted}</span>
              </p>
              <p className="metric">
                <span className="metric__value">{formatSol(earned)}</span>
                <span className="metric__label">{copy.metricEarned}</span>
              </p>
            </div>
          </TechnicalPanel>
        </section>

        <section aria-labelledby="campaigns-heading">
          <SectionMarker
            index="C.03"
            title={copy.campaignsSection}
            titleId="campaigns-heading"
          />

          <div className="actions" style={{ marginBottom: 'var(--space-4)' }}>
            <Link className="btn btn--primary" to="/business/campaigns/new">
              {copy.createCampaign}
            </Link>
          </div>

          {campaigns.length === 0 ? (
            <p className="empty">{copy.campaignsEmpty}</p>
          ) : (
            <div className="panel-grid">
              {campaigns.map((campaign, index) => {
                const ledger = getLedger(state, campaign);
                const partners = state.deals.filter(
                  (deal) => deal.campaignId === campaign.id,
                );

                return (
                  <TechnicalPanel
                    key={campaign.id}
                    index={`C.03${String.fromCharCode(97 + index)}`}
                    label={copy.ledgerLabel}
                    status={{
                      state: campaign.status === 'live' ? 'active' : 'idle',
                      label: campaign.status === 'live' ? 'Live' : 'Draft',
                      domain: 'CAMPAIGN/',
                    }}
                    footer={`CAMPAIGN/${campaign.id.toUpperCase()}`}
                  >
                    <div className="campaign-card">
                      <div className="campaign-card__head">
                        <h3 className="campaign-card__name">{campaign.name}</h3>
                        <TechnicalLabel tone="soft">
                          {formatSol(campaign.budgetSol)}
                        </TechnicalLabel>
                      </div>
                      <p className="note">{campaign.perk}</p>

                      <ScaleBar
                        total={ledger.total}
                        bands={[
                          {
                            label: copy.ledgerPaid,
                            value: ledger.paid,
                            tone: 'paid',
                          },
                          {
                            label: copy.ledgerReserved,
                            value: ledger.reserved,
                            tone: 'reserved',
                          },
                          {
                            label: copy.ledgerRemaining,
                            value: ledger.remaining,
                            tone: 'remaining',
                          },
                        ]}
                      />

                      <div>
                        <TechnicalLabel tone="soft">
                          {copy.partnersLabel}
                        </TechnicalLabel>
                        <ul className="partner-list">
                          {partners.map((deal) => (
                            <li key={deal.id}>
                              <span>
                                {getBusiness(state, deal.hostBusinessId)?.name ??
                                  deal.hostBusinessId}
                              </span>
                              <span className="partner-list__terms">
                                {deal.requiredVisits} {copy.visitsRequired} ·{' '}
                                {formatSol(deal.payoutSol)} {copy.perRedemption} ·{' '}
                                {deal.redemptionsPaid}/{deal.maxRedemptions}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TechnicalPanel>
                );
              })}
            </div>
          )}
        </section>

        <section aria-labelledby="requests-heading">
          <SectionMarker
            index="C.04"
            title={copy.requestsSection}
            detail={copy.requestsLede}
            titleId="requests-heading"
          />

          {requests.length === 0 ? (
            <p className="empty">{copy.requestsEmpty}</p>
          ) : (
            <div className="panel-grid panel-grid--two">
              {requests.map((deal, index) => {
                const campaign = state.campaigns.find(
                  (item) => item.id === deal.campaignId,
                );
                const advertiser = campaign
                  ? getBusiness(state, campaign.advertiserBusinessId)
                  : undefined;

                return (
                  <TechnicalPanel
                    key={deal.id}
                    index={`C.04${String.fromCharCode(97 + index)}`}
                    label={advertiser?.name ?? 'Advertiser'}
                    status={{
                      state: 'warn',
                      label: 'Proposed',
                      domain: 'DEAL/',
                    }}
                  >
                    <h3 className="campaign-card__name">
                      {campaign?.name ?? deal.campaignId}
                    </h3>
                    <p className="note">{campaign?.perk}</p>
                    <dl className="data-list">
                      <div className="data-list__row">
                        <dt className="data-list__key">{copy.requestTerms}</dt>
                        <dd className="data-list__value data-list__value--mono">
                          {deal.requiredVisits} {copy.visitsRequired}
                        </dd>
                      </div>
                      <div className="data-list__row">
                        <dt className="data-list__key">{copy.perRedemption}</dt>
                        <dd className="data-list__value data-list__value--mono">
                          {formatSol(deal.payoutSol)}
                        </dd>
                      </div>
                      <div className="data-list__row">
                        <dt className="data-list__key">
                          {copy.maxRedemptions}
                        </dt>
                        <dd className="data-list__value data-list__value--mono">
                          {deal.maxRedemptions}
                        </dd>
                      </div>
                    </dl>
                    <div className="actions">
                      <button
                        type="button"
                        className="btn btn--primary"
                        onClick={() =>
                          dispatch({
                            type: 'respond_partnership',
                            dealId: deal.id,
                            accept: true,
                          })
                        }
                      >
                        {copy.requestAccept}
                      </button>
                      <button
                        type="button"
                        className="btn btn--danger"
                        onClick={() =>
                          dispatch({
                            type: 'respond_partnership',
                            dealId: deal.id,
                            accept: false,
                          })
                        }
                      >
                        {copy.requestDecline}
                      </button>
                    </div>
                  </TechnicalPanel>
                );
              })}
            </div>
          )}
        </section>

        <section aria-labelledby="hosting-heading">
          <SectionMarker
            index="C.05"
            title={copy.hostingSection}
            titleId="hosting-heading"
          />

          {hosted.length === 0 ? (
            <p className="empty">{copy.hostingEmpty}</p>
          ) : (
            <TechnicalPanel index="C.05a" label={copy.hostingSection} density="high">
              <ul className="partner-list">
                {hosted.map((deal) => {
                  const campaign = state.campaigns.find(
                    (item) => item.id === deal.campaignId,
                  );
                  return (
                    <li key={deal.id}>
                      <span>{campaign?.name ?? deal.campaignId}</span>
                      <span className="partner-list__terms">
                        {deal.redemptionsPaid} {copy.hostingRedemptions} ·{' '}
                        {formatSol(deal.redemptionsPaid * deal.payoutSol)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </TechnicalPanel>
          )}
        </section>

        <section aria-labelledby="queue-heading">
          <SectionMarker
            index="C.06"
            title={copy.redemptionsSection}
            detail={copy.redemptionsLede}
            titleId="queue-heading"
          />

          {queue.length === 0 ? (
            <p className="empty">{copy.redemptionsEmpty}</p>
          ) : (
            <div className="panel-grid">
              {queue.map(({ claim, campaign, deal }) => (
                <div className="queue-item" key={claim.id}>
                  <StatusMark
                    state="warn"
                    label="Redemption requested"
                    domain="CLAIM/"
                  />
                  <h3 className="campaign-card__name">{campaign.name}</h3>
                  <p className="note">
                    {claim.id} · {deal.requiredVisits} {copy.visitsRequired} ·{' '}
                    {formatSol(deal.payoutSol)} {copy.perRedemption}
                  </p>
                  <div className="actions">
                    <button
                      type="button"
                      className="btn btn--primary"
                      onClick={() =>
                        dispatch({
                          type: 'validate_redemption',
                          claimId: claim.id,
                        })
                      }
                    >
                      {copy.validate}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section aria-labelledby="activity-heading">
          <SectionMarker
            index="C.07"
            title={copy.activitySection}
            titleId="activity-heading"
          />
          <TechnicalPanel index="C.07a" label={copy.activitySection} density="high">
            {state.activity.length === 0 ? (
              <p className="empty">{copy.activityEmpty}</p>
            ) : (
              <ul className="activity-log">
                {state.activity.map((entry) => (
                  <li key={entry.id}>
                    <span className="activity-log__time">
                      {new Date(entry.at).toLocaleString('en-GB')}
                    </span>
                    <span className="activity-log__label">{entry.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </TechnicalPanel>
        </section>
      </div>
    </ProductShell>
  );
}
