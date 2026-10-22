import { ReactNode, useState } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { MobileNavigation } from '../components/MobileNavigation';
import type { Settings } from '../types';

export function MainLayout({
  children,
  settings,
  onLanguageToggle,
}: { children: ReactNode; settings: Settings; onLanguageToggle: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Header settings={settings} onLanguageToggle={onLanguageToggle} onMenu={() => setMenuOpen(true)} />
      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="max-w-7xl mx-auto px-4 flex gap-6">
        <Sidebar />
        <main className="flex-1 py-6 min-w-0">{children}</main>
      </div>
      <Footer />
    </div>
  );
}