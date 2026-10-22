import { useState } from 'react';
import type { HistoryEntry } from '../types';
import {
  addEntry,
  clearHistory,
  loadHistory,
  removeEntry,
} from '../services/historyService';

export function useHistory() {
  const [entries, setEntries] = useState<HistoryEntry[]>(loadHistory);

  return {
    entries,
    add: (e: Omit<HistoryEntry, 'id'>) => {
      const full = addEntry(e);
      setEntries((prev) => [full, ...prev]);
      return full;
    },
    remove: (id: string) => setEntries(removeEntry(id)),
    clear: () => {
      clearHistory();
      setEntries([]);
    },
  };
}