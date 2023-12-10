import { Col, Input, Row } from "reactstrap";
import { convertText } from "helpers";
import { useExchangeContext } from "../ContextProvider";

import buy from "assets/scss/dashboard/buy-sell.module.scss";

type Props = {
  isLoading?: boolean;
};
export default function WageTable({ isLoading = false }: Props) {
  const { exchangeContext, setExchangeContext } = useExchangeContext();

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
                        checked={
                          exchangeContext.commission.currencyReference ===
                          "source"
                        }
                        onChange={() => {
                          setExchangeContext({
                            ...exchangeContext,
                            commission: {
                              ...exchangeContext.commission,
                              currencyReference: "source",
                            },
                          });
                        }}
                      />
                      <label>
                        {convertText(exchangeContext.source.currency, "enToFa")}
                      </label>
                    </div>
                  </Col>
                  <Col lg={5} xs={6}>
                    <div className="radio-toggle-control">
                      <Input
                        type="radio"
                        name="rtc"
                        id="rtc2"
                        className="m-2"
                        checked={
                          exchangeContext.commission.currencyReference ===
                          "destination"
                        }
                        onChange={() => {
                          setExchangeContext({
                            ...exchangeContext,
                            commission: {
                              ...exchangeContext.commission,
                              currencyReference: "destination",
                            },
                          });
                        }}
                      />
                      <label>
                        {convertText(
                          exchangeContext.destination.currency,
                          "enToFa"
                        )}
                      </label>
                    </div>
                  </Col>
                </Row>
              </td>
              <td className="text-center">
                {exchangeContext.commission.currencyReference === "source"
                  ? `${exchangeContext.commission.sourceFeePercent}٪ معادل ${
                      exchangeContext.commission.sourceFee
                    } ${convertText(exchangeContext.source.currency, "enToFa")}`
                  : `${
                      exchangeContext.commission.destinationFeePercent
                    }٪ معادل ${
                      exchangeContext.commission.destinationFee
                    } ${convertText(
                      exchangeContext.destination.currency,
                      "enToFa"
                    )}`}
              </td>
              <td className="text-center">
                {exchangeContext.commission.currencyReference === "source"
                  ? `${
                      exchangeContext.commission.destinationAmount
                    } ${convertText(
                      exchangeContext.destination.currency,
                      "enToFa"
                    )}`
                  : `${
                      exchangeContext.commission.destinationAmount
                    } ${convertText(
                      exchangeContext.destination.currency,
                      "enToFa"
                    )}`}
              </td>
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
