import { convertText, rialToToman } from "helpers";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { CurrencyCode } from "types/wallet";

import CurrencyInput from "components/Input/CurrencyInput/newCurrencyInput";
import SelectCurrency from "components/Input/CurrencyInput/SelectCurrency";
import { currencyOptions } from "components/Input/CurrencyInput/SelectCurrency/constant";

import buy from "assets/scss/dashboard/buy-sell.module.scss";
import exchange from "assets/scss/dashboard/exchange.module.scss";
import { CiWallet } from "react-icons/ci";
import { BsTag } from "react-icons/bs";
import {
  useCreateCurrencySwapMutation,
  useLazyRatesQuery,
  useWalletsQuery,
} from "store/api/exchange-management";
import WageTable from "./ExchangeForm/WageTable";
import { useLocation } from "react-router-dom";

type Props = {
  setIsOpenDialog: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      currency: CurrencyCode;
    }>
  >;
};

export default function NewExchangeForm({ setIsOpenDialog }: Props) {
  const { state } = useLocation();

  console.log(state);

  const [source, setSource] = useState<{
    amount: number;
    currency: CurrencyCode;
  }>({
    amount: state?.source?.amount || 0,
    currency: state?.source?.currency || "IRR",
  });
  const [destination, setDestination] = useState<{
    amount: number;
    currency: CurrencyCode;
  }>({
    amount: state?.destination?.amount || 0,
    currency: state?.destination?.currency || "TRY",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { data: wallets, isLoading: isLoadingWallet } = useWalletsQuery();
  const [getRate, { data: exchangeRate }] = useLazyRatesQuery();
  const [currencySwap, { isLoading: isLoadingSwap, isSuccess }] =
    useCreateCurrencySwapMutation();

  useEffect(() => {
    setIsLoading(isLoadingWallet || isLoadingSwap);
  }, [isLoadingWallet, isLoadingSwap]);

  useEffect(() => {
    getRate({
      sourceCurrencyCode: source.currency,
      targetCurrencyCode: destination.currency,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source.currency, destination.currency]);

  const handleStock = (currency: CurrencyCode) => {
    if (wallets) {
      const currentWallet = wallets?.find((w) => w.currencyCode === currency);

      const stock =
        currency === "IRR"
          ? rialToToman(currentWallet.availableBalance)
          : currentWallet.availableBalance;
      return (
        Number(stock).toLocaleString() + " " + convertText(currency, "enToFa")
      );
    }
    return 0;
  };

  const handleRate = (currency: CurrencyCode) => {
    const rate =
      currency === "IRR"
        ? rialToToman(exchangeRate?.rate as string)
        : exchangeRate?.rate;
    return rate?.toLocaleString() + " " + convertText(currency, "enToFa");
  };

  return (
    <Card className="card-secondary currency-exchange">
      <CardHeader>
        <Row>
          <div className="card-back col-lg-6">
            <a className="">
              <span className="icon">
                <MdOutlineKeyboardArrowRight color="black" />
              </span>
              معامله سریع
            </a>
          </div>
          <Col
            xs={12}
            lg={6}
            className="card-action justify-content-end d-flex"
          >
            <Button
              color="primary"
              outline
              className="px-4 "
              size="sm"
              onClick={() =>
                setIsOpenDialog({
                  isOpen: true,
                  currency: source.currency,
                })
              }
            >
              واریز {convertText(source.currency, "enToFa")}
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Form>
          <div className={exchange["currency-controls"]}>
            <div className={exchange["currency-controls__group"]}>
              <Label htmlFor="source">پرداخت می‌کنید:</Label>
              <div>
                <CurrencyInput
                  thousandSeparator=","
                  value={source.amount}
                  onKeyUp={() => {
                    const amount =
                      source.currency === "IRR"
                        ? source.amount * 10
                        : source.amount;
                    const res =
                      destination.currency === "IRR"
                        ? (Number(exchangeRate?.rate) * amount) / 10
                        : Number(exchangeRate?.rate) * amount;
                    setDestination({
                      ...destination,
                      amount: Math.round(res),
                    });
                  }}
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
                        setDestination({
                          amount: 0,
                          currency: filter?.value,
                        });
                    } else setDestination({ ...destination, amount: 0 });
                  }}
                />
              </div>
              <div className={exchange.detail}>
                {isLoading ? (
                  <div className="text-center placeholder-glow d-flex justify-content-between w-100">
                    <div className="placeholder col-11 bg-secondary rounded py-2" />
                  </div>
                ) : (
                  <div>
                    <CiWallet />
                    <span className="title">موجودی: </span>

                    <span className="value">
                      {handleStock(source.currency)}
                    </span>
                  </div>
                )}
                {isLoading ? (
                  <div className="text-center placeholder-glow d-flex justify-content-between w-100">
                    <div className="placeholder col-11 bg-secondary rounded py-2" />
                  </div>
                ) : (
                  <div>
                    <BsTag />
                    <span className="title">
                      نرخ {convertText(source.currency, "enToFa")} :
                    </span>
                    <span className="value">
                      {handleRate(destination.currency)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className={exchange.divider}>
              <span className="mb-5">
                <svg
                  width="19"
                  height="17"
                  viewBox="0 0 19 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 5H1L5 1"
                    stroke="#03041B"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M1 12L18 12L14 16"
                    stroke="#03041B"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </span>
            </div>
            <div className={exchange["currency-controls__group"]}>
              <Label htmlFor="destination">دریافت می‌کنید:</Label>
              <div>
                <CurrencyInput
                  thousandSeparator=","
                  value={destination.amount}
                  onKeyUp={() => {
                    const amount =
                      destination.currency === "IRR"
                        ? destination.amount * 10
                        : destination.amount;
                    const res =
                      source.currency === "IRR"
                        ? amount / Number(exchangeRate?.rate) / 10
                        : amount / Number(exchangeRate?.rate);
                    setSource({
                      ...source,
                      amount: Math.round(res),
                    });
                  }}
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
              <div className={exchange.detail}>
                {isLoading ? (
                  <div className="text-center placeholder-glow d-flex justify-content-between w-100">
                    <div className="placeholder col-11 bg-secondary rounded py-2" />
                  </div>
                ) : (
                  <div>
                    <CiWallet />
                    <span className="title">موجودی: </span>

                    <span className="value">
                      {handleStock(destination.currency)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Row>
            <Col xs={12}>
              {" "}
              <WageTable source={source} destination={destination} />
            </Col>
          </Row>
          <div className={buy.currencyExchangeAction}>
            <Button
              disabled={isLoading}
              type="button"
              color="primary"
              outline
              className="px-5 py-3"
              onClick={() => {
                currencySwap({
                  isDry: false,
                  data: {
                    sourceCurrencyCode: source.currency,
                    sourceAmount:
                      source.currency === "IRR"
                        ? (Number(source.amount) * 10).toString()
                        : source.amount.toString(),
                    destinationCurrencyCode: destination.currency,
                    feeCurrencyCode: source.currency,
                  },
                });
              }}
            >
              {isLoading ? <Spinner /> : "ثبت نهایی سفارش"}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
