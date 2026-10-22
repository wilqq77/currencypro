import type { CurrencyMeta } from '../types';
import { CurrencyCard } from './CurrencyCard';

interface Props {
  currencies: CurrencyMeta[];
  rates: Record<string, number> | undefined;
}

export function CurrencyGrid({ currencies, rates }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {currencies.map((c) => (
        <CurrencyCard key={c.code} currency={c} rate={rates?.[c.code]} changePct={null} />
      ))}
    </div>
  );
}