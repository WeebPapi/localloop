import camoraLogo from '../assets/brands/camora.png';
import magnoliaLogo from '../assets/brands/magnolia.png';
import bookNookImage from '../assets/offers/offer-booknook.png';
import camoraImage from '../assets/offers/offer-camora.png';
import citrusImage from '../assets/offers/offer-citrus.png';
import doughLabImage from '../assets/offers/offer-doughlab.png';
import fabrikaImage from '../assets/offers/offer-fabrika.png';
import magnoliaImage from '../assets/offers/offer-magnolia.png';
import pulseGymImage from '../assets/offers/offer-pulsegym.png';
import type { MockState } from './types';
import { OWN_BUSINESS_ID } from './types';

const SEED_DATE = '2026-07-14T09:00:00.000Z';

function mapsLink(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export const seedState: MockState = {
  businesses: [
    {
      id: 'magnolia-film-lab',
      name: 'Magnolia Film Lab',
      category: 'Film lab and analogue retail',
      address: '8 Egnate Ninoshvili Street, Tbilisi',
      sector: 'SECTOR C / 08-NINOSHVILI',
      image: magnoliaImage,
      logo: magnoliaLogo,
      links: {
        website: 'https://magnoliafilmlab.ge',
        instagram: 'https://instagram.com/magnoliafilmlab',
        maps: mapsLink('8 Egnate Ninoshvili Street, Tbilisi'),
      },
    },
    {
      id: 'camora',
      name: 'Camora',
      category: 'Barbershop by day, bar by night',
      address: '8 Egnate Ninoshvili Street, Tbilisi',
      sector: 'SECTOR C / 08-NINOSHVILI',
      image: camoraImage,
      logo: camoraLogo,
      links: {
        website: 'https://camora.ge',
        instagram: 'https://instagram.com/camora.tbilisi',
        maps: mapsLink('8 Egnate Ninoshvili Street, Tbilisi'),
      },
    },
    {
      id: 'citrus-coffee',
      name: 'Citrus Coffee',
      category: 'Specialty coffee bar',
      address: '14 Aghmashenebeli Avenue, Tbilisi',
      sector: 'SECTOR A / 14-AGHMASHENEBELI',
      image: citrusImage,
      links: {
        website: 'https://citruscoffee.ge',
        instagram: 'https://instagram.com/citrus.coffee',
        maps: mapsLink('14 Aghmashenebeli Avenue, Tbilisi'),
      },
    },
    {
      id: 'dough-lab',
      name: 'Dough Lab',
      category: 'Sourdough bakery',
      address: '3 Ninoshvili Street, Tbilisi',
      sector: 'SECTOR C / 03-NINOSHVILI',
      image: doughLabImage,
      links: {
        website: 'https://doughlab.ge',
        instagram: 'https://instagram.com/doughlab.tbilisi',
        maps: mapsLink('3 Ninoshvili Street, Tbilisi'),
      },
    },
    {
      id: 'book-nook',
      name: 'Book Nook',
      category: 'Independent bookshop',
      address: '21 Marjanishvili Street, Tbilisi',
      sector: 'SECTOR B / 21-MARJANISHVILI',
      image: bookNookImage,
      links: {
        website: 'https://booknook.ge',
        instagram: 'https://instagram.com/booknook.tbilisi',
        maps: mapsLink('21 Marjanishvili Street, Tbilisi'),
      },
    },
    {
      id: 'pulse-gym',
      name: 'Pulse Gym',
      category: 'Neighbourhood gym',
      address: '5 Tsinamdzghvrishvili Street, Tbilisi',
      sector: 'SECTOR B / 05-TSINAMDZGHVRISHVILI',
      image: pulseGymImage,
      links: {
        website: 'https://pulsegym.ge',
        instagram: 'https://instagram.com/pulsegym.tbilisi',
        maps: mapsLink('5 Tsinamdzghvrishvili Street, Tbilisi'),
      },
    },
    {
      id: 'fabrika',
      name: 'Fabrika',
      category: 'Cultural venue and courtyard',
      address: '8 Egnate Ninoshvili Street, Tbilisi',
      sector: 'SECTOR C / 08-NINOSHVILI',
      image: fabrikaImage,
      links: {
        website: 'https://fabrikatbilisi.com',
        instagram: 'https://instagram.com/fabrikatbilisi',
        maps: mapsLink('8 Egnate Ninoshvili Street, Tbilisi'),
      },
    },
  ],
  campaigns: [
    {
      id: 'magnolia-develop-the-night',
      name: 'Develop the Night',
      advertiserBusinessId: 'magnolia-film-lab',
      status: 'live',
      perk: '10 ₾ off film development and scanning',
      conditions: 'Applies to orders over 40 ₾. One reward per customer.',
      budgetSol: 0.05,
      image: magnoliaImage,
      createdAt: SEED_DATE,
    },
    {
      id: 'citrus-morning-loop',
      name: 'Morning Loop',
      advertiserBusinessId: 'citrus-coffee',
      status: 'live',
      perk: 'Free filter coffee with any pastry',
      conditions:
        'Complete the tasting once. Weekdays before 11:00. One reward per customer.',
      budgetSol: 0.04,
      image: citrusImage,
      createdAt: SEED_DATE,
    },
    {
      id: 'doughlab-late-rise',
      name: 'Late Rise',
      advertiserBusinessId: 'dough-lab',
      status: 'live',
      perk: 'Free cinnamon bun with any sourdough loaf',
      conditions: 'After 17:00 while stock lasts.',
      budgetSol: 0.03,
      image: doughLabImage,
      createdAt: SEED_DATE,
    },
    {
      id: 'fabrika-night-pass',
      name: 'Night Pass',
      advertiserBusinessId: 'fabrika',
      status: 'live',
      perk: '20% off courtyard event tickets',
      conditions: 'Valid for one event booking.',
      budgetSol: 0.06,
      image: fabrikaImage,
      createdAt: SEED_DATE,
    },
  ],
  deals: [
    {
      id: 'camora-deal',
      campaignId: 'magnolia-develop-the-night',
      hostBusinessId: 'camora',
      status: 'active',
      requiredVisits: 3,
      criterion: '3 visits at Camora',
      criterionKind: 'visits',
      headline: 'Visit Camora 3× · Get 10 ₾ off developing',
      payoutSol: 0.005,
      maxRedemptions: 10,
      redemptionsPaid: 2,
    },
    {
      id: 'citrus-pulse-deal',
      campaignId: 'citrus-morning-loop',
      hostBusinessId: 'pulse-gym',
      status: 'active',
      requiredVisits: 1,
      criterion: 'Try the limited-edition yuzu cold brew',
      criterionKind: 'action',
      headline: 'Try Yuzu Cold Brew · Get free filter coffee',
      payoutSol: 0.004,
      maxRedemptions: 12,
      redemptionsPaid: 5,
    },
    {
      id: 'doughlab-booknook-deal',
      campaignId: 'doughlab-late-rise',
      hostBusinessId: 'book-nook',
      status: 'active',
      requiredVisits: 2,
      criterion: '2 visits at Book Nook',
      criterionKind: 'visits',
      headline: 'Visit Book Nook twice · Get a free cinnamon bun',
      payoutSol: 0.003,
      maxRedemptions: 15,
      redemptionsPaid: 1,
    },
    {
      id: 'fabrika-camora-deal',
      campaignId: 'fabrika-night-pass',
      hostBusinessId: 'camora',
      status: 'active',
      requiredVisits: 4,
      criterion: '4 visits at Camora',
      criterionKind: 'visits',
      headline: 'Visit Camora 4× · Get 20% off courtyard tickets',
      payoutSol: 0.006,
      maxRedemptions: 8,
      redemptionsPaid: 0,
    },
    /* Partnership requests waiting for the signed-in business to answer. */
    {
      id: 'magnolia-yours-deal',
      campaignId: 'magnolia-develop-the-night',
      hostBusinessId: OWN_BUSINESS_ID,
      status: 'proposed',
      requiredVisits: 3,
      criterion: '3 verified visits',
      criterionKind: 'visits',
      headline: 'Visit your shop 3× · Get 10 ₾ off developing',
      payoutSol: 0.005,
      maxRedemptions: 10,
      redemptionsPaid: 0,
    },
    {
      id: 'doughlab-yours-deal',
      campaignId: 'doughlab-late-rise',
      hostBusinessId: OWN_BUSINESS_ID,
      status: 'proposed',
      requiredVisits: 2,
      criterion: '2 verified visits',
      criterionKind: 'visits',
      headline: 'Visit your shop twice · Get a free cinnamon bun',
      payoutSol: 0.003,
      maxRedemptions: 15,
      redemptionsPaid: 0,
    },
  ],
  claims: [
    {
      id: 'LL-NINO-001',
      dealId: 'camora-deal',
      campaignId: 'magnolia-develop-the-night',
      status: 'locked',
      verifiedVisits: 1,
      updatedAt: SEED_DATE,
    },
  ],
  activity: [
    {
      id: 'seed-1',
      at: SEED_DATE,
      label: 'Camora verified your first visit for Develop the Night — 1/3',
    },
  ],
};

/** Businesses that can be proposed as hosts in the campaign wizard. */
export const partnerCandidateIds = [
  'camora',
  'pulse-gym',
  'book-nook',
  'fabrika',
  'dough-lab',
  'citrus-coffee',
  'magnolia-film-lab',
];
