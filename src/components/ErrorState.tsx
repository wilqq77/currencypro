import { AlertTriangle } from 'lucide-react';

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-xl2 border border-down/30 bg-down/5 p-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-down">
        <AlertTriangle className="w-5 h-5" />
        <span className="text-sm">{message}</span>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="text-sm font-semibold text-brand hover:underline">
          Повторить
        </button>
      )}
    </div>
  );
}