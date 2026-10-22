export function CurrencySearch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Поиск: название, код или символ"
        className="w-full bg-white border border-sky rounded-xl pl-3 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
      />
    </div>
  );
}