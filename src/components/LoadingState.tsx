import { Loader2 } from 'lucide-react';

export function LoadingState({ text = 'Загрузка…' }: { text?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-10 text-muted">
      <Loader2 className="w-5 h-5 animate-spin" />
      {text}
    </div>
  );
}