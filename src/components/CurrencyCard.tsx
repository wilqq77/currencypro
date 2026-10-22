import { Link } from 'react-router-dom';
import type { CurrencyMeta } from '../types';
import { formatNumber } from '../services/currencyService';
import { CurrencyFlag } from './CurrencyFlag';

interface Props {
  currency: CurrencyMeta;
  rate?: number;
  changePct?: number | null;
}

export function CurrencyCard({ currency, rate, changePct }: Props) {
  const supported = currency.supported && typeof rate === 'number';
  return (
    <Link
      to={`/currencies?focus=${currency.code}`}
      className="block bg-white rounded-xl2 border border-sky shadow-card p-4 hover:border-brand/40 transition"
    >
      <div className="flex items-center justify-between">
        {currency.category === 'fiat' ? (
          <CurrencyFlag countryCode={currency.countryCode} size={28} />
        ) : (
          <span className="text-xl">{currency.symbol}</span>
        )}
        <span className="text-xs text-muted">{currency.category}</span>
      </div>
      <div className="mt-3 font-semibold text-ink">
        {currency.code}
      </div>
      <div className="text-xs text-muted">{currency.nameRu}</div>
      <div className="mt-3">
        {supported ? (
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-ink">{formatNumber(rate!, 4)}</span>
            {typeof changePct === 'number' && (
              <span className={`text-xs font-medium ${changePct >= 0 ? 'text-up' : 'text-down'}`}>
                {changePct >= 0 ? '+' : ''}{changePct.toFixed(2)}%
              </span>
            )}
          </div>
        ) : (
          <span className="text-xs text-down">Курс недоступен</span>
        )}
      </div>
    </Link>
  );
}