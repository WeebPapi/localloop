import { Link, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { en } from '../copy/en';
import { defaultRouteFor, useSession } from '../mock/session';
import { RegistrationMark } from './schematic';

type Props = {
  children: ReactNode;
  /** Surface letter from the numbering grammar, e.g. `B`. */
  surface?: string;
  /** Short metadata shown beside the surface letter. */
  meta?: string;
};

const BUILD = '2026.08';

export function ProductShell({ children, surface, meta }: Props) {
  const { session, signOut } = useSession();
  const navigate = useNavigate();

  const onSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="shell">
      <a className="shell__skip" href="#main">
        {en.shell.skipToContent}
      </a>

      <header className="shell__header">
        <div className="shell__bar">
          <Link className="shell__brand" to="/">
            <RegistrationMark size={16} />
            <span className="shell__brand-name">{en.brand}</span>
          </Link>

          <p className="shell__meta">
            {surface ? <span className="shell__surface">{surface}</span> : null}
            {meta ? <span>{meta}</span> : null}
          </p>

          <nav className="shell__nav" aria-label="Account">
            {session ? (
              <>
                <Link
                  className="shell__nav-link"
                  to={defaultRouteFor(session.type)}
                >
                  {session.type === 'business'
                    ? en.shell.businessNav
                    : en.shell.customerNav}
                </Link>
                <span className="shell__who">
                  <span className="shell__who-label">
                    {en.shell.signedInAs}
                  </span>
                  <span className="shell__who-name">{session.name}</span>
                </span>
                <button
                  type="button"
                  className="btn btn--ghost btn--small"
                  onClick={onSignOut}
                >
                  {en.shell.signOut}
                </button>
              </>
            ) : (
              <>
                <Link className="shell__nav-link" to="/auth/login">
                  {en.shell.signIn}
                </Link>
                <Link className="btn btn--primary btn--small" to="/auth">
                  {en.shell.getStarted}
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="shell__main" id="main">
        {children}
      </main>

      <footer className="shell__footer">
        <div className="shell__footer-inner">
          <dl className="shell__plate">
            <div>
              <dt>{en.shell.footerBuild}</dt>
              <dd>{BUILD}</dd>
            </div>
            <div>
              <dt>{en.shell.footerLang}</dt>
              <dd>EN</dd>
            </div>
            <div>
              <dt>{en.shell.footerLayer}</dt>
              <dd>{en.shell.footerLayerProduct}</dd>
            </div>
          </dl>
          <p className="shell__footer-note">{en.shell.mockNote}</p>
          <Link className="shell__footer-link" to="/live">
            {en.shell.footerLive}
          </Link>
        </div>
      </footer>
    </div>
  );
}
