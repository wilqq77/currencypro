import type { RatesSnapshot } from '../types';
import { withRetry } from '../utils/retry';

const BASE_URL = 'https://api.frankfurter.dev/v1';
const CACHE_KEY = 'cp_rates_cache_v1';
const CACHE_TTL = 10 * 60 * 1000; // 10 минут

interface CacheRecord {
  [base: string]: RatesSnapshot;
}

function readCache(): CacheRecord {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? '{}') as CacheRecord;
  } catch {
    return {};
  }
}

function writeCache(rec: CacheRecord): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(rec));
  } catch {
    /* quota */
  }
}

async function fetchLatest(base: string): Promise<{ date: string; rates: Record<string, number> }> {
  const res = await fetch(`${BASE_URL}/latest?from=${encodeURIComponent(base)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = (await res.json()) as { date: string; rates: Record<string, number> };
  if (!json.rates) throw new Error('Некорректный ответ API');
  return json;
}

export async function getLatestRates(base: string): Promise<RatesSnapshot> {
  const cache = readCache();
  const cached = cache[base];
  const now = Date.now();

  if (cached && now - cached.fetchedAt < CACHE_TTL) {
    return cached;
  }

  try {
    const data = await withRetry(() => fetchLatest(base));
    const snapshot: RatesSnapshot = {
      base,
      date: data.date,
      rates: { ...data.rates, [base]: 1 },
      fetchedAt: now,
      stale: false,
    };
    cache[base] = snapshot;
    writeCache(cache);
    return snapshot;
  } catch (e) {
    if (cached) {
      return { ...cached, stale: true };
    }
    throw e;
  }
}

export async function getHistoricalChange(
  from: string,
  to: string
): Promise<{ changePct: number; fromRate: number; toRate: number } | null> {
  try {
    const end = new Date();
    const start = new Date(end.getTime() - 7 * 24 * 3600 * 1000);
    const fmt = (d: Date) => d.toISOString().slice(0, 10);
    const url = `${BASE_URL}/${fmt(start)}..${fmt(end)}?from=${from}&to=${to}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = (await res.json()) as { rates: Record<string, Record<string, number>> };
    const dates = Object.keys(json.rates).sort();
    if (dates.length < 2) return null;
    const first = json.rates[dates[0]][to];
    const last = json.rates[dates[dates.length - 1]][to];
    if (!first || !last) return null;
    return { changePct: ((last - first) / first) * 100, fromRate: first, toRate: last };
  } catch {
    return null;
  }
}

export async function getTimeSeries(
  from: string,
  to: string,
  days = 14
): Promise<{ date: string; value: number }[]> {
  try {
    const end = new Date();
    const start = new Date(end.getTime() - days * 24 * 3600 * 1000);
    const fmt = (d: Date) => d.toISOString().slice(0, 10);
    const url = `${BASE_URL}/${fmt(start)}..${fmt(end)}?from=${from}&to=${to}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const json = (await res.json()) as { rates: Record<string, Record<string, number>> };
    return Object.entries(json.rates)
      .map(([date, obj]) => ({ date, value: obj[to] }))
      .filter((x) => typeof x.value === 'number')
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch {
    return [];
  }
}