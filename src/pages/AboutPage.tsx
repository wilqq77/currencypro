export function AboutPage() {
  return (
    <div className="prose max-w-none space-y-4 text-sm text-ink">
      <h1 className="text-2xl font-bold text-navy">О проекте CurrencyPro</h1>
      <p>
        CurrencyPro — демонстрационный веб-сервис для конвертации валют и просмотра справочной информации.
        Проект создан как учебный пример современного fintech-интерфейса.
      </p>
      <h2 className="text-lg font-semibold text-navy">Как рассчитываются курсы</h2>
      <p>
        Сервис запрашивает актуальные курсы у Frankfurter API (данные Европейского центрального банка).
        Кросс-курсы рассчитываются математически по формуле отношения курсов.
      </p>
      <h2 className="text-lg font-semibold text-navy">Источники данных</h2>
      <ul className="list-disc pl-5">
        <li>Frankfurter API — https://api.frankfurter.app</li>
      </ul>
      <h2 className="text-lg font-semibold text-navy">Ограничения</h2>
      <ul className="list-disc pl-5">
        <li>Курсы ECB публикуются в рабочие дни, могут отставать от рыночных.</li>
        <li>Криптовалюты и металлы в Frankfurter отсутствуют — для них показывается заглушка.</li>
        <li>Сервис не осуществляет реальных переводов и не хранит персональные данные.</li>
      </ul>
      <h2 className="text-lg font-semibold text-navy">Связь</h2>
      <p>Контактные данные не публикуются: это демонстрационный проект.</p>
    </div>
  );
}