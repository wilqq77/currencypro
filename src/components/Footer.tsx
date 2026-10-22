export function Footer() {
  return (
    <footer className="mt-12 border-t border-sky">
      <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-muted flex flex-wrap justify-between gap-2">
        <span>© {new Date().getFullYear()} CurrencyPro. Демонстрационный сервис.</span>
        <span>Курсы предоставлены Frankfurter API. Сервис не осуществляет переводы.</span>
      </div>
    </footer>
  );
}