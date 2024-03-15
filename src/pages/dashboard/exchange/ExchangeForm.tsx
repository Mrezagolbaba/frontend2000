import { convertText, persianToEnglishNumbers } from "helpers";
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
import { isEmpty } from "lodash";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { CurrencyCode } from "types/wallet";
import CurrencyInput from "components/Input/CurrencyInput/newCurrencyInput";
import SelectCurrency from "components/Input/CurrencyInput/SelectCurrency";
import { currencyOptions } from "components/Input/CurrencyInput/SelectCurrency/constant";
import {
  useCreateCurrencySwapMutation,
  useLazyRatesQuery,
  useWalletsQuery,
} from "store/api/exchange-management";
import WageTable from "./WageTable";
import RatePlace from "./RatePlace";

import exchange from "assets/scss/dashboard/exchange.module.scss";
import buy from "assets/scss/dashboard/buy-sell.module.scss";

type Props = {
  setIsOpenDialog: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      currency: CurrencyCode;
    }>
  >;
};

export default function ExchangeForm({ setIsOpenDialog }: Props) {
  //hooks
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
  const [getRate, { data: exchangeRate }] = useLazyRatesQuery();
  const [getReverseRate, { data: exchangeReverseRate }] = useLazyRatesQuery();
  const [getUsdtRate, { data: usdtRate, isSuccess: usdtRateSuccess }] =
    useLazyRatesQuery();

  //states
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

  //handlers
  const handleSwap = (type: "source" | "destination", value) => {
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
  };
  const handleSubmit = () => {
    const sourceWalletWallet = wallets?.find(
      (w) => w.currencyCode === source.currency,
    );
    const min = ((Number(usdtRate?.rate) * 3) / 10).toFixed(0);

    if (Number(sourceWalletWallet?.availableBalance) < source.amount) {
      setError({ ...error, source: true });
      toast.error("مبلغ مورد نظر شما از موجودی قابل برداشت تان بیشتر است.", {
        position: "bottom-left",
      });
    } else if (!usdtRateSuccess || source.amount < Number(min)) {
      setError({ ...error, source: true });
      toast.error(
        `حداقل مبلغ معامله ${Number(min).toLocaleString()}  می باشد.`,
        { position: "bottom-left" },
      );
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
  };

  useEffect(() => {
    if (successSwap && isSubmit) {
      navigate(`/dashboard/invoice/${swap?.id}`);
    }
  }, [isSubmit, successSwap, navigate, swap?.id]);

  //life-cycle
  useEffect(() => {
    getRate({
      sourceCurrencyCode: source.currency,
      targetCurrencyCode: destination.currency,
    });
    getReverseRate({
      sourceCurrencyCode: destination.currency,
      targetCurrencyCode: source.currency,
    });
    getUsdtRate({
      sourceCurrencyCode: "USDT",
      targetCurrencyCode: source.currency,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source.currency, destination.currency]);

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
      const newSourceAmount =
        reversSwap.sourceCurrencyCode === "IRR"
          ? Number(reversSwap.sourceAmount) / 10
          : Number(reversSwap.sourceAmount);
      const newDestinationAmount =
        reversSwap.destinationCurrencyCode === "IRR"
          ? Number(reversSwap.destinationAmount) / 10
          : Number(reversSwap.destinationAmount);
      setSource((prevState) => ({
        ...prevState,
        amount: newDestinationAmount,
      }));
      setDestination((prevState) => ({
        ...prevState,
        amount: newSourceAmount,
      }));
    }
    setTransaction(reversSwap);
  }, [successReverseSwap, reversSwap]);

  //render
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
                isLoading={isLoadingWallet}
                wallets={wallets}
                rate={exchangeRate?.rate as string}
                reverseRate={exchangeReverseRate?.rate as string}
              />
            </div>
            <div className={exchange.divider}>
              <span>
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
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M1 12L18 12L14 16"
                    stroke="#03041B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
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
                isLoading={isLoadingWallet}
                type="destination"
                wallets={wallets}
                rate={exchangeRate?.rate as string}
                reverseRate={exchangeReverseRate?.rate as string}
              />
            </div>
          </div>
          <Row>
            <Col xs={12}>
              <WageTable
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
