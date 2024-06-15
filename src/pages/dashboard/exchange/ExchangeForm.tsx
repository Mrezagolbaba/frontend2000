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
import {
  useCreateCurrencySwapMutation,
  useLazyRatesQuery,
} from "store/api/exchange-management";
import CurrencyInput from "components/Input/CurrencyInput/newCurrencyInput";
import Notify from "components/Notify";
import RatePlace from "./RatePlace";
import React, { useCallback, useEffect, useState } from "react";
import SelectCurrency from "components/Input/CurrencyInput/SelectCurrency";
import WageTable from "./WageTable";
import { CurrencyCode } from "types/wallet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { convertText, persianToEnglishNumbers } from "helpers";
import { currencyOptions } from "components/Input/CurrencyInput/SelectCurrency/constant";
import { isEmpty } from "lodash";
import { useWalletsQuery } from "store/api/wallet-management";

import exchange from "assets/scss/dashboard/exchange.module.scss";
import buy from "assets/scss/dashboard/buy-sell.module.scss";
import ExchangeIcon from "components/Icons/ExchangeIcon";

type Props = {
  setIsOpenDialog: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      currency: CurrencyCode;
    }>
  >;
};

export default function ExchangeForm({ setIsOpenDialog }: Props) {
  // ==============|| States ||================= //
  const [sourceStock, setSourceStock] = useState("0");
  // ==============|| Hooks ||================= //
  const { state } = useLocation();
  const navigate = useNavigate();
  const { data: wallets, isLoading: isLoadingWallet } = useWalletsQuery();
  const [
    currencySwap,
    { data: swap, isLoading: isLoadingSwap, isSuccess: successSwap },
  ] = useCreateCurrencySwapMutation();
  const [
    reversCurrencySwap,
    {
      data: reversSwap,
      isLoading: isLoadingReverseSwap,
      isSuccess: successReverseSwap,
    },
  ] = useCreateCurrencySwapMutation();
  const [getRate, { data: exchangeRate, isFetching: fetchingRate }] =
    useLazyRatesQuery();
  const [getUsdtRate, { data: usdtRate, isSuccess: usdtRateSuccess }] =
    useLazyRatesQuery();

  // ==============|| States ||================= //
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
  const [feeCurrencyCode, setFeeCurrencyCode] = useState<CurrencyCode>("IRR");
  const [error, setError] = useState({ source: false, destination: false });
  const [transactions, setTransaction] = useState<any>(null);
  const [isSubmit, setIsSubmit] = useState(false);

  // ==============|| Handlers ||================= //
  const handleSwap = useCallback(
    (type: "source" | "destination", value) => {
      if (isEmpty(value)) {
        setSource((prev) => ({ ...prev, amount: 0 }));
        setDestination((prev) => ({ ...prev, amount: 0 }));
      }
      if (type === "source") {
        currencySwap({
          isDry: true,
          data: {
            sourceCurrencyCode: source.currency,
            sourceAmount:
              source.currency === "IRR"
                ? (Number(value) * 10).toString()
                : value.toString(),
            destinationCurrencyCode: destination.currency,
            feeCurrencyCode: feeCurrencyCode,
          },
        });
      } else if (type === "destination") {
        reversCurrencySwap({
          isDry: true,
          data: {
            sourceCurrencyCode: destination.currency,
            sourceAmount:
              destination.currency === "IRR"
                ? (Number(value) * 10).toString()
                : value.toString(),
            destinationCurrencyCode: source.currency,
            feeCurrencyCode: feeCurrencyCode,
          },
        });
      }
    },
    [
      currencySwap,
      destination.currency,
      feeCurrencyCode,
      reversCurrencySwap,
      source.currency,
    ],
  );
  const handleSubmit = useCallback(() => {
    const sourceWalletWallet = wallets?.find(
      (w) => w.currencyCode === source.currency,
    );
    const min =
      source.currency === "IRR"
        ? ((Number(usdtRate?.rate) * 3) / 10).toFixed(0)
        : source.currency === "TRY"
          ? (Number(usdtRate?.rate) * 3).toPrecision(6)
          : "3";

    if (Number(sourceWalletWallet?.availableBalance) < source.amount) {
      setError({ ...error, source: true });
      Notify({
        type: "error",
        text: "مبلغ مورد نظر شما از موجودی قابل برداشت تان بیشتر است.",
      });
    } else if (
      (!usdtRateSuccess && source.currency !== "USDT") ||
      source.amount < Number(min)
    ) {
      setError({ ...error, source: true });
      Notify({
        type: "error",
        text: `حداقل مبلغ معامله ${Number(min).toLocaleString()} ${convertText(source.currency, "enToFa")} می باشد.`,
      });
    } else {
      setIsSubmit(true);
      currencySwap({
        isDry: false,
        data: {
          sourceCurrencyCode: source.currency,
          sourceAmount:
            source.currency === "IRR"
              ? (Number(source.amount) * 10).toString()
              : source.amount.toString(),
          destinationCurrencyCode: destination.currency,
          feeCurrencyCode: feeCurrencyCode,
        },
      });
    }
  }, [
    currencySwap,
    destination.currency,
    error,
    feeCurrencyCode,
    source,
    usdtRate?.rate,
    usdtRateSuccess,
    wallets,
  ]);
  const initPageRout = useCallback(() => {
    if (state?.source && state.source.amount > 0)
      currencySwap({
        isDry: true,
        data: {
          sourceCurrencyCode: state?.source?.currency,
          sourceAmount:
            state.source.currency === "IRR"
              ? (Number(state?.source?.amount) * 10).toString()
              : state?.source?.amount.toString(),
          destinationCurrencyCode: state.destination.currency,
          feeCurrencyCode: state.source.currency,
        },
      });
  }, [currencySwap, state]);
  const ratesHandler = useCallback(() => {
    getRate({
      sourceCurrencyCode: source.currency,
      targetCurrencyCode: destination.currency,
    });

    source.currency !== "USDT" &&
      getUsdtRate({
        sourceCurrencyCode: "USDT",
        targetCurrencyCode: source.currency,
      });
  }, [destination.currency, getRate, getUsdtRate, source.currency]);

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    if (successSwap && isSubmit && swap?.id) {
      navigate(`/dashboard/invoice/${swap?.id}`);
    }
  }, [isSubmit, successSwap, navigate, swap?.id]);

  useEffect(() => {
    initPageRout();
  }, [initPageRout]);

  useEffect(() => {
    ratesHandler();
  }, [ratesHandler]);

  useEffect(() => {
    if (successSwap) {
      const newSourceAmount =
        swap.sourceCurrencyCode === "IRR"
          ? Number(swap.sourceAmount) / 10
          : Number(swap.sourceAmount);
      const newDestinationAmount =
        swap.destinationCurrencyCode === "IRR"
          ? Number(swap.destinationAmount) / 10
          : Number(swap.destinationAmount);

      setSource((prevState) => ({
        ...prevState,
        amount: newSourceAmount,
      }));
      setDestination((prevState) => ({
        ...prevState,
        amount: newDestinationAmount,
      }));
      setTransaction(swap);
    }
  }, [successSwap, swap]);

  useEffect(() => {
    if (successReverseSwap) {
      const amountTemp = persianToEnglishNumbers(reversSwap.destinationAmount);
      handleSwap("source", Number(amountTemp) / 10);
    }
  }, [successReverseSwap, reversSwap, handleSwap]);

  // ==============|| Render ||================= //
  return (
    <Card className="card-secondary currency-exchange">
      <CardHeader>
        <Row>
          <div className="card-back col-lg-6">
            <Link className="btn btn-link" to="/dashboard/wallet">
              <span className="icon">
                <MdOutlineKeyboardArrowRight color="black" />
              </span>
              معامله سریع
            </Link>
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
              {isLoadingReverseSwap ? (
                <div
                  className="text-center placeholder-glow d-flex justify-content-between w-100"
                  style={{ height: "56px" }}
                >
                  <div className="placeholder col-11 bg-secondary rounded py-2" />
                </div>
              ) : (
                <div
                  className={`${exchange["input-holder"]} ${error.source ? exchange["is-invalid"] : ""}`}
                >
                  <CurrencyInput
                    thousandSeparator=","
                    decimalSeparator="."
                    value={source.amount}
                    onKeyUp={(e: any) => {
                      setError((prevState) => ({
                        ...prevState,
                        source: false,
                      }));
                      const amountTemp = e.target.value.replaceAll(",", "");
                      handleSwap("source", persianToEnglishNumbers(amountTemp));
                    }}
                    decimalScale={
                      source.currency === "IRR"
                        ? 0
                        : source.currency === "TRY"
                          ? 2
                          : 6
                    }
                  />
                  <SelectCurrency
                    value={source.currency}
                    onChange={(option) => {
                      setError({ ...error, source: false });
                      setFeeCurrencyCode(option.value);
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
              )}

              <RatePlace
                source={source}
                destination={destination}
                type="source"
                showRate={true}
                isLoading={isLoadingWallet || fetchingRate}
                wallets={wallets}
                setStock={setSourceStock}
                rate={exchangeRate?.rate as string}
              />
            </div>
            <div className={exchange.divider}>
              <span
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
              <Label htmlFor="destination">دریافت می‌کنید:</Label>
              {isLoadingSwap ? (
                <div
                  className="text-center placeholder-glow d-flex justify-content-between w-100"
                  style={{ height: "56px" }}
                >
                  <div className="placeholder col-11 bg-secondary rounded py-2" />
                </div>
              ) : (
                <div className={exchange["input-holder"]}>
                  <CurrencyInput
                    thousandSeparator=","
                    value={destination.amount}
                    onKeyUp={(e: any) => {
                      setError((prevState) => ({
                        ...prevState,
                        destination: false,
                      }));
                      const amountTemp = e.target.value.replaceAll(",", "");

                      handleSwap(
                        "destination",
                        persianToEnglishNumbers(amountTemp),
                      );
                    }}
                    decimalScale={
                      destination.currency === "IRR"
                        ? 0
                        : destination.currency === "TRY"
                          ? 2
                          : 6
                    }
                  />
                  <SelectCurrency
                    value={destination.currency}
                    onChange={(option) => {
                      setDestination({
                        amount: 0,
                        currency: option.value,
                      });
                      setFeeCurrencyCode(option.value);

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
              )}
              <RatePlace
                source={source}
                destination={destination}
                isLoading={isLoadingWallet || fetchingRate}
                type="destination"
                wallets={wallets}
                rate={exchangeRate?.rate as string}
              />
            </div>
          </div>
          <Row>
            <Col xs={12}>
              <WageTable
                sourceStock={sourceStock}
                isLoading={isLoadingSwap || isLoadingReverseSwap}
                sourceCode={source.currency}
                destinationCode={destination.currency}
                data={transactions}
                setFeeCurrencyCode={setFeeCurrencyCode}
                feeCurrencyCode={feeCurrencyCode}
              />
            </Col>
          </Row>
          <div className={buy.currencyExchangeAction}>
            <Button
              disabled={
                isLoadingWallet || isLoadingSwap || isLoadingReverseSwap
              }
              type="button"
              color="primary"
              outline
              className="px-5 py-3"
              onClick={handleSubmit}
            >
              {isLoadingWallet || isLoadingSwap || isLoadingReverseSwap ? (
                <Spinner />
              ) : (
                "ثبت نهایی سفارش"
              )}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
