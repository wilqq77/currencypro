import { useEffect, useState } from 'react';
import type { RatesSnapshot } from '../types';
import { getLatestRates } from '../services/currencyApi';

export function useRates(base: string) {
  const [snapshot, setSnapshot] = useState<RatesSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    getLatestRates(base)
      .then((s) => setSnapshot(s))
      .catch(() => setError('Не удалось загрузить курсы. Проверьте соединение.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base]);

  return { snapshot, loading, error, reload: load };
}