import { Col, Input, Row } from "reactstrap";
import { convertIRRToToman, convertText } from "helpers";

import buy from "assets/scss/dashboard/buy-sell.module.scss";
import { useCreateCurrencySwapMutation } from "store/api/exchange-management";
import { CurrencyCode } from "types/wallet";
import { useEffect, useState } from "react";

type Props = {
  source: {
    amount: number | string;
    currency: CurrencyCode;
  };
  destination: {
    amount: number | string;
    currency: CurrencyCode;
  };
};
export default function WageTable({ source, destination }: Props) {
  const [feeCurrency, setFeeCurrency] = useState<CurrencyCode>(source.currency);
  const [currencySwap, { data, isLoading, isSuccess }] =
    useCreateCurrencySwapMutation();
  const [resultData, setResultData] = useState({
    sourceFee: "",
    sourceFeePercent: 0,
    destinationFee: "",
    destinationFeePercent: 0,
    destinationAmount: "",
  });

  useEffect(() => {
    console.log("here", source.amount);

    if (Number(source.amount) > 0) {
      const data = {
        sourceCurrencyCode: source.currency,
        sourceAmount:
          source.currency === "IRR"
            ? (Number(source.amount) * 10).toString()
            : Number(source.amount).toString(),
        destinationCurrencyCode: destination.currency,
        feeCurrencyCode: feeCurrency,
      };

      currencySwap({ isDry: true, data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source, destination]);

  useEffect(() => {
    if (isSuccess && data) {
      setResultData({
        sourceFee:
          source.currency === "IRR"
            ? convertIRRToToman(data?.transactions[0]?.fee || 0)
            : Number(data?.transactions[0]?.fee || 0).toLocaleString(),
        sourceFeePercent:
          Number(data?.transactions[0]?.fees?.[0]?.value || 0) * 100,
        destinationFee:
          destination.currency === "IRR"
            ? convertIRRToToman(data?.transactions?.[1]?.fee || 0)
            : Number(data?.transactions[1]?.fee || 0).toLocaleString(),
        destinationFeePercent:
          Number(data?.transactions[1]?.fees?.[1]?.value || 0) * 100,
        destinationAmount:
          destination.currency === "IRR"
            ? convertIRRToToman(
                Number(data?.transactions[1]?.amount) -
                  Number(data?.transactions[1]?.fee || 0),
              )
            : Number(
                Number(data?.transactions[1]?.amount) -
                  Number(data?.transactions[1]?.fee || 0),
              ).toLocaleString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);

  return (
    <div className={buy.wage}>
      <table className={buy.table}>
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
        {!isLoading && (
          <tbody>
            <tr>
              <td className="text-center">
                <Row>
                  <Col lg={4} xs={6}>
                    <div className="radio-toggle-control">
                      <Input
                        type="radio"
                        name="rtc"
                        id="rtc1"
                        className="m-2"
                        checked={feeCurrency === source.currency}
                        onChange={() => {
                          setFeeCurrency(source.currency);
                        }}
                      />
                      <label>{convertText(source.currency, "enToFa")}</label>
                    </div>
                  </Col>
                  <Col lg={5} xs={6}>
                    <div className="radio-toggle-control">
                      <Input
                        type="radio"
                        name="rtc"
                        id="rtc2"
                        className="m-2"
                        checked={feeCurrency === destination.currency}
                        onChange={() => {
                          setFeeCurrency(destination.currency);
                        }}
                      />
                      <label>
                        {convertText(destination.currency, "enToFa")}
                      </label>
                    </div>
                  </Col>
                </Row>
              </td>
              {data && (
                <>
                  <td className="text-center">
                    {feeCurrency === source.currency
                      ? `${resultData.sourceFeePercent}٪ معادل ${
                          resultData.sourceFee
                        } ${convertText(source.currency, "enToFa")}`
                      : `${resultData.destinationFeePercent}٪ معادل ${
                          resultData.destinationFee
                        } ${convertText(destination.currency, "enToFa")}`}
                  </td>
                  <td className="text-center">
                    {`${resultData.destinationAmount} ${convertText(
                      destination.currency,
                      "enToFa",
                    )}`}
                  </td>
                </>
              )}
            </tr>
          </tbody>
        )}
      </table>

      {/* {isLodiang && (
                    <Skeleton loading={isLodiang} active={isLodiang} />
                  )}  */}
    </div>
  );
}
