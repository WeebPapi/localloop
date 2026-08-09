import { ProductShell } from '../../components/ProductShell';
import {
  SectionMarker,
  TechnicalLabel,
  TechnicalPanel,
} from '../../components/schematic';
import { en } from '../../copy/en';
import { getOffers } from '../../mock/selectors';
import { useSession } from '../../mock/session';
import { useMockStore } from '../../mock/store';
import { DealCard } from './DealCard';

const copy = en.customerApp;

export function DealsIndexPage() {
  const { state } = useMockStore();
  const { session } = useSession();
  const offers = getOffers(state);
  const passes = offers.filter((offer) => offer.claim);

  return (
    <ProductShell surface="B" meta={`CUSTOMER / ${offers.length} LIVE DEALS`}>
      <div className="surface-stack">
        <div className="identity">
          <div>
            <TechnicalLabel tone="soft">
              {session ? session.name : 'Customer'}
            </TechnicalLabel>
            <h1 className="identity__name">{copy.indexTitle}</h1>
            <p className="prose">{copy.indexLede}</p>
          </div>
        </div>

        <section aria-labelledby="passes-heading">
          <SectionMarker
            index="B.02"
            title={copy.passesSection}
            detail={session ? `${session.name}` : undefined}
            titleId="passes-heading"
          />
          {passes.length === 0 ? (
            <p className="empty">{copy.passesEmpty}</p>
          ) : (
            <div className="deal-deck">
              {passes.map((offer, index) => (
                <DealCard
                  key={offer.deal.id}
                  offer={offer}
                  index={String(index + 1).padStart(2, '0')}
                />
              ))}
            </div>
          )}
        </section>

        <section aria-labelledby="index-heading">
          <SectionMarker
            index="B.03"
            title={copy.indexSection}
            titleId="index-heading"
          />

          {offers.length === 0 ? (
            <TechnicalPanel index="B.03a" label={copy.indexSection}>
              <p className="empty">{copy.indexEmpty}</p>
            </TechnicalPanel>
          ) : (
            <div className="deal-deck">
              {offers.map((offer, index) => (
                <DealCard
                  key={offer.deal.id}
                  offer={offer}
                  index={`D-${String(index + 1).padStart(2, '0')}`}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </ProductShell>
  );
}
