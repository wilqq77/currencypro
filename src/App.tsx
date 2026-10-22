import { HashRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { useSettings } from './hooks/useSettings';
import { HomePage } from './pages/HomePage';
import { ConverterPage } from './pages/ConverterPage';
import { HistoryPage } from './pages/HistoryPage';
import { CurrenciesPage } from './pages/CurrenciesPage';
import { AboutPage } from './pages/AboutPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  const { settings, update } = useSettings();

  const toggleLanguage = () => update({ language: settings.language === 'ru' ? 'en' : 'ru' });

  return (
    <HashRouter>
      <MainLayout settings={settings} onLanguageToggle={toggleLanguage}>
        <Routes>
          <Route path="/" element={<HomePage settings={settings} />} />
          <Route path="/converter" element={<ConverterPage settings={settings} />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/currencies" element={<CurrenciesPage settings={settings} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/settings" element={<SettingsPage settings={settings} update={update} />} />
          <Route path="*" element={<div className="p-8">Страница не найдена</div>} />
        </Routes>
      </MainLayout>
    </HashRouter>
  );
}