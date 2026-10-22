import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { Logo } from './Logo';

const ITEMS = [
  { to: '/', label: 'Главная' },
  { to: '/currencies', label: 'Все валюты' },
  { to: '/converter', label: 'Конвертер' },
  { to: '/history', label: 'История' },
  { to: '/about', label: 'О проекте' },
  { to: '/settings', label: 'Настройки' },
];

export function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-0 top-0 h-full w-72 bg-white p-4">
        <div className="flex items-center justify-between mb-6">
          <Logo />
          <button onClick={onClose} aria-label="Закрыть" className="p-2">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="space-y-1">
          {ITEMS.map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              onClick={onClose}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm ${
                  isActive ? 'bg-sky text-brand font-semibold' : 'text-ink'
                }`
              }
            >
              {i.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}