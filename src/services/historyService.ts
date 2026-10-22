import type { HistoryEntry } from '../types';

const KEY = 'cp_history_v1';

export function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HistoryEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHistory(entries: HistoryEntry[]): void {
  localStorage.setItem(KEY, JSON.stringify(entries.slice(0, 500)));
}

export function addEntry(entry: Omit<HistoryEntry, 'id'>): HistoryEntry {
  const full: HistoryEntry = { ...entry, id: crypto.randomUUID() };
  const all = loadHistory();
  saveHistory([full, ...all]);
  return full;
}

export function removeEntry(id: string): HistoryEntry[] {
  const next = loadHistory().filter((e) => e.id !== id);
  saveHistory(next);
  return next;
}

export function clearHistory(): void {
  localStorage.removeItem(KEY);
}

export function exportCsv(entries: HistoryEntry[]): void {
  const header = ['Дата', 'Из', 'В', 'Сумма', 'Курс', 'Результат', 'Статус'];
  const rows = entries.map((e) => [
    new Date(e.createdAt).toISOString(),
    e.from,
    e.to,
    String(e.amount),
    String(e.rate),
    String(e.result),
    e.status,
  ]);
  const csv = [header, ...rows]
    .map((r) => r.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
    .join('\n');
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `currencypro-history-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}