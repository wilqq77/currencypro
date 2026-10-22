import type { Settings } from '../types';

const KEY = 'cp_settings_v1';

export const DEFAULT_SETTINGS: Settings = {
  baseCurrency: 'USD',
  language: 'ru',
  decimals: 2,
  theme: 'light',
};

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(s: Settings): void {
  localStorage.setItem(KEY, JSON.stringify(s));
  if (s.theme === 'dark') document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
}