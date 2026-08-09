import { seedState } from './data';
import type { MockState } from './types';

const STORAGE_KEY = 'localloop.app.state.v3';

function canUseStorage(): boolean {
  return (
    typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
  );
}

function isMockState(value: unknown): value is MockState {
  if (!value || typeof value !== 'object') return false;
  const state = value as Partial<MockState>;
  return (
    Array.isArray(state.businesses) &&
    Array.isArray(state.campaigns) &&
    Array.isArray(state.deals) &&
    Array.isArray(state.claims) &&
    Array.isArray(state.activity)
  );
}

/**
 * Campaigns, deals, and claims created in this browser. Anything unreadable
 * falls back to the seeded world rather than throwing.
 */
export function loadState(): MockState {
  if (!canUseStorage()) return seedState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedState;
    const parsed: unknown = JSON.parse(raw);
    return isMockState(parsed) ? parsed : seedState;
  } catch {
    return seedState;
  }
}

export function saveState(state: MockState): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* Storage full or blocked — the demo still works in memory. */
  }
}

export function clearState(): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
