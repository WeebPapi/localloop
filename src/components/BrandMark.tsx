import magnoliaLogo from '../assets/brands/magnolia.png';
import camoraLogo from '../assets/brands/camora.png';
import type { MockBusiness } from '../mock/types';

const BRAND_LOGOS: Record<string, string> = {
  'magnolia-film-lab': magnoliaLogo,
  camora: camoraLogo,
};

type Size = 'sm' | 'md' | 'lg';

type Props = {
  business: Pick<MockBusiness, 'id' | 'name' | 'logo'>;
  size?: Size;
};

/** Logo for known brands; stylized initial for everyone else. */
export function BrandMark({ business, size = 'md' }: Props) {
  const logo = business.logo ?? BRAND_LOGOS[business.id];
  const className = `brand-mark brand-mark--${size}`;

  if (logo) {
    return (
      <span className={`${className} brand-mark--logo`}>
        <img src={logo} alt="" />
        <span className="visually-hidden">{business.name}</span>
      </span>
    );
  }

  const letter = business.name.trim().charAt(0).toUpperCase() || '?';

  return (
    <span
      className={`${className} brand-mark--letter`}
      aria-label={business.name}
      data-letter={letter}
    >
      <span aria-hidden="true">{letter}</span>
    </span>
  );
}

type PairProps = {
  host: Pick<MockBusiness, 'id' | 'name' | 'logo'>;
  advertiser: Pick<MockBusiness, 'id' | 'name' | 'logo'>;
  size?: Size;
};

/** Host × advertiser partnership plate — the deal card visual. */
export function PartnershipMark({ host, advertiser, size = 'md' }: PairProps) {
  return (
    <div className={`partnership partnership--${size}`} aria-hidden="true">
      <BrandMark business={host} size={size} />
      <span className="partnership__x">×</span>
      <BrandMark business={advertiser} size={size} />
    </div>
  );
}
