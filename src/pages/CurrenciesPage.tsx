import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CURRENCIES, CURRENCY_MAP } from '../data/currencies';
import { useRates } from '../hooks/useRates';
import { CurrencyGrid } from '../components/CurrencyGrid';
import { CurrencySearch } from '../components/CurrencySearch';
import { CurrencyFilters, CategoryFilter, SortKey } from '../components/CurrencyFilters';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { Pagination } from '../components/Pagination';
import { RateChart } from '../components/RateChart';
import { getTimeSeries } from '../services/currencyApi';
import type { Settings } from '../types';

const PAGE_SIZE = 12;

export function CurrenciesPage({ settings }: { settings: Settings }) {
  const [params] = useSearchParams();
  const focus = params.get('focus');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [sort, setSort] = useState<SortKey>('popularity');
  const [page, setPage] = useState(1);
  const { snapshot, loading, error, reload } = useRates(settings.baseCurrency);
  const [series, setSeries] = useState<{ date: string; value: number }[]>([]);
  const [seriesLoading, setSeriesLoading] = useState(false);

  useEffect(() => {
    if (!focus) { setSeries([]); return; }
    const target = CURRENCY_MAP[focus];
    if (!target?.supported || !snapshot) { setSeries([]); return; }
    setSeriesLoading(true);
    getTimeSeries(snapshot.base, focus, 14)
      .then(setSeries)
      .finally(() => setSeriesLoading(false));
  }, [focus, snapshot]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = CURRENCIES.filter((c) => (category === 'all' ? true : c.category === category));
    if (q) {
      arr = arr.filter(
        (c) =>
          c.code.toLowerCase().includes(q) ||
          c.nameRu.toLowerCase().includes(q) ||
          c.nameEn.toLowerCase().includes(q) ||
          c.symbol.toLowerCase().includes(q)
      );
    }
    arr = [...arr].sort((a, b) => {
      if (sort === 'name') return a.nameRu.localeCompare(b.nameRu, 'ru');
      if (sort === 'code') return a.code.localeCompare(b.code);
      if (sort === 'popularity') return b.popularity - a.popularity;
      const ra = snapshot?.rates[a.code] ?? Infinity;
      const rb = snapshot?.rates[b.code] ?? Infinity;
      return ra - rb;
    });
    return arr;
  }, [query, category, sort, snapshot]);

  useEffect(() => { setPage(1); }, [query, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const focusMeta = focus ? CURRENCY_MAP[focus] : null;

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-navy">Все валюты</h1>
        <p className="text-muted text-sm">Справочник поддерживаемых валют и доступные курсы.</p>
      </header>

      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <CurrencySearch value={query} onChange={setQuery} />
        <CurrencyFilters
          category={category} onCategory={setCategory}
          sort={sort} onSort={setSort}
          onReset={() => { setQuery(''); setCategory('all'); setSort('popularity'); }}
        />
      </div>

      {focusMeta && (
        <div className="bg-white rounded-xl2 border border-sky shadow-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-ink">{focusMeta.code} — {focusMeta.nameRu}</p>
              <p className="text-xs text-muted">
                {focusMeta.supported ? 'Курс доступен' : 'Источник не поддерживает эту валюту'}
              </p>
            </div>
            <div className="text-right">
              {focusMeta.supported && snapshot?.rates[focusMeta.code] !== undefined ? (
                <span className="font-semibold">{snapshot.rates[focusMeta.code].toFixed(4)}</span>
              ) : (
                <span className="text-down text-sm">Нет данных</span>
              )}
            </div>
          </div>
          {focusMeta.supported && (
            <div className="mt-3">
              {seriesLoading ? <p className="text-xs text-muted">Загрузка истории…</p> : <RateChart data={series} />}
            </div>
          )}
        </div>
      )}

      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={reload} />}

      {!loading && !error && (
        filtered.length === 0 ? (
          <EmptyState title="Ничего не найдено" description="Измените поиск или категорию." />
        ) : (
          <>
            <CurrencyGrid currencies={pageItems} rates={snapshot?.rates} />
            <Pagination page={page} total={totalPages} onPage={setPage} />
          </>
        )
      )}
    </div>
  );
}