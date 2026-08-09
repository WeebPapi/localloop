import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { AccountType } from './types';
import { OWN_BUSINESS_ID } from './types';

export type MockSession = {
  type: AccountType;
  /** Person's name for a customer, trading name for a business. */
  name: string;
  email: string;
  /** Present for business accounts only. */
  businessId?: string;
};

const STORAGE_KEY = 'localloop.app.session.v1';

type SessionContextValue = {
  session: MockSession | null;
  signIn: (session: MockSession) => void;
  signOut: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

function readSession(): MockSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    const value = parsed as Partial<MockSession>;
    if (value.type !== 'customer' && value.type !== 'business') return null;
    if (typeof value.name !== 'string' || typeof value.email !== 'string') {
      return null;
    }
    return {
      type: value.type,
      name: value.name,
      email: value.email,
      businessId:
        value.type === 'business'
          ? (value.businessId ?? OWN_BUSINESS_ID)
          : undefined,
    };
  } catch {
    return null;
  }
}

export function MockSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<MockSession | null>(readSession);

  const signIn = useCallback((next: MockSession) => {
    setSession(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* Session stays in memory when storage is unavailable. */
    }
  }, []);

  const signOut = useCallback(() => {
    setSession(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ session, signIn, signOut }),
    [session, signIn, signOut],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error('useSession must be used within MockSessionProvider');
  }
  return ctx;
}

/** Where an account lands after signing in. */
export function defaultRouteFor(type: AccountType): string {
  return type === 'business' ? '/business' : '/app/deals';
}

type GuardProps = {
  account: AccountType;
  children: ReactNode;
};

/** Sends signed-out visitors to sign-in and wrong-type accounts to their view. */
export function RequireAccount({ account, children }: GuardProps) {
  const { session } = useSession();
  const location = useLocation();

  if (!session) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  if (session.type !== account) {
    return <Navigate to={defaultRouteFor(session.type)} replace />;
  }

  return <>{children}</>;
}
