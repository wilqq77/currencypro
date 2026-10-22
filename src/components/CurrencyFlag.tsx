import { FlagUs, FlagEu, FlagRu, FlagGb, FlagJp, FlagCn, FlagCh, FlagAu, FlagCa, FlagSe, FlagNo, FlagDk, FlagPl, FlagCz, FlagHu, FlagRo, FlagBg, FlagTr, FlagBr, FlagMx, FlagIn, FlagId, FlagIl, FlagKr, FlagMy, FlagNz, FlagPh, FlagSg, FlagTh, FlagZa, FlagIs } from '@sankyu/react-circle-flags';

interface Props {
  countryCode?: string;
  size?: number;
}

const FLAG_MAP: Record<string, React.ComponentType<{ width?: number; height?: number; className?: string }>> = {
  US: FlagUs,
  EU: FlagEu,
  RU: FlagRu,
  GB: FlagGb,
  JP: FlagJp,
  CN: FlagCn,
  CH: FlagCh,
  AU: FlagAu,
  CA: FlagCa,
  SE: FlagSe,
  NO: FlagNo,
  DK: FlagDk,
  PL: FlagPl,
  CZ: FlagCz,
  HU: FlagHu,
  RO: FlagRo,
  BG: FlagBg,
  TR: FlagTr,
  BR: FlagBr,
  MX: FlagMx,
  IN: FlagIn,
  ID: FlagId,
  IL: FlagIl,
  KR: FlagKr,
  MY: FlagMy,
  NZ: FlagNz,
  PH: FlagPh,
  SG: FlagSg,
  TH: FlagTh,
  ZA: FlagZa,
  IS: FlagIs,
};

export function CurrencyFlag({ countryCode, size = 24 }: Props) {
  if (!countryCode) return <span className="text-xl">🏳️</span>;
  
  const FlagComponent = FLAG_MAP[countryCode.toUpperCase()];
  
  if (!FlagComponent) return <span className="text-xl">🏳️</span>;
  
  return <FlagComponent width={size} height={size} className="rounded-full" />;
}