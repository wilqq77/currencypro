import { NavLink } from 'react-router-dom';
import { Home, Coins, Repeat, History, Info, Settings as Cog } from 'lucide-react';

const ITEMS = [
  { to: '/', label: 'Главная', icon: Home },
  { to: '/currencies', label: 'Все валюты', icon: Coins },
  { to: '/converter', label: 'Конвертер', icon: Repeat },
  { to: '/history', label: 'История', icon: History },
  { to: '/about', label: 'О проекте', icon: Info },
  { to: '/settings', label: 'Настройки', icon: Cog },
];

export function Sidebar() {
  return (
    <aside className="hidden md:block w-60 shrink-0 py-6">
      <nav className="bg-white rounded-xl2 border border-sky shadow-card p-2">
        {ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition ${
                isActive ? 'bg-sky text-brand font-semibold' : 'text-ink hover:bg-sky/60'
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}