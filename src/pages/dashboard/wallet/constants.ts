export interface CurrencyType {
  code: string;
  type: "FIAT" | "CRYPTO";
  name: string;
  symbol: string;
  decimals: number;
}
