import { Link } from 'react-router-dom';
import { Zap, RefreshCw, MousePointerClick, ShieldCheck } from 'lucide-react';
import { useRates } from '../hooks/useRates';
import { useHistory } from '../hooks/useHistory';
import { CurrencyConverter } from '../components/CurrencyConverter';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { CurrencyCard } from '../components/CurrencyCard';
import { CURRENCY_MAP, POPULAR_CODES } from '../data/currencies';
import type { Settings } from '../types';

export function HomePage({ settings }: { settings: Settings }) {
  const { snapshot, loading, error, reload } = useRates(settings.baseCurrency);
  const { add } = useHistory();

  return (
    <div className="space-y-8">
      <section className="grid lg:grid-cols-[1.2fr_1fr] gap-6 items-start">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy">
            Конвертер валют онлайн
          </h1>
          <p className="mt-2 text-muted max-w-lg">
            Быстрый и удобный обмен валют по актуальным курсам. Данные предоставлены Frankfurter API.
          </p>
          <div className="mt-5">
            {loading && <LoadingState />}
            {error && <ErrorState message={error} onRetry={reload} />}
            {snapshot && (
              <CurrencyConverter
                snapshot={snapshot}
                onConvert={(d) => add({ ...d, createdAt: Date.now(), status: 'success' })}
              />
            )}
          </div>
        </div>

        <div className="hidden lg:block bg-gradient-to-br from-brand to-teal rounded-xl2 p-8 text-white shadow-card">
          <div className="text-5xl mb-3">🌐</div>
          <p className="font-semibold">Около 30 валют</p>
          <p className="text-white/80 text-sm mt-1">Реальные курсы из открытого API без выдуманных значений.</p>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-lg text-navy">Популярные валюты</h2>
          <Link to="/currencies" className="text-sm text-brand hover:underline">Все валюты →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {POPULAR_CODES.map((code) => (
            <CurrencyCard
              key={code}
              currency={CURRENCY_MAP[code]}
              rate={snapshot?.rates[code]}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold text-lg text-navy mb-3">Преимущества</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: Zap, t: 'Быстрый расчёт', d: 'Мгновенный пересчёт по курсу.' },
            { icon: RefreshCw, t: 'Актуальные курсы', d: 'Данные Frankfurter с кэшем.' },
            { icon: MousePointerClick, t: 'Удобный интерфейс', d: 'Понятные формы и селекты.' },
            { icon: ShieldCheck, t: 'Надёжность данных', d: 'Без выдуманных котировок.' },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="bg-white rounded-xl2 border border-sky shadow-card p-4">
              <Icon className="w-5 h-5 text-brand" />
              <p className="mt-2 font-semibold text-ink">{t}</p>
              <p className="text-sm text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex gap-3">
        <Link to="/converter" className="bg-brand text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-brand/90">
          Открыть конвертер
        </Link>
        <Link to="/currencies" className="bg-white border border-sky px-4 py-2.5 rounded-xl font-semibold hover:border-brand/40">
          Все валюты
        </Link>
      </div>
    </div>
  );
}