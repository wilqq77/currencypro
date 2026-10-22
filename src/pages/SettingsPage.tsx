import { CURRENCIES } from '../data/currencies';
import { useHistory } from '../hooks/useHistory';
import { DEFAULT_SETTINGS } from '../services/settingsService';
import type { Settings } from '../types';

interface Props {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
}

export function SettingsPage({ settings, update }: Props) {
  const { clear } = useHistory();

  return (
    <div className="space-y-5 max-w-2xl">
      <h1 className="text-2xl font-bold text-navy">Настройки</h1>

      <div className="bg-white rounded-xl2 border border-sky shadow-card p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Основная валюта</label>
          <select
            value={settings.baseCurrency}
            onChange={(e) => update({ baseCurrency: e.target.value })}
            className="w-full border border-sky rounded-xl px-3 py-2 text-sm"
          >
            {CURRENCIES.filter((c) => c.supported).map((c) => (
              <option key={c.code} value={c.code}>{c.code} — {c.nameRu}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Язык интерфейса</label>
          <select
            value={settings.language}
            onChange={(e) => update({ language: e.target.value as Settings['language'] })}
            className="w-full border border-sky rounded-xl px-3 py-2 text-sm"
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
          <p className="text-xs text-muted mt-1">
            В этой демо-версии язык переключается, но полная локализация не реализована.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Знаков после запятой</label>
          <select
            value={settings.decimals}
            onChange={(e) => update({ decimals: Number(e.target.value) })}
            className="w-full border border-sky rounded-xl px-3 py-2 text-sm"
          >
            {[0, 2, 4, 6].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Тема</label>
          <select
            value={settings.theme}
            onChange={(e) => update({ theme: e.target.value as 'light' | 'dark' })}
            className="w-full border border-sky rounded-xl px-3 py-2 text-sm"
          >
            <option value="light">Светлая</option>
            <option value="dark">Тёмная</option>
          </select>
          <p className="text-xs text-muted mt-1">Тёмная тема затрагивает базовые токены и готовится к расширению.</p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => { if (confirm('Очистить историю конвертаций?')) clear(); }}
            className="px-3 py-2 rounded-xl bg-down/10 text-down text-sm"
          >
            Очистить историю
          </button>
          <button
            onClick={() => update(DEFAULT_SETTINGS)}
            className="px-3 py-2 rounded-xl bg-sky text-brand text-sm"
          >
            Сбросить настройки
          </button>
        </div>
      </div>
    </div>
  );
}