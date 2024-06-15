import { BsTag } from "react-icons/bs";
import { CiWallet } from "react-icons/ci";
import { CurrencyCode } from "types/wallet";
import { Tooltip } from "reactstrap";
import { convertText, normalizeAmount } from "helpers";
import { useState } from "react";

import exchange from "assets/scss/dashboard/exchange.module.scss";
import TagIcon from "components/Icons/TagIcon";

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
  rate: string;
  isLoading: boolean;
  setStock?: (string) => void;
};

export default function RatePlace({
  destination,
  source,
  type,
  wallets,
  showRate = false,
  rate,
  isLoading = false,
  setStock,
}: Props) {
  // ==============|| States ||================= //
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  // ==============|| Handlers ||================= //
  const toggleTooltip = () => setTooltipOpen((prevState) => !prevState);
  const handleStock = () => {
    const currency = type === "source" ? source.currency : destination.currency;
    const currencyLabel =
      currency === "IRR" ? "تومان" : currency === "TRY" ? "لیر" : "تتر";
    if (wallets && wallets.length > 0) {
      const currentWallet = wallets?.find((w) => w.currencyCode === currency);
      setStock?.(currentWallet?.availableBalance);
      return normalizeAmount(currentWallet?.availableBalance, currency, true);
    }
    return `${0} ${currencyLabel}`;
  };
  const handleRate = () => {
    const ratAmount = Number(rate);

    if (ratAmount < 1) {
      console.log("rate", ratAmount, destination, source);
      return (
        <>
          <div id="currency-detail">
            <TagIcon />
            <span className="title">{`نرخ تقریبی ${convertText(destination.currency, "enToFa")}: `}</span>
            <span className="value">
              {normalizeAmount(
                (1 / ratAmount).toString(),
                source.currency,
                true,
              )}
            </span>
          </div>
          <Tooltip
            isOpen={tooltipOpen}
            target="currency-detail"
            toggle={toggleTooltip}
          >
            {`ارزش هر یک ${convertText(destination.currency, "enToFa")} در برابر ${convertText(source.currency, "enToFa")}`}
          </Tooltip>
        </>
      );
    } else
      return (
        <>
          <div id="currency-detail">
            <TagIcon />
            <span className="title">
              {`نرخ تقریبی ${convertText(source.currency, "enToFa")}: `}
            </span>
            <span className="value">
              {normalizeAmount(
                ratAmount.toString(),
                destination.currency,
                true,
              )}
            </span>
          </div>
          <Tooltip
            isOpen={tooltipOpen}
            target="currency-detail"
            toggle={toggleTooltip}
          >
            {`ارزش هر یک ${convertText(source.currency, "enToFa")} در برابر ${convertText(destination.currency, "enToFa")}`}
          </Tooltip>
        </>
      );
    // if (source.currency === "USDT" && destination.currency === "IRR")
    //   return (
    //     <>
    //       <div id="currency-detail">
    //         <BsTag />
    //         <span className="title">نرخ تقریبی تتر : </span>
    //         <span className="value">{normalizeAmount(rate, "IRR", true)}</span>
    //       </div>
    //       <Tooltip
    //         isOpen={tooltipOpen}
    //         target="currency-detail"
    //         toggle={toggleTooltip}
    //       >
    //         ارزش هر یک تتر در برابر تومان
    //       </Tooltip>
    //     </>
    //   );
    // else if (source.currency === "IRR" && destination.currency === "USDT")
    //   return (
    //     <>
    //       <div id="currency-detail">
    //         <BsTag />
    //         <span className="title">نرخ تقریبی تتر : </span>
    //         <span className="value">
    //           {normalizeAmount(reverseRate, "IRR", true)}
    //         </span>
    //       </div>
    //       <Tooltip
    //         isOpen={tooltipOpen}
    //         target="currency-detail"
    //         toggle={toggleTooltip}
    //       >
    //         ارزش هر یک تتر در برابر تومان
    //       </Tooltip>
    //     </>
    //   );
    // else if (source.currency === "USDT" && destination.currency === "TRY") {
    //   return (
    //     <>
    //       <div id="currency-detail">
    //         <BsTag />
    //         <span className="title">نرخ تقریبی تتر : </span>
    //         <span className="value">{normalizeAmount(rate, "TRY", true)}</span>
    //       </div>
    //       <Tooltip
    //         isOpen={tooltipOpen}
    //         target="currency-detail"
    //         toggle={toggleTooltip}
    //       >
    //         ارزش هر یک تتر در برابر لیر
    //       </Tooltip>
    //     </>
    //   );
    // } else if (destination.currency === "USDT" && source.currency === "TRY") {
    //   return (
    //     <>
    //       <div id="currency-detail">
    //         <BsTag />
    //         <span className="title">نرخ تقریبی تتر : </span>
    //         <span className="value">
    //           {normalizeAmount(reverseRate, "TRY", true)}
    //         </span>
    //       </div>
    //       <Tooltip
    //         isOpen={tooltipOpen}
    //         target="currency-detail"
    //         toggle={toggleTooltip}
    //       >
    //         ارزش هر یک تتر در برابر لیر
    //       </Tooltip>
    //     </>
    //   );
    // } else if (source.currency === "TRY" && destination.currency === "IRR") {
    //   return (
    //     <>
    //       <div id="currency-detail">
    //         <BsTag />
    //         <span className="title">نرخ تقریبی لیر : </span>
    //         <span className="value">{normalizeAmount(rate, "IRR", true)}</span>
    //       </div>
    //       <Tooltip
    //         isOpen={tooltipOpen}
    //         target="currency-detail"
    //         toggle={toggleTooltip}
    //       >
    //         ارزش هر یک لیر در برابر تومان
    //       </Tooltip>
    //     </>
    //   );
    // } else if (destination.currency === "TRY" && source.currency === "IRR") {
    //   return (
    //     <>
    //       <div id="currency-detail">
    //         <BsTag />
    //         <span className="title">نرخ تقریبی لیر : </span>
    //         <span className="value">
    //           {normalizeAmount(reverseRate, "IRR", true)}
    //         </span>
    //       </div>
    //       <Tooltip
    //         isOpen={tooltipOpen}
    //         target="currency-detail"
    //         toggle={toggleTooltip}
    //       >
    //         ارزش هر یک لیر در برابر تومان
    //       </Tooltip>
    //     </>
    //   );
    // }
  };

  // ==============|| Render ||================= //
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
