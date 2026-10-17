import type { CardRow, Metadata } from './models';

export interface CardPreview {
  metadata: Metadata;
  rows: CardRow[];
}

// Page-session snapshots only: never persist profile data in browser storage.
const snapshots = new Map<string, Promise<CardPreview>>();

export function loadCardPreview(path: string): Promise<CardPreview> {
  const existing = snapshots.get(path);
  if (existing !== undefined) return existing;
  const request = fetch(path, { cache: 'no-store' }).then(async response => {
    if (!response.ok) throw new Error('Card unavailable');
    return response.json() as Promise<CardPreview>;
  }).catch(error => {
    if (snapshots.get(path) === request) snapshots.delete(path);
    throw error;
  });
  // Keep the cache bounded when looking up many public users.
  if (snapshots.size >= 10) snapshots.delete(snapshots.keys().next().value);
  snapshots.set(path, request);
  return request;
}
