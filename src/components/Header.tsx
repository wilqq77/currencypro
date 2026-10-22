import { NavLink } from 'react-router-dom';
import { Globe, Menu } from 'lucide-react';
import { Logo } from './Logo';
import type { Settings } from '../types';

const LINKS = [
  { to: '/', label: 'Главная' },
  { to: '/currencies', label: 'Курсы валют' },
  { to: '/converter', label: 'Конвертер' },
  { to: '/history', label: 'История' },
  { to: '/about', label: 'О проекте' },
];

interface Props {
  settings: Settings;
  onLanguageToggle: () => void;
  onMenu: () => void;
}

export function Header({ settings, onLanguageToggle, onMenu }: Props) {
  return (
    <header className="sticky top-0 z-30 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={onMenu}
            className="md:hidden p-2 rounded-lg hover:bg-white/10"
            aria-label="Открыть меню"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Logo dark />
          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm transition ${
                    isActive ? 'bg-sky text-navy font-semibold' : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onLanguageToggle}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm hover:bg-white/10"
            aria-label="Переключить язык"
          >
            <Globe className="w-4 h-4" />
            {settings.language.toUpperCase()}
          </button>
          <div className="w-9 h-9 rounded-full bg-teal grid place-items-center font-semibold">
            U
          </div>
        </div>
      </div>
    </header>
  );
}