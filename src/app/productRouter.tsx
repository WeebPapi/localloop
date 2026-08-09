import { Navigate, Route } from 'react-router-dom';
import { DealDetailPage } from '../features/app/DealDetailPage';
import { DealsIndexPage } from '../features/app/DealsIndexPage';
import { AccountTypePage } from '../features/auth/AccountTypePage';
import { LoginPage } from '../features/auth/LoginPage';
import { RegisterPage } from '../features/auth/RegisterPage';
import { DashboardPage } from '../features/business/DashboardPage';
import { CampaignWizardPage } from '../features/business/wizard/CampaignWizardPage';
import { LandingPage } from '../features/landing/LandingPage';
import { RequireAccount } from '../mock/session';

/** The mocked product experience. No API, SSE, wallet adapter, or Solana. */
export function productRoutes() {
  return (
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AccountTypePage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/app" element={<Navigate to="/app/deals" replace />} />
      <Route
        path="/app/deals"
        element={
          <RequireAccount account="customer">
            <DealsIndexPage />
          </RequireAccount>
        }
      />
      <Route
        path="/app/deals/:dealId"
        element={
          <RequireAccount account="customer">
            <DealDetailPage />
          </RequireAccount>
        }
      />
      <Route
        path="/business"
        element={
          <RequireAccount account="business">
            <DashboardPage />
          </RequireAccount>
        }
      />
      <Route
        path="/business/campaigns/new"
        element={
          <RequireAccount account="business">
            <CampaignWizardPage />
          </RequireAccount>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  );
}
