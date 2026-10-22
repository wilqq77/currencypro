export function Pagination({
  page,
  total,
  onPage,
}: { page: number; total: number; onPage: (p: number) => void }) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === total || Math.abs(p - page) <= 1
  );
  return (
    <div className="flex items-center justify-center gap-1 mt-4">
      {pages.map((p, idx) => (
        <span key={p} className="flex items-center gap-1">
          {idx > 0 && p - pages[idx - 1] > 1 && <span className="text-muted px-1">…</span>}
          <button
            onClick={() => onPage(p)}
            className={`w-9 h-9 rounded-lg text-sm ${
              p === page ? 'bg-brand text-white' : 'bg-white border border-sky text-ink'
            }`}
          >
            {p}
          </button>
        </span>
      ))}
    </div>
  );
}