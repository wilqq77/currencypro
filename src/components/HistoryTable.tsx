import { Trash2 } from 'lucide-react';
import { formatAmount } from '../services/currencyService';
import type { HistoryEntry } from '../types';

interface Props {
  entries: HistoryEntry[];
  onDetails: (e: HistoryEntry) => void;
  onRemove: (id: string) => void;
}

const STATUS_LABEL: Record<HistoryEntry['status'], { text: string; cls: string }> = {
  success: { text: 'Успешно', cls: 'bg-up/10 text-up' },
  pending: { text: 'В обработке', cls: 'bg-yellow-100 text-yellow-700' },
  error: { text: 'Ошибка', cls: 'bg-down/10 text-down' },
};

export function HistoryTable({ entries, onDetails, onRemove }: Props) {
  if (!entries.length) return null;
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block bg-white border border-sky rounded-xl2 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-sky/60 text-muted text-left">
            <tr>
              <th className="px-4 py-3">Дата</th>
              <th className="px-4 py-3">Пара</th>
              <th className="px-4 py-3">Сумма</th>
              <th className="px-4 py-3">Курс</th>
              <th className="px-4 py-3">Итог</th>
              <th className="px-4 py-3">Статус</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-t border-sky/60">
                <td className="px-4 py-3 whitespace-nowrap">{new Date(e.createdAt).toLocaleString('ru-RU')}</td>
                <td className="px-4 py-3">{e.from} → {e.to}</td>
                <td className="px-4 py-3">{formatAmount(e.amount, e.from, 2)}</td>
                <td className="px-4 py-3">{e.rate.toFixed(4)}</td>
                <td className="px-4 py-3">{formatAmount(e.result, e.to, 2)}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-md text-xs ${STATUS_LABEL[e.status].cls}`}>
                    {STATUS_LABEL[e.status].text}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => onDetails(e)} className="text-brand text-xs hover:underline mr-3">Подробнее</button>
                  <button onClick={() => onRemove(e.id)} aria-label="Удалить" className="text-down hover:opacity-70">
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile */}
      <div className="md:hidden space-y-2">
        {entries.map((e) => (
          <div key={e.id} className="bg-white border border-sky rounded-xl2 p-3 text-sm">
            <div className="flex justify-between">
              <span className="font-semibold">{e.from} → {e.to}</span>
              <span className={`px-2 py-0.5 rounded text-xs ${STATUS_LABEL[e.status].cls}`}>{STATUS_LABEL[e.status].text}</span>
            </div>
            <div className="text-xs text-muted mt-1">{new Date(e.createdAt).toLocaleString('ru-RU')}</div>
            <div className="mt-2">{formatAmount(e.amount, e.from, 2)} → {formatAmount(e.result, e.to, 2)}</div>
            <div className="mt-2 flex justify-between">
              <button onClick={() => onDetails(e)} className="text-brand text-xs">Подробнее</button>
              <button onClick={() => onRemove(e.id)} className="text-down text-xs">Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}