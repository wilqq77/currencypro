interface Props {
  period: string;
  onPeriod: (p: string) => void;
  pair: string;
  onPair: (p: string) => void;
  status: string;
  onStatus: (s: string) => void;
  onReset: () => void;
}

export function HistoryFilters({ period, onPeriod, pair, onPair, status, onStatus, onReset }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select value={period} onChange={(e) => onPeriod(e.target.value)} className="bg-white border border-sky rounded-xl px-3 py-2 text-sm">
        <option value="all">Все время</option>
        <option value="day">За сутки</option>
        <option value="week">За неделю</option>
        <option value="month">За месяц</option>
      </select>
      <select value={pair} onChange={(e) => onPair(e.target.value)} className="bg-white border border-sky rounded-xl px-3 py-2 text-sm">
        <option value="all">Все пары</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="RUB">RUB</option>
      </select>
      <select value={status} onChange={(e) => onStatus(e.target.value)} className="bg-white border border-sky rounded-xl px-3 py-2 text-sm">
        <option value="all">Все статусы</option>
        <option value="success">Успешно</option>
        <option value="pending">В обработке</option>
        <option value="error">Ошибка</option>
      </select>
      <button onClick={onReset} className="text-sm text-brand hover:underline">
        Сбросить фильтры
      </button>
    </div>
  );
}