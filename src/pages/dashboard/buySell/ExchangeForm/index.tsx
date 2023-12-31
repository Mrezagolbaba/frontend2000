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
import { exchangeRate, exchangeReq } from "services/exchange";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { convertText } from "helpers";

import buy from "assets/scss/dashboard/buy-sell.module.scss";
import { useNavigate } from "react-router-dom";
import { setInvoice } from "store/reducers/features/invoice/invoiceSlice";
import { AlertDanger } from "components/AlertWidget";

type Props = {
  setIsOpenDialog: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      currency: "IRR" | "USDT" | "TRY";
    }>
  >;
};

export default function ExchangeForm({ setIsOpenDialog }: Props) {
  const redirect = useNavigate();
  const { exchangeContext, setExchangeContext } = useExchangeContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    if (
      exchangeContext.source.currency === exchangeContext.destination.currency
    ) {
      toast.error("دو ارز یکسان قابل معامله نیستند", {
        position: "bottom-left",
      });
    }
    if (
      Number(exchangeContext.source.amount) > 0 ||
      Number(exchangeContext.destination.amount) > 0
    ) {
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
          toast.success("تبدیل ارز با موفقیت انجام شد.", {
            position: "bottom-left",
          });
          setExchangeContext(initExchangeContext);
          redirect("/dashboard/invoice", { state: res });
          setInvoice(res);
        }
        setIsLoading(false);
      } catch (error) {}
    } else if (!dry) {
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
    if (
      exchangeContext.source.currency === exchangeContext.destination.currency
    ) {
      toast.error("دو ارز یکسان قابل معامله نیستند", {
        position: "bottom-left",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeContext.source.currency, exchangeContext.destination.currency]);

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
                  currency: exchangeContext.source.currency,
                })
              }
            >
              واریز {convertText(exchangeContext.source.currency, "enToFa")}
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Form className={buy["formContainer"]}>
          <Row style={{ justifyContent: "center" }}>
            <Col xs={6}>
              <div className="currency-exchange__control-group">
                <label className="form-label">پرداخت می‌کنید:</label>
                <ExchangeInput
                  name="source"
                  otherSide="destination"
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
                  otherSide="source"
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
