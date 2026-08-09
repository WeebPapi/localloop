import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductShell } from '../../components/ProductShell';
import { SectionMarker, TechnicalPanel } from '../../components/schematic';
import { en } from '../../copy/en';
import { defaultRouteFor, useSession } from '../../mock/session';
import { useMockStore } from '../../mock/store';
import { OWN_BUSINESS_ID, type AccountType } from '../../mock/types';

const copy = en.auth;

export function LoginPage() {
  const { signIn } = useSession();
  const { dispatch } = useMockStore();
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState<AccountType>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isBusiness = accountType === 'business';

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
    <ProductShell surface="A" meta="AUTH / SIGN IN">
      <div className="auth">
        <SectionMarker index="A.07" title={copy.loginTitle} level={1} />
        <p className="auth__lede">{copy.loginLede}</p>

        <TechnicalPanel
          index="A.07a"
          label="Sign in"
          frame="medium"
          status={{ state: 'active', label: 'Mock', domain: 'AUTH/' }}
        >
          <form className="form" onSubmit={onSubmit} noValidate>
            <div className="field">
              <label className="field__label" htmlFor="login-type">
                {copy.accountTypeLabel}
              </label>
              <select
                id="login-type"
                className="field__select"
                value={accountType}
                onChange={(event) =>
                  setAccountType(event.target.value as AccountType)
                }
              >
                <option value="customer">{copy.chooseCustomer}</option>
                <option value="business">{copy.chooseBusiness}</option>
              </select>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="login-name">
                {isBusiness ? copy.businessNameLabel : copy.nameLabel}
              </label>
              <input
                id="login-name"
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
              <label className="field__label" htmlFor="login-email">
                {copy.emailLabel}
              </label>
              <input
                id="login-email"
                className="field__input"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={copy.emailPlaceholder}
                autoComplete="email"
              />
            </div>

            <div className="field">
              <label className="field__label" htmlFor="login-password">
                {copy.passwordLabel}
              </label>
              <input
                id="login-password"
                className="field__input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={copy.passwordPlaceholder}
                autoComplete="current-password"
              />
            </div>

            {error ? (
              <p className="note note--alert" role="alert">
                {error}
              </p>
            ) : null}

            <button type="submit" className="btn btn--primary btn--block">
              {copy.submitLogin}
            </button>
            <p className="note">{copy.mockNote}</p>
          </form>
        </TechnicalPanel>

        <p className="note">
          {copy.noAccount} <Link to="/auth">{copy.register}</Link> ·{' '}
          <Link to="/">{copy.backToLanding}</Link>
        </p>
      </div>
    </ProductShell>
  );
}
