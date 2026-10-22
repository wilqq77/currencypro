import { useRates } from '../hooks/useRates';
import { useHistory } from '../hooks/useHistory';
import { CurrencyConverter } from '../components/CurrencyConverter';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { formatAmount } from '../services/currencyService';
import type { Settings } from '../types';

export function ConverterPage({ settings }: { settings: Settings }) {
  const { snapshot, loading, error, reload } = useRates(settings.baseCurrency);
  const { entries, add } = useHistory();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy">Конвертер валют</h1>
      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={reload} />}
      {snapshot && (
        <CurrencyConverter
          snapshot={snapshot}
          onConvert={(d) => add({ ...d, createdAt: Date.now(), status: 'success' })}
        />
      )}

      <section>
        <h2 className="font-semibold text-lg text-navy mb-2">Последние конвертации</h2>
        {entries.length === 0 ? (
          <EmptyState title="Пока нет конвертаций" description="Сделайте первую конвертацию на этой странице." />
        ) : (
          <ul className="space-y-2">
            {entries.slice(0, 5).map((e) => (
              <li key={e.id} className="bg-white border border-sky rounded-xl2 p-3 text-sm flex justify-between">
                <span>{e.from} → {e.to}</span>
                <span>{formatAmount(e.amount, e.from, 2)} → {formatAmount(e.result, e.to, 2)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}