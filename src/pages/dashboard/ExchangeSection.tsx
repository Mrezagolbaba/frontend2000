import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle, Form, Label } from "reactstrap";

import { useLazyRatesQuery } from "store/api/exchange-management";
import { CurrencyCode } from "types/wallet";
import CurrencyInput from "components/Input/CurrencyInput/newCurrencyInput";
import SelectCurrency from "components/Input/CurrencyInput/SelectCurrency";
import { currencyOptions } from "components/Input/CurrencyInput/SelectCurrency/constant";

import exchange from "assets/scss/dashboard/exchange.module.scss";
import ExchangeIcon from "components/Icons/ExchangeIcon";

export default function ExchangeSection() {
  const navigate = useNavigate();

  const [source, setSource] = useState<{
    amount: number;
    currency: CurrencyCode;
  }>({ amount: 0, currency: "IRR" });
  const [destination, setDestination] = useState<{
    amount: number;
    currency: CurrencyCode;
  }>({
    amount: 0,
    currency: "TRY",
  });

  const [getRate, { data: currencyRes }] = useLazyRatesQuery();
  const [getReverseRate, { data: currencyReverseRes }] = useLazyRatesQuery();

  useEffect(() => {
    // const intervalId = setInterval(() => {
    getRate({
      sourceCurrencyCode: source.currency,
      targetCurrencyCode: destination.currency,
    });

    getReverseRate({
      sourceCurrencyCode: destination.currency,
      targetCurrencyCode: source.currency,
    });
    // }, 5000); // 5 seconds in milliseconds

    // // Clean up the interval when the component is unmounted
    // return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source.currency, destination.currency]);

  return (
    <Card className="h-100">
      <CardHeader>
        <CardTitle tag="h5">خرید و فروش</CardTitle>
      </CardHeader>
      <CardBody>
        <Form action="">
          <div className={exchange["currency-controls"]}>
            <div className={exchange["currency-controls__group"]}>
              <Label htmlFor="source">پرداخت می‌کنید:</Label>
              <div className={exchange["input-holder"]}>
                <CurrencyInput
                  thousandSeparator=","
                  value={source.amount}
                  onKeyUp={(e) => {
                    e.preventDefault();
                    const amount =
                      source.currency === "IRR"
                        ? source.amount * 10
                        : source.amount;
                    const res =
                      destination.currency === "IRR"
                        ? (Number(currencyRes?.rate) * amount) / 10
                        : Number(currencyRes?.rate) * amount;
                    setDestination({
                      ...destination,
                      amount: res,
                    });
                  }}
                  decimalScale={
                    source.currency === "IRR"
                      ? 0
                      : source.currency === "TRY"
                        ? 3
                        : 6
                  }
                  onValueChange={(values) => {
                    const value = values.floatValue as number;
                    setSource({
                      ...source,
                      amount: value,
                    });
                  }}
                />
                <SelectCurrency
                  value={source.currency}
                  onChange={(option) => {
                    setSource({
                      amount: 0,
                      currency: option.value,
                    });

                    if (option.value === destination.currency) {
                      const filter = currencyOptions.find(
                        (item) => item.value !== option.value,
                      );
                      filter &&
                        setDestination({ amount: 0, currency: filter?.value });
                    } else setDestination({ ...destination, amount: 0 });
                  }}
                />
              </div>
            </div>
            <div className={exchange.divider}>
              <span
                style={{ marginBottom: 0 }}
                onClick={() => {
                  const newSource = destination;
                  const newDestination = source;
                  setSource(newSource);
                  setDestination(newDestination);
                }}
              >
                <ExchangeIcon />
              </span>
            </div>
            <div className={exchange["currency-controls__group"]}>
              <Label
                htmlFor="destination"
                className="form-label"
                style={{ color: "#03041b66" }}
              >
                دریافت می‌کنید:
              </Label>
              <div className={exchange["input-holder"]}>
                <CurrencyInput
                  thousandSeparator=","
                  value={destination.amount}
                  onKeyUp={(e) => {
                    e.preventDefault();
                    const amount =
                      destination.currency === "IRR"
                        ? destination.amount * 10
                        : destination.amount;
                    const res =
                      source.currency === "IRR"
                        ? (amount * Number(currencyReverseRes?.rate)) / 10
                        : amount * Number(currencyReverseRes?.rate);
                    setSource({
                      ...source,
                      amount: res,
                    });
                  }}
                  decimalScale={
                    destination.currency === "IRR"
                      ? 0
                      : destination.currency === "TRY"
                        ? 3
                        : 6
                  }
                  onValueChange={(values) => {
                    const value = values.floatValue as number;

                    setDestination({
                      ...destination,
                      amount: value,
                    });
                  }}
                />
                <SelectCurrency
                  value={destination.currency}
                  onChange={(option) => {
                    setDestination({
                      amount: 0,
                      currency: option.value,
                    });

                    if (option.value === source.currency) {
                      const filter = currencyOptions.find(
                        (item) => item.value !== option.value,
                      );
                      filter &&
                        setSource({ amount: 0, currency: filter?.value });
                    } else setSource({ ...source, amount: 0 });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 mb-4 d-flex align-items-center justify-content-center">
            <button
              onClick={() =>
                navigate(`/dashboard/exchange`, {
                  state: { source, destination },
                })
              }
              type="button"
              className="btn btn-primary"
              style={{ padding: "18px 70px" }}
            >
              ثبت و ادامه
            </button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
