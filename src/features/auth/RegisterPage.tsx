import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ProductShell } from '../../components/ProductShell';
import { SectionMarker, TechnicalPanel } from '../../components/schematic';
import { en } from '../../copy/en';
import { defaultRouteFor, useSession } from '../../mock/session';
import { useMockStore } from '../../mock/store';
import { OWN_BUSINESS_ID, type AccountType } from '../../mock/types';

const copy = en.auth;

export function RegisterPage() {
  const [params] = useSearchParams();
  const accountType: AccountType =
    params.get('type') === 'business' ? 'business' : 'customer';
  const isBusiness = accountType === 'business';

  const { signIn } = useSession();
  const { dispatch } = useMockStore();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError(copy.required);
      return;
    }

    if (isBusiness) {
      dispatch({
        type: 'ensure_business',
        id: OWN_BUSINESS_ID,
        name: name.trim(),
      });
    }

    signIn({
      type: accountType,
      name: name.trim(),
      email: email.trim(),
      businessId: isBusiness ? OWN_BUSINESS_ID : undefined,
    });

    navigate(defaultRouteFor(accountType), { replace: true });
  };

  return (
    <ProductShell
      surface={isBusiness ? 'C' : 'B'}
      meta={`AUTH / REGISTER / ${accountType.toUpperCase()}`}
    >
      <div className="auth">
        <SectionMarker
          index={isBusiness ? 'C.01' : 'B.01'}
          title={
            isBusiness ? copy.registerBusinessTitle : copy.registerCustomerTitle
          }
          level={1}
        />
        <p className="auth__lede">{copy.registerLede}</p>

        <TechnicalPanel
          index={isBusiness ? 'C.01a' : 'B.01a'}
          label="Registration"
          frame="medium"
          status={{ state: 'active', label: 'Mock', domain: 'AUTH/' }}
        >
          <form className="form" onSubmit={onSubmit} noValidate>
            <div className="field">
              <label className="field__label" htmlFor="reg-name">
                {isBusiness ? copy.businessNameLabel : copy.nameLabel}
              </label>
              <input
                id="reg-name"
                className="field__input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={
                  isBusiness
                    ? copy.businessNamePlaceholder
                    : copy.namePlaceholder
                }
                autoComplete={isBusiness ? 'organization' : 'name'}
              />
            </div>

            <div className="field">
              <label className="field__label" htmlFor="reg-email">
                {copy.emailLabel}
              </label>
              <input
                id="reg-email"
                className="field__input"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={copy.emailPlaceholder}
                autoComplete="email"
              />
            </div>

            <div className="field">
              <label className="field__label" htmlFor="reg-password">
                {copy.passwordLabel}
              </label>
              <input
                id="reg-password"
                className="field__input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={copy.passwordPlaceholder}
                autoComplete="new-password"
              />
            </div>

            {error ? (
              <p className="note note--alert" role="alert">
                {error}
              </p>
            ) : null}

            <button type="submit" className="btn btn--primary btn--block">
              {copy.submitRegister}
            </button>
            <p className="note">{copy.mockNote}</p>
          </form>
        </TechnicalPanel>

        <p className="note">
          {copy.haveAccount} <Link to="/auth/login">{copy.signIn}</Link> ·{' '}
          <Link to="/">{copy.backToLanding}</Link>
        </p>
      </div>
    </ProductShell>
  );
}
