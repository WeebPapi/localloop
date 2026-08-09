import { Link, Navigate, Outlet, Route, useParams } from 'react-router-dom';
import { ids } from '../../shared/ids';
import type { BusinessCapability } from '../../shared/types';
import { AppShell } from '../components/AppShell';
import { BusinessWorkspaceSwitcher } from '../components/BusinessWorkspaceSwitcher';
import { en } from '../copy/en';
import { AdvertiserPage } from '../features/advertiser/AdvertiserPage';
import { CustomerPage } from '../features/customer/CustomerPage';
import { HostPage } from '../features/host/HostPage';
import { WalletProviders } from '../lib/WalletProviders';
import { DemoStateProvider, useDemoState } from './DemoStateProvider';

/**
 * The server-authoritative Solana demo. Everything under /live/* talks to the
 * Express API; the product app at / is mocked and never enters this tree.
 */
function LiveProviders() {
  return (
    <WalletProviders>
      <DemoStateProvider>
        <Outlet />
      </DemoStateProvider>
    </WalletProviders>
  );
}

function DemoLauncher() {
  return (
    <AppShell>
      <div className="panel stack">
        <h2>{en.demoLauncherTitle}</h2>
        <p>{en.demoLauncherBody}</p>
        <div className="launcher-grid">
          <Link className="btn btn--primary" to="/live/customer">
            {en.openCustomer}
          </Link>
          <Link className="btn btn--primary" to="/live/advertiser">
            {en.openAdvertiser}
          </Link>
          <Link className="btn btn--primary" to="/live/host">
            {en.openHost}
          </Link>
        </div>
        <p>
          <Link to="/">{en.backToProduct}</Link>
        </p>
      </div>
    </AppShell>
  );
}

function BusinessWorkspaceRoute({
  workspace,
}: {
  workspace: BusinessCapability;
}) {
  const { businessId = '' } = useParams();
  const { state, status, error } = useDemoState();
  const business = state.businesses.find((item) => item.id === businessId);

  if (status === 'loading') {
    return (
      <AppShell>
        <p>{en.loading}</p>
      </AppShell>
    );
  }

  if (!business) {
    return <Navigate to="/live" replace />;
  }

  if (!business.capabilities.includes(workspace)) {
    return (
      <AppShell>
        <div className="panel">
          <p>{en.capabilityMissing}</p>
          <Link className="btn" to="/live">
            {en.brand}
          </Link>
        </div>
      </AppShell>
    );
  }

  const switcher = (
    <BusinessWorkspaceSwitcher
      businessId={business.id}
      capabilities={business.capabilities}
    />
  );

  if (workspace === 'advertiser') {
    return (
      <AppShell title={business.name} workspaceSwitch={switcher}>
        {error ? <p className="error">{error}</p> : null}
        <AdvertiserPage businessId={business.id} />
      </AppShell>
    );
  }

  return (
    <AppShell title={business.name} workspaceSwitch={switcher}>
      {error ? <p className="error">{error}</p> : null}
      <HostPage businessId={business.id} />
    </AppShell>
  );
}

function CustomerRoute() {
  const { customerId = '' } = useParams();
  const { state } = useDemoState();
  const customer = state.customers.find((item) => item.id === customerId);

  if (!customer) {
    return <Navigate to={`/live/customer/${ids.nino}`} replace />;
  }

  return (
    <AppShell title={en.personaNino}>
      <CustomerPage customerId={customer.id} />
    </AppShell>
  );
}

export function liveRoutes() {
  return (
    <Route path="/live" element={<LiveProviders />}>
      <Route index element={<DemoLauncher />} />
      <Route
        path="customer"
        element={<Navigate to={`/live/customer/${ids.nino}`} replace />}
      />
      <Route path="customer/:customerId" element={<CustomerRoute />} />
      <Route
        path="advertiser"
        element={
          <Navigate to={`/live/business/${ids.magnolia}/advertiser`} replace />
        }
      />
      <Route
        path="host"
        element={<Navigate to={`/live/business/${ids.camora}/host`} replace />}
      />
      <Route
        path="business/:businessId/advertiser"
        element={<BusinessWorkspaceRoute workspace="advertiser" />}
      />
      <Route
        path="business/:businessId/host"
        element={<BusinessWorkspaceRoute workspace="host" />}
      />
      <Route path="*" element={<Navigate to="/live" replace />} />
    </Route>
  );
}
