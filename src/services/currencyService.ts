export function convert(amount: number, rate: number): number {
  return amount * rate;
}

export function crossRate(from: string, to: string, rates: Record<string, number>): number {
  if (from === to) return 1;
  const rFrom = rates[from];
  const rTo = rates[to];
  if (!rFrom || !rTo) return NaN;
  return rTo / rFrom;
}

export function formatAmount(value: number, code: string, decimals = 2): string {
  if (!isFinite(value)) return '—';
  try {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      style: 'currency',
      currency: code,
    }).format(value);
  } catch {
    return value.toFixed(decimals);
  }
}

export function formatNumber(value: number, decimals = 2): string {
  if (!isFinite(value)) return '—';
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}