import { useMemo, useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { CurrencySelect } from './CurrencySelect';
import { CURRENCY_MAP } from '../data/currencies';
import { crossRate, formatAmount } from '../services/currencyService';
import type { RatesSnapshot } from '../types';

interface Props {
  snapshot: RatesSnapshot | null;
  onConvert?: (data: {
    from: string;
    to: string;
    amount: number;
    rate: number;
    result: number;
  }) => void;
}

export function CurrencyConverter({ snapshot, onConvert }: Props) {
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');

  const numeric = useMemo(() => {
    const n = parseFloat(amount.replace(',', '.'));
    return isFinite(n) && n >= 0 ? n : NaN;
  }, [amount]);

  const rate = useMemo(() => {
    if (!snapshot) return NaN;
    const a = CURRENCY_MAP[from];
    const b = CURRENCY_MAP[to];
    if (!a?.supported || !b?.supported) return NaN;
    return crossRate(from, to, snapshot.rates);
  }, [snapshot, from, to]);

  const result = useMemo(() => {
    if (isNaN(numeric) || isNaN(rate)) return NaN;
    return numeric * rate;
  }, [numeric, rate]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleConvert = () => {
    if (isNaN(numeric) || isNaN(rate)) return;
    onConvert?.({ from, to, amount: numeric, rate, result });
  };

  return (
    <div className="bg-white rounded-xl2 border border-sky shadow-card p-5">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] items-end">
        <div>
          <label htmlFor="amount" className="block text-xs font-medium text-muted mb-1">
            Сумма
          </label>
          <input
            id="amount"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-sky rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
            placeholder="Введите сумму"
          />
          <div className="mt-2">
            <CurrencySelect label="Из валюты" value={from} onChange={setFrom} />
          </div>
        </div>

        <button
          onClick={swap}
          className="justify-self-center bg-sky hover:bg-brand hover:text-white transition rounded-full p-3"
          aria-label="Поменять валюты местами"
          type="button"
        >
          <ArrowRightLeft className="w-5 h-5" />
        </button>

        <div>
          <label className="block text-xs font-medium text-muted mb-1">Результат</label>
          <div className="border border-sky bg-sky/40 rounded-xl px-3 py-2.5 text-sm min-h-[42px]">
            {isNaN(result) ? '—' : formatAmount(result, to, 2)}
          </div>
          <div className="mt-2">
            <CurrencySelect label="В валюту" value={to} onChange={setTo} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-muted">
          Курс: 1 {from} = {isNaN(rate) ? '—' : rate.toFixed(4)} {to}
        </span>
        {snapshot && (
          <span className={snapshot.stale ? 'text-down' : 'text-muted'}>
            Обновлено: {new Date(snapshot.fetchedAt).toLocaleTimeString('ru-RU')}
            {snapshot.stale && ' (данные могут быть устаревшими)'}
          </span>
        )}
      </div>

      <button
        onClick={handleConvert}
        disabled={isNaN(numeric) || isNaN(rate)}
        className="mt-4 w-full bg-brand text-white rounded-xl py-2.5 font-semibold hover:bg-brand/90 disabled:opacity-50 transition"
      >
        Конвертировать
      </button>
    </div>
  );
}