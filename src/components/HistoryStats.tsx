import { formatAmount } from '../services/currencyService';
import type { HistoryEntry } from '../types';

export function HistoryStats({ entries }: { entries: HistoryEntry[] }) {
  const total = entries.length;
  const sum = entries.reduce((acc, e) => acc + (isFinite(e.result) ? e.result : 0), 0);
  const last = entries[0];
  const success = entries.filter((e) => e.status === 'success').length;

  const cards = [
    { label: 'Всего операций', value: String(total) },
    { label: 'Общая сумма', value: last ? formatAmount(sum, last.to, 2) : '—' },
    { label: 'Последняя операция', value: last ? new Date(last.createdAt).toLocaleString('ru-RU') : '—' },
    { label: 'Успешных', value: String(success) },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((c) => (
        <div key={c.label} className="bg-white rounded-xl2 border border-sky shadow-card p-4">
          <div className="text-xs text-muted">{c.label}</div>
          <div className="mt-1 font-semibold text-ink truncate">{c.value}</div>
        </div>
      ))}
    </div>
  );
}