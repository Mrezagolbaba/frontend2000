import { useState } from "react";
import { CiWallet } from "react-icons/ci";
import { CurrencyCode } from "types/wallet";
import { coinShow, convertText, lirShow, tomanShow } from "helpers";
import { BsTag } from "react-icons/bs";
import { Tooltip } from "reactstrap";

import exchange from "assets/scss/dashboard/exchange.module.scss";

type Props = {
  destination: {
    amount: number;
    currency: CurrencyCode;
  };
  source: {
    amount: number;
    currency: CurrencyCode;
  };
  type: "source" | "destination";
  showRate?: boolean;
  wallets: any;
  reverseRate: string;
  rate: string;
  isLoading: boolean;
  setStock?: (string)=>void
};

export default function RatePlace({
  destination,
  source,
  type,
  wallets,
  showRate = false,
  rate,
  reverseRate,
  isLoading = false,
  setStock
}: Props) {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const toggleTooltip = () => setTooltipOpen((prevState) => !prevState);

  const handleStock = () => {
    const currency = type === "source" ? source.currency : destination.currency;
    const currencyLabel =
      currency === "IRR" ? "تومان" : currency === "TRY" ? "لیر" : "تتر";
    if (wallets && wallets.length > 0) {
      const currentWallet = wallets?.find((w) => w.currencyCode === currency);
      setStock?.(currentWallet?.availableBalance);
      switch (currency) {
        case "IRR": {
          return tomanShow({
            value: currentWallet?.availableBalance,
            currency: "IRR",
          });
        }
        case "TRY": {
          return lirShow({
            value: currentWallet?.availableBalance,
            currency: "TRY",
          });
        }
        default: {
          return coinShow(currentWallet?.availableBalance, "USDT");
        }
      }
    }
    return `${0} ${currencyLabel}`;
  };

  const handleRate = () => {
    if (source.currency === "USDT" && destination.currency === "IRR")
      return (
        <>
          <div id="currency-detail">
            <BsTag />
            <span className="title">
              نرخ تقریبی {convertText("USDT", "enToFa")} :{" "}
            </span>
            <span className="value">
              {tomanShow({ value: rate, currency: "IRR" })}
            </span>
          </div>
          <Tooltip
            isOpen={tooltipOpen}
            target="currency-detail"
            toggle={toggleTooltip}
          >
            {`ارزش هر یک ${convertText(
             "enToFa",
             "IRR",
            )} در برابر ${convertText("USDT", "enToFa")}`}
          </Tooltip>
        </>
      );
    else if (source.currency === "IRR" && destination.currency === "USDT")
      return (
        <>
          <div id="currency-detail">
            <BsTag />
            <span className="title">
              نرخ تقریبی {convertText("USDT", "enToFa")} :{" "}
            </span>
            <span className="value">
              {tomanShow({ value: reverseRate, currency: "IRR" })}
            </span>
          </div>
          <Tooltip
            isOpen={tooltipOpen}
            target="currency-detail"
            toggle={toggleTooltip}
          >
            {`ارزش هر یک  ${convertText(
              "IRR",
              "enToFa",
            )} در برابر ${convertText("USDT", "enToFa")}`}
          </Tooltip>
        </>
      );
    else if (source.currency === "USDT" && destination.currency === "TRY") {
      return (
        <>
          <div id="currency-detail">
            <BsTag />
            <span className="title">
              نرخ تقریبی {convertText("USDT", "enToFa")} :{" "}
            </span>
            <span className="value">
              {lirShow({ value: rate, currency: "TRY" })}
            </span>
          </div>
          <Tooltip
            isOpen={tooltipOpen}
            target="currency-detail"
            toggle={toggleTooltip}
          >
            {`ارزش هر یک  ${convertText(
              "TRY",
              "enToFa",
            )} در برابر ${convertText("USDT", "enToFa")}`}
          </Tooltip>
        </>
      );
    } else if (destination.currency === "USDT" && source.currency === "TRY") {
      return (
        <>
          <div id="currency-detail">
            <BsTag />
            <span className="title">
              نرخ تقریبی {convertText("USDT", "enToFa")} :{" "}
            </span>
            <span className="value">
              {lirShow({ value: reverseRate, currency: "TRY" })}
            </span>
          </div>
          <Tooltip
            isOpen={tooltipOpen}
            target="currency-detail"
            toggle={toggleTooltip}
          >
            {`ارزش هر یک  ${convertText(
              "TRY",
              "enToFa",
            )} در برابر ${convertText("USDT", "enToFa")}`}
          </Tooltip>
        </>
      );
    } else if (source.currency === "TRY" && destination.currency === "IRR") {
      return (
        <>
          <div id="currency-detail">
            <BsTag />
            <span className="title">نرخ تقریبی {convertText("TRY", "enToFa")} : </span>
            <span className="value">
              {tomanShow({ value: rate, currency: "IRR" })}
            </span>
          </div>
          <Tooltip
            isOpen={tooltipOpen}
            target="currency-detail"
            toggle={toggleTooltip}
          >
            {`ارزش هر یک  ${convertText(
              "IRR",
              "enToFa",
            )} در برابر ${convertText("TRY", "enToFa")}`}
          </Tooltip>
        </>
      );
    } else if (destination.currency === "TRY" && source.currency === "IRR") {
      return (
        <>
          <div id="currency-detail">
            <BsTag />
            <span className="title">نرخ تقریبی {convertText("TRY", "enToFa")} : </span>
            <span className="value">
              {tomanShow({ value: reverseRate, currency: "IRR" })}
            </span>
          </div>
          <Tooltip
            isOpen={tooltipOpen}
            target="currency-detail"
            toggle={toggleTooltip}
          >
            {`ارزش هر یک  ${convertText(
              "IRR",
              "enToFa",
            )} در برابر ${convertText("TRY", "enToFa")}`}
          </Tooltip>
        </>
      );
    }
  };

  return (
    <>
      <div className={exchange.detail}>
        {isLoading ? (
          <div className="text-center placeholder-glow d-flex justify-content-between w-100">
            <div className="placeholder col-11 bg-secondary rounded py-2" />
          </div>
        ) : (
          <div>
            <CiWallet />
            <span className="title">موجودی: </span>

            <span className="value">{handleStock()}</span>
          </div>
        )}
        {isLoading ? (
          <div className="text-center placeholder-glow d-flex justify-content-between w-100">
            <div className="placeholder col-11 bg-secondary rounded py-2" />
          </div>
        ) : (
          showRate && handleRate()
        )}
      </div>
    </>
  );
}
