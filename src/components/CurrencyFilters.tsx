import type { CurrencyCategory } from '../types';

export type CategoryFilter = 'all' | CurrencyCategory;
export type SortKey = 'name' | 'code' | 'rate' | 'popularity';

interface Props {
  category: CategoryFilter;
  onCategory: (c: CategoryFilter) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
  onReset: () => void;
}

const CATS: { key: CategoryFilter; label: string }[] = [
  { key: 'all', label: 'Все валюты' },
  { key: 'fiat', label: 'Фиатные' },
  { key: 'crypto', label: 'Криптовалюты' },
  { key: 'metal', label: 'Металлы' },
];

export function CurrencyFilters({ category, onCategory, sort, onSort, onReset }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex flex-wrap gap-1 bg-white border border-sky rounded-xl p-1">
        {CATS.map((c) => (
          <button
            key={c.key}
            onClick={() => onCategory(c.key)}
            className={`px-3 py-1.5 rounded-lg text-xs transition ${
              category === c.key ? 'bg-sky text-brand font-semibold' : 'text-ink hover:bg-sky/60'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <select
        value={sort}
        onChange={(e) => onSort(e.target.value as SortKey)}
        className="bg-white border border-sky rounded-xl px-3 py-2 text-sm"
      >
        <option value="popularity">По популярности</option>
        <option value="name">По названию</option>
        <option value="code">По коду</option>
        <option value="rate">По курсу</option>
      </select>
      <button onClick={onReset} className="text-sm text-brand hover:underline">
        Сбросить
      </button>
    </div>
  );
}