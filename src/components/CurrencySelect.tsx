import { useId } from 'react';
import { CURRENCIES, FLAG } from '../data/currencies';

interface Props {
  value: string;
  onChange: (code: string) => void;
  label: string;
  disabledCodes?: string[];
}

export function CurrencySelect({ value, onChange, label, disabledCodes = [] }: Props) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-muted mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-sky rounded-xl px-3 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        >
          {CURRENCIES.map((c) => (
            <option key={c.code} value={c.code} disabled={disabledCodes.includes(c.code)}>
              {FLAG(c.countryCode)} {c.code} — {c.nameRu}
            </option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted">▾</span>
      </div>
    </div>
  );
}