import Lira from "assets/img/coins/icon_try.svg";
import toman from "assets/img/coins/Toman.svg";
import tetter from "assets/img/coins/tether.svg";
import { CurrencyCode } from "types/wallet";

export type CurrencyOption = {
  value: CurrencyCode;
  label: {
    img: string;
    text: string;
  };
};
export const currencyOptions: CurrencyOption[] = [
  {
    value: "IRR",
    label: { text: "تومان", img: toman },
  },

  {
    value: "TRY",
    label: { text: "لیر", img: Lira },
  },
  {
    value: "USDT",
    label: { text: "تتر", img: tetter },
  },
];
