import { X } from 'lucide-react';
import { formatAmount } from '../services/currencyService';
import type { HistoryEntry } from '../types';

export function TransactionDetailsModal({ entry, onClose }: { entry: HistoryEntry | null; onClose: () => void }) {
  if (!entry) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 grid place-items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl2 p-5 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-ink">Детали операции</h3>
          <button onClick={onClose} aria-label="Закрыть"><X className="w-5 h-5" /></button>
        </div>
        <dl className="text-sm space-y-2">
          <div className="flex justify-between"><dt className="text-muted">Дата</dt><dd>{new Date(entry.createdAt).toLocaleString('ru-RU')}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Пара</dt><dd>{entry.from} → {entry.to}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Исходная сумма</dt><dd>{formatAmount(entry.amount, entry.from, 2)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Курс</dt><dd>{entry.rate.toFixed(6)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Результат</dt><dd>{formatAmount(entry.result, entry.to, 2)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Статус</dt><dd>{entry.status}</dd></div>
          {entry.note && <div className="flex justify-between"><dt className="text-muted">Примечание</dt><dd>{entry.note}</dd></div>}
        </dl>
      </div>
    </div>
  );
}