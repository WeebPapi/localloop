import { Link } from 'react-router-dom';
import { ProductShell } from '../../components/ProductShell';
import { SectionMarker, TechnicalPanel } from '../../components/schematic';
import { en } from '../../copy/en';

const copy = en.auth;

export function AccountTypePage() {
  return (
    <ProductShell surface="A" meta="AUTH / TYPE">
      <div className="auth">
        <SectionMarker index="A.06" title={copy.chooseTitle} level={1} />
        <p className="auth__lede">{copy.chooseLede}</p>

        <div className="choice-grid">
          <Link className="choice" to="/auth/register?type=customer">
            <span className="choice__index">B.00 / CUSTOMER</span>
            <span className="choice__title">{copy.chooseCustomer}</span>
            <span className="choice__body">{copy.chooseCustomerBody}</span>
            <span className="choice__go">Continue →</span>
          </Link>

          <Link className="choice" to="/auth/register?type=business">
            <span className="choice__index">C.00 / BUSINESS</span>
            <span className="choice__title">{copy.chooseBusiness}</span>
            <span className="choice__body">{copy.chooseBusinessBody}</span>
            <span className="choice__go">Continue →</span>
          </Link>
        </div>

        <TechnicalPanel index="A.06a" label="Note" density="high">
          <p className="note">{copy.mockNote}</p>
          <p className="note">
            {copy.haveAccount} <Link to="/auth/login">{copy.signIn}</Link>
          </p>
        </TechnicalPanel>
      </div>
    </ProductShell>
  );
}
