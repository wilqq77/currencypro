import type { CurrencyMeta } from '../types';

// Список валют: фиат — поддерживаемые Frankfurter + метаданные.
// Крипта/металлы помечены supported:false — для них курс не выдумываем.
export const CURRENCIES: CurrencyMeta[] = [
  { code: 'USD', nameRu: 'Доллар США', nameEn: 'US Dollar', symbol: '$', category: 'fiat', countryCode: 'US', supported: true, popularity: 100 },
  { code: 'EUR', nameRu: 'Евро', nameEn: 'Euro', symbol: '€', category: 'fiat', countryCode: 'EU', supported: true, popularity: 99 },
  { code: 'RUB', nameRu: 'Российский рубль', nameEn: 'Russian Ruble', symbol: '₽', category: 'fiat', countryCode: 'RU', supported: true, popularity: 98 },
  { code: 'GBP', nameRu: 'Фунт стерлингов', nameEn: 'British Pound', symbol: '£', category: 'fiat', countryCode: 'GB', supported: true, popularity: 97 },
  { code: 'JPY', nameRu: 'Японская йена', nameEn: 'Japanese Yen', symbol: '¥', category: 'fiat', countryCode: 'JP', supported: true, popularity: 96 },
  { code: 'CNY', nameRu: 'Китайский юань', nameEn: 'Chinese Yuan', symbol: '¥', category: 'fiat', countryCode: 'CN', supported: true, popularity: 95 },
  { code: 'CHF', nameRu: 'Швейцарский франк', nameEn: 'Swiss Franc', symbol: 'Fr', category: 'fiat', countryCode: 'CH', supported: true, popularity: 90 },
  { code: 'AUD', nameRu: 'Австралийский доллар', nameEn: 'Australian Dollar', symbol: 'A$', category: 'fiat', countryCode: 'AU', supported: true, popularity: 88 },
  { code: 'CAD', nameRu: 'Канадский доллар', nameEn: 'Canadian Dollar', symbol: 'C$', category: 'fiat', countryCode: 'CA', supported: true, popularity: 87 },
  { code: 'SEK', nameRu: 'Шведская крона', nameEn: 'Swedish Krona', symbol: 'kr', category: 'fiat', countryCode: 'SE', supported: true, popularity: 80 },
  { code: 'NOK', nameRu: 'Норвежская крона', nameEn: 'Norwegian Krone', symbol: 'kr', category: 'fiat', countryCode: 'NO', supported: true, popularity: 79 },
  { code: 'DKK', nameRu: 'Датская крона', nameEn: 'Danish Krone', symbol: 'kr', category: 'fiat', countryCode: 'DK', supported: true, popularity: 78 },
  { code: 'PLN', nameRu: 'Польский злотый', nameEn: 'Polish Zloty', symbol: 'zł', category: 'fiat', countryCode: 'PL', supported: true, popularity: 76 },
  { code: 'CZK', nameRu: 'Чешская крона', nameEn: 'Czech Koruna', symbol: 'Kč', category: 'fiat', countryCode: 'CZ', supported: true, popularity: 75 },
  { code: 'HUF', nameRu: 'Венгерский форинт', nameEn: 'Hungarian Forint', symbol: 'Ft', category: 'fiat', countryCode: 'HU', supported: true, popularity: 74 },
  { code: 'RON', nameRu: 'Румынский лей', nameEn: 'Romanian Leu', symbol: 'lei', category: 'fiat', countryCode: 'RO', supported: true, popularity: 72 },
  { code: 'BGN', nameRu: 'Болгарский лев', nameEn: 'Bulgarian Lev', symbol: 'лв', category: 'fiat', countryCode: 'BG', supported: true, popularity: 70 },
  { code: 'TRY', nameRu: 'Турецкая лира', nameEn: 'Turkish Lira', symbol: '₺', category: 'fiat', countryCode: 'TR', supported: true, popularity: 85 },
  { code: 'BRL', nameRu: 'Бразильский реал', nameEn: 'Brazilian Real', symbol: 'R$', category: 'fiat', countryCode: 'BR', supported: true, popularity: 82 },
  { code: 'MXN', nameRu: 'Мексиканское песо', nameEn: 'Mexican Peso', symbol: 'Mex$', category: 'fiat', countryCode: 'MX', supported: true, popularity: 77 },
  { code: 'INR', nameRu: 'Индийская рупия', nameEn: 'Indian Rupee', symbol: '₹', category: 'fiat', countryCode: 'IN', supported: true, popularity: 84 },
  { code: 'IDR', nameRu: 'Индонезийская рупия', nameEn: 'Indonesian Rupiah', symbol: 'Rp', category: 'fiat', countryCode: 'ID', supported: true, popularity: 60 },
  { code: 'ILS', nameRu: 'Израильский шекель', nameEn: 'Israeli Shekel', symbol: '₪', category: 'fiat', countryCode: 'IL', supported: true, popularity: 68 },
  { code: 'KRW', nameRu: 'Южнокорейская вона', nameEn: 'South Korean Won', symbol: '₩', category: 'fiat', countryCode: 'KR', supported: true, popularity: 73 },
  { code: 'MYR', nameRu: 'Малайзийский ринггит', nameEn: 'Malaysian Ringgit', symbol: 'RM', category: 'fiat', countryCode: 'MY', supported: true, popularity: 65 },
  { code: 'NZD', nameRu: 'Новозеландский доллар', nameEn: 'New Zealand Dollar', symbol: 'NZ$', category: 'fiat', countryCode: 'NZ', supported: true, popularity: 71 },
  { code: 'PHP', nameRu: 'Филиппинское песо', nameEn: 'Philippine Peso', symbol: '₱', category: 'fiat', countryCode: 'PH', supported: true, popularity: 62 },
  { code: 'SGD', nameRu: 'Сингапурский доллар', nameEn: 'Singapore Dollar', symbol: 'S$', category: 'fiat', countryCode: 'SG', supported: true, popularity: 69 },
  { code: 'THB', nameRu: 'Тайский бат', nameEn: 'Thai Baht', symbol: '฿', category: 'fiat', countryCode: 'TH', supported: true, popularity: 66 },
  { code: 'ZAR', nameRu: 'Южноафриканский рэнд', nameEn: 'South African Rand', symbol: 'R', category: 'fiat', countryCode: 'ZA', supported: true, popularity: 64 },
  { code: 'ISK', nameRu: 'Исландская крона', nameEn: 'Icelandic Krona', symbol: 'kr', category: 'fiat', countryCode: 'IS', supported: true, popularity: 40 },
  { code: 'BTC', nameRu: 'Биткоин', nameEn: 'Bitcoin', symbol: '₿', category: 'crypto', supported: false, popularity: 94 },
  { code: 'ETH', nameRu: 'Эфириум', nameEn: 'Ethereum', symbol: 'Ξ', category: 'crypto', supported: false, popularity: 93 },
  { code: 'XAU', nameRu: 'Золото', nameEn: 'Gold', symbol: 'Au', category: 'metal', supported: false, popularity: 89 },
  { code: 'XAG', nameRu: 'Серебро', nameEn: 'Silver', symbol: 'Ag', category: 'metal', supported: false, popularity: 86 },
];

export const CURRENCY_MAP: Record<string, CurrencyMeta> = Object.fromEntries(
  CURRENCIES.map((c) => [c.code, c])
);

export const POPULAR_CODES = ['USD', 'EUR', 'RUB', 'GBP', 'JPY'];

export const FLAG = (code?: string): string => {
  if (!code) return '🏳️';
  if (code === 'EU') return '🇪🇺';
  const cc = code.toUpperCase();
  if (cc.length !== 2) return '🏳️';
  const A = 0x1f1e6;
  return String.fromCodePoint(A + cc.charCodeAt(0) - 65, A + cc.charCodeAt(1) - 65);
};