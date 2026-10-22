export type CurrencyCategory = 'fiat' | 'crypto' | 'metal';

export interface CurrencyMeta {
  code: string;
  nameRu: string;
  nameEn: string;
  symbol: string;
  category: CurrencyCategory;
  countryCode?: string; // ISO2 для флага
  supported: boolean;   // поддерживается Frankfurter
  popularity: number;   // для сортировки
}

export interface RatesSnapshot {
  base: string;
  date: string;              // YYYY-MM-DD
  rates: Record<string, number>;
  fetchedAt: number;         // ms
  stale: boolean;
}

export interface RateChange {
  pair: string;      // "USD/EUR"
  changePct: number; // % за 7 дней
  from: number;
  to: number;
}

export type HistoryStatus = 'success' | 'pending' | 'error';

export interface HistoryEntry {
  id: string;
  createdAt: number;
  from: string;
  to: string;
  amount: number;
  rate: number;
  result: number;
  status: HistoryStatus;
  note?: string;
}

export interface Settings {
  baseCurrency: string;
  language: 'ru' | 'en';
  decimals: number;
  theme: 'light' | 'dark';
}