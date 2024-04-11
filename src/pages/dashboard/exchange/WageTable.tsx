import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Table } from "reactstrap";
import { coinShow, convertText, lirShow, tomanShow } from "helpers";
import { CurrencyCode } from "types/wallet";

import exchange from "assets/scss/dashboard/exchange.module.scss";

type Props = {
  sourceCode: CurrencyCode;
  destinationCode: CurrencyCode;
  data: any;
  feeCurrencyCode: CurrencyCode;
  setFeeCurrencyCode: Dispatch<SetStateAction<CurrencyCode>>;
  isLoading: boolean;
};
export default function WageTable({
  data,
  setFeeCurrencyCode,
  isLoading = false,
  sourceCode,
  destinationCode,
  feeCurrencyCode,
}: Props) {
  const [feeCost, setFeeCost] = useState<string>("0");
  const [feeAmount, setFeeAmount] = useState<string>("0");

  const [finalAmount, setFinalAmount] = useState<string>("0");

  const handleDetails = (key: 0 | 1) => {
    const targetFee = data?.transactions[key].fees[0];

    if (targetFee.format === "STATIC") {
      const coin = coinShow(targetFee.internalConvertedAmount, "USDT");
      setFeeCost(coin);
    } else {
      const coin = (Number(targetFee.value) * 100).toPrecision(2);
      setFeeCost(`${coin}%`);
    }
    let feeTemp = 0;

    if (feeCurrencyCode === destinationCode)
      feeTemp =
        Number(data?.transactions[1].amount) - Number(data.transactions[1].fee);
    else feeTemp = Number(data?.transactions[1].amount);

    switch (feeCurrencyCode) {
      case "USDT":
        setFeeAmount(coinShow(data?.transactions[key].fee, "USDT"));
        break;
      case "TRY":
        setFeeAmount(
          lirShow({ value: data?.transactions[key].fee, currency: "TRY" }),
        );
        break;
      case "IRR":
      default:
        setFeeAmount(
          tomanShow({ value: data?.transactions[key].fee, currency: "IRR" }),
        );
        break;
    }
    switch (data.destinationCurrencyCode) {
      case "USDT":
        setFinalAmount(coinShow(feeTemp.toString(), "USDT"));
        break;
      case "TRY":
        setFinalAmount(lirShow({ value: feeTemp.toString(), currency: "TRY" }));
        break;
      case "IRR":
      default:
        setFinalAmount(
          tomanShow({ value: feeTemp.toString(), currency: "IRR" }),
        );
        break;
    }
  };

  useEffect(() => {
    if (data) {
      if (feeCurrencyCode === sourceCode) handleDetails(0);
      else handleDetails(1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, feeCurrencyCode]);

  return (
    <div className={exchange.wage}>
      <Table className={exchange.table}>
        <thead>
          <tr>
            <th scope="col" className="text-center">
              نحوه پرداخت کارمزد
            </th>
            <th scope="col" className="text-center">
              مبلغ کارمزد
            </th>
            <th scope="col" className="text-center">
              مبلغ نهایی دریافت
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td className="text-center">
                <fieldset className="text-center placeholder-glow d-flex justify-content-between">
                  <div className="placeholder col-5 bg-secondary rounded py-2 mx-1" />
                  <div className="placeholder col-5 bg-secondary rounded py-2 mx-1" />
                </fieldset>
              </td>
              <td className="text-center">
                <div className="text-center placeholder-glow d-flex justify-content-between">
                  <div className="placeholder col-12 bg-secondary rounded py-2 mx-1" />
                </div>
              </td>
              <td className="text-center">
                <div className="text-center placeholder-glow d-flex justify-content-between">
                  <div className="placeholder col-12 bg-secondary rounded py-2 mx-1" />
                </div>
              </td>
            </tr>
          ) : (
            <tr>
              <td className="text-center">
                <fieldset>
                  <div className={exchange["radio-toggle-control"]}>
                    <input
                      type="radio"
                      name="rtc"
                      id="rtc1"
                      checked={feeCurrencyCode === sourceCode}
                      onChange={() => setFeeCurrencyCode(sourceCode)}
                    />
                    <label htmlFor="rtc1">
                      {convertText(sourceCode, "enToFa")}
                    </label>
                  </div>

                  <div className={exchange["radio-toggle-control"]}>
                    <input
                      type="radio"
                      name="rtc"
                      id="rtc2"
                      checked={feeCurrencyCode === destinationCode}
                      onChange={() => setFeeCurrencyCode(destinationCode)}
                    />
                    <label htmlFor="rtc2">
                      {convertText(destinationCode, "enToFa")}
                    </label>
                  </div>
                </fieldset>
              </td>
              <td className="text-center">{`${feeCost} معادل ${feeAmount}`}</td>
              <td className="text-center">{finalAmount}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
