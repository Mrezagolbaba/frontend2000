import { convertIRRToToman, convertText } from "helpers";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsTag } from "react-icons/bs";
import { CiWallet } from "react-icons/ci";
import { exchangeRateBYIRR } from "services/currencySwap";

import exchange from "assets/scss/components/Input/exchangeInput.module.scss";
import { isEmpty } from "lodash";

type Props = {
  value: string;
  wallets: any;
};

const initDetail = {
  balance: "0",
  availableBalance: "0",
  currency: "IRR",
  ratePerIRR: 0,
};

export default function AmountDetails({ value, wallets }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState(initDetail);

  const handleDetail = async (data) => {
    if (data?.currencyCode === "IRR") {
      setDetail({
        balance: data?.balance ?? "0",
        availableBalance: data?.availableBalance ?? "0",
        currency: convertText(data?.currencyCode, "enToFa") ?? "",
        ratePerIRR: 1,
      });
      return;
    } else {
      setIsLoading(true);
      const sourceCurrencyCode = convertText(data?.currencyCode, "faToEn");
      try {
        const res = await exchangeRateBYIRR(sourceCurrencyCode);
        setIsLoading(false);
        setDetail({
          balance: data?.balance ?? "0",
          availableBalance: data?.availableBalance ?? "0",
          currency: convertText(data?.currencyCode, "enToFa") ?? "",
          ratePerIRR: Number(res?.rate) ?? 0,
        });
      } catch (error: any) {
        setIsLoading(false);
        setDetail(initDetail);
        toast.error(error?.message, {
          position: "bottom-left",
        });
      }
    }
  };

  useEffect(() => {
    const data =
      wallets &&
      wallets.length > 0 &&
      wallets.find((item) => item?.currencyCode === value);
    if (Number(value) > 0 || (wallets && wallets.length > 0)) {
      handleDetail(data);
    }
  }, [value, wallets]);

  return (
    <div className={exchange.detail}>
      {isLoading ? (
        <div className="text-center placeholder-glow d-flex justify-content-between my-3">
          <div className="placeholder col-5 rounded" />
          <div className="placeholder col-5 rounded" />
        </div>
      ) : (
        <div>
          <CiWallet />
          <span className="title">موجودی: </span>
          <span className="value">
            {convertIRRToToman(detail.availableBalance).toLocaleString("IRR")}
            {convertText(detail.currency, "enToFa")}
          </span>
        </div>
      )}
      {isLoading ? (
        <div className="text-center placeholder-glow d-flex justify-content-between my-3">
          <div className="placeholder col-5 rounded" />
          <div className="placeholder col-5 rounded" />
        </div>
      ) : (
        <div>
          <BsTag />
          <span className="title">
            نرخ {convertText(detail.currency, "enToFa")} :
          </span>
          <span className="value">
            {convertIRRToToman(detail.ratePerIRR).toLocaleString("IRR")} تومان
          </span>
        </div>
      )}
    </div>
  );
}
