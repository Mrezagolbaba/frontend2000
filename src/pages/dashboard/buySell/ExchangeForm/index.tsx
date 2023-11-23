import ExchangeInput from "./ExchangeInput";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Row,
  Spinner,
} from "reactstrap";
import WageTable from "./WageTable";
import { initExchangeContext, useExchangeContext } from "../ContextProvider";
import { useList } from "@refinedev/core";
import toast from "react-hot-toast";
import { exchangeRate, exchangeReq } from "services/currencySwap";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { convertText } from "helpers";

import buy from "assets/scss/dashboard/buy-sell.module.scss";

type Props = {
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ExchangeForm({ setIsOpenDialog }: Props) {
  const { exchangeContext, setExchangeContext } = useExchangeContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: wallets, refetch } = useList({
    resource: `wallets`,
  });

  const onSubmit = async (dry: boolean) => {
    const currencyReference = exchangeContext.commission.currencyReference;
    const data = {
      sourceCurrencyCode: exchangeContext.source.currency,
      sourceAmount:
        exchangeContext.source.currency === "IRR"
          ? (Number(exchangeContext.source.amount) * 10).toString()
          : exchangeContext.source.amount,
      destinationCurrencyCode: exchangeContext.destination.currency,
      feeCurrencyCode: exchangeContext[currencyReference].currency,
    };

    if (Number(exchangeContext.source.amount) > 0) {
      setIsLoading(true);
      try {
        const res = await exchangeReq({ ...data, dry_run: dry });
        if (dry) {
          setExchangeContext({
            ...exchangeContext,
            destination: {
              ...exchangeContext.destination,
              amount: res?.destinationAmount,
            },
            commission: {
              ...exchangeContext.commission,
              sourceFee: res.transactions[0].fee,
              destinationFee: res.transactions[1].fee,
              sourceFeePercent: Number(res.transactions[0].fees[1].value) * 100,
              destinationFeePercent:
                Number(res.transactions[1].fees[1].value) * 100,
              destinationAmount:
                Number(res.transactions[1].amount) -
                Number(res.transactions[1].fee),
            },
          });
        } else {
          refetch();
          toast.success("تبدیل ارز با موفقیت انجام شد.", {
            position: "bottom-left",
          });
          setExchangeContext(initExchangeContext);
        }
        setIsLoading(false);
      } catch (error) {}
    } else {
      toast.error("لطفا مبلغ مورد نظر خود برای تبدیل را انتخاب کنید.", {
        position: "bottom-left",
      });
    }
  };

  const handleRate = async () => {
    setIsLoading(true);
    await exchangeRate({
      sourceCode: exchangeContext.destination.currency,
      destinationCode: exchangeContext.source.currency,
    })
      .then((res) => {
        setExchangeContext({
          ...exchangeContext,
          rate: res.rate,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        // if (err.response.status) {
        //   setError("از یک ارز یکسان نمی توانید استفاده کنید.");
        // }
      });

    setIsLoading(false);
  };

  useEffect(() => {
    handleRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeContext.source.currency, exchangeContext.destination.currency]);

  useEffect(() => {
    if (wallets && wallets.data) {
      const source = wallets.data.find(
        (wallet) => wallet.currencyCode === exchangeContext.source.currency
      );
      const destination = wallets.data.find(
        (wallet) => wallet.currencyCode === exchangeContext.destination.currency
      );

      setExchangeContext({
        ...exchangeContext,
        source: {
          ...exchangeContext.source,
          stock: source?.availableBalance,
        },
        destination: {
          ...exchangeContext.destination,
          stock: destination?.availableBalance,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    wallets,
    exchangeContext.source.currency,
    exchangeContext.destination.currency,
  ]);

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
              onClick={() => setIsOpenDialog(true)}
            >
              واریز {convertText(exchangeContext.source.currency, "enToFa")}
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Form className={buy["formContainer"]}>
          {/* <Row>
                  {errors.pay && (
                    <Col xs={12}>
                      <AlertDanger
                        hasIcon
                        text={errors?.pay?.message}
                        key="amount-error"
                      />
                    </Col>
                  )}
                </Row> */}
          <Row style={{ justifyContent: "center" }}>
            <Col xs={6}>
              <div className="currency-exchange__control-group">
                <label className="form-label">پرداخت می‌کنید:</label>
                <ExchangeInput
                  name="source"
                  isLoading={isLoading}
                  onChange={() => {
                    onSubmit(true);
                  }}
                />
              </div>
            </Col>

            <Col xs={6}>
              <div className="currency-exchange__control-group">
                <label className="form-label">دریافت می‌کنید:</label>
                <ExchangeInput
                  name="destination"
                  isLoading={isLoading}
                  onChange={() => {
                    onSubmit(true);
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <WageTable isLoading={isLoading} />
            </Col>
          </Row>
          <div className={buy.currencyExchangeAction}>
            <Button
              disabled={isLoading}
              type="button"
              color="primary"
              outline
              className="px-5 py-3"
              onClick={() => onSubmit(false)}
            >
              {isLoading ? <Spinner /> : "ثبت نهایی سفارش"}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
