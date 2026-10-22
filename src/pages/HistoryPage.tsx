import { useMemo, useState } from 'react';
import { useHistory } from '../hooks/useHistory';
import { HistoryStats } from '../components/HistoryStats';
import { HistoryFilters } from '../components/HistoryFilters';
import { HistoryTable } from '../components/HistoryTable';
import { TransactionDetailsModal } from '../components/TransactionDetailsModal';
import { EmptyState } from '../components/EmptyState';
import { Pagination } from '../components/Pagination';
import { exportCsv } from '../services/historyService';
import type { HistoryEntry } from '../types';

const PAGE_SIZE = 10;

export function HistoryPage() {
  const { entries, remove, clear } = useHistory();
  const [period, setPeriod] = useState('all');
  const [pair, setPair] = useState('all');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<HistoryEntry | null>(null);

  const filtered = useMemo(() => {
    const now = Date.now();
    const ms: Record<string, number> = { day: 864e5, week: 7 * 864e5, month: 30 * 864e5 };
    return entries
      .filter((e) => period === 'all' || now - e.createdAt <= ms[period])
      .filter((e) => pair === 'all' || e.from === pair || e.to === pair)
      .filter((e) => status === 'all' || e.status === status)
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [entries, period, pair, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const onClearAll = () => {
    if (confirm('Очистить всю историю конвертаций?')) clear();
  };

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-navy">История запросов</h1>
        <p className="text-muted text-sm">Ваши конвертации, сохранённые в этом браузере.</p>
      </header>

      <HistoryStats entries={entries} />

      <div className="flex flex-wrap gap-2 items-center justify-between">
        <HistoryFilters
          period={period} onPeriod={(v) => { setPeriod(v); setPage(1); }}
          pair={pair} onPair={(v) => { setPair(v); setPage(1); }}
          status={status} onStatus={(v) => { setStatus(v); setPage(1); }}
          onReset={() => { setPeriod('all'); setPair('all'); setStatus('all'); setPage(1); }}
        />
        <div className="flex gap-2">
          <button onClick={() => exportCsv(filtered)} className="text-sm px-3 py-2 bg-white border border-sky rounded-xl hover:border-brand/40">
            Экспорт CSV
          </button>
          {entries.length > 0 && (
            <button onClick={onClearAll} className="text-sm px-3 py-2 bg-down/10 text-down rounded-xl">
              Очистить всё
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={entries.length === 0 ? 'История пуста' : 'Ничего не найдено'}
          description={entries.length === 0 ? 'Сделайте первую конвертацию.' : 'Попробуйте изменить фильтры.'}
        />
      ) : (
        <>
          <HistoryTable entries={pageItems} onDetails={setDetail} onRemove={remove} />
          <Pagination page={page} total={totalPages} onPage={setPage} />
        </>
      )}

      <TransactionDetailsModal entry={detail} onClose={() => setDetail(null)} />
    </div>
  );
}