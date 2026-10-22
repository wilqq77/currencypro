export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="text-center py-10">
      <p className="font-semibold text-ink">{title}</p>
      {description && <p className="text-sm text-muted mt-1">{description}</p>}
    </div>
  );
}