import { RefreshCw } from 'lucide-react';

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-9 h-9 grid place-items-center rounded-full bg-brand/10 text-brand">
        <RefreshCw className="w-5 h-5" />
        <span className="absolute text-[10px] font-bold text-navy">$</span>
      </div>
      <span className={`font-bold text-lg ${dark ? 'text-white' : 'text-navy'}`}>
        Currency<span className="text-brand">Pro</span>
      </span>
    </div>
  );
}