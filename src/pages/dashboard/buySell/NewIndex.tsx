import * as Yup from "yup";
import Dialog from "components/Dialog";
import ExchangeInput from "components/Input/ExchangeInput";
import React, { useState } from "react";
import { BsTag } from "react-icons/bs";
import { CiWallet } from "react-icons/ci";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Input,
  Row,
} from "reactstrap";
import { Controller, useForm as useRHF } from "react-hook-form";
import DepositCrypto from "pages/dashboard/wallet/Crypto/Deposit";

import buy from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useList } from "@refinedev/core";
import { convertIRRToToman, convertText } from "helpers";
import WageTable from "./WageTable";
import toast from "react-hot-toast";

type ExchangeFormType = {
  amount1: string;
  amount2: string;
};

const initialDetailIRR = {
  balance: "0",
  availableBalance: "0",
  currency: "IRR",
  ratePerIRR: 0,
};

const initialDetailTRY = {
  balance: "0",
  availableBalance: "0",
  currency: "TRY",
  ratePerIRR: 0,
};

const resolver = yupResolver(
  Yup.object().shape({
    amount1: Yup.string().required(),
    amount2: Yup.string().required(),
  })
);

export default function BuySell() {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [payInfo, setPayInfo] = useState(initialDetailIRR);
  const [passInfo, setPassInfo] = useState(initialDetailTRY);
  const [commissionCurrency, setCommissionCurrency] = useState<string>();
  const [commissions, setCommissions] = useState({
    pay: {
      amount: 0,
      currency: "",
    },
    pass: {
      amount: 0,
      currency: "",
    },
  });
  const {
    data: wallets,
    isSuccess,
    isLoading,
  } = useList({
    resource: `wallets`,
  });

  const { formLoading, onFinish: handleSwaps } = useForm({
    action: "create",
    resource: "currency-swaps?dry_run=true",
    onMutationSuccess: (data, variables, context, isAutoSave) => {
      console.log("looooooooooog", { data, variables, context, isAutoSave });
    },
  });

  const {
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useRHF<ExchangeFormType>({
    mode: "onChange",
    defaultValues: {
      amount1: "",
      amount2: "",
    },
    resolver,
  });

  const handleCommission = async () => {
    const payValue = getValues("amount1");

    console.log(payInfo, passInfo);
    if (!payValue) {
      toast.error("لطفا مقادیر را برای تبدیل وارد کنید");
      return;
    }
    if (payInfo.currency === passInfo.currency) {
      toast.error("نمیتوانید ارز یکسان را تبدیل کنید");
      return;
    }
    const data = {
      sourceCurrencyCode: convertText(payInfo.currency, "faToEn"),
      sourceAmount: payValue,
      destinationCurrencyCode: convertText(passInfo.currency, "faToEn"),
      feeCurrencyCode: convertText(payInfo.currency, "faToEn"),
    };

    await handleSwaps(data);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const handlePayInfo = (data: any) => {
    if (data.currencyCode === "IRR") {
      setPayInfo({
        balance: data?.balance ?? "0",
        availableBalance: data?.availableBalance ?? "0",
        currency: convertText(data?.currencyCode, "enToFa") ?? "",
        ratePerIRR: 1,
      });
      return;
    }
  };

  const handlePassInfo = (data: any) => {
    if (data.currencyCode === "IRR") {
      setPassInfo({
        balance: data?.balance ?? "0",
        availableBalance: data?.availableBalance ?? "0",
        currency: convertText(data?.currencyCode, "enToFa") ?? "",
        ratePerIRR: 1,
      });
      return;
    }
  };

  const handleSelectAsset = (value: string, action: string) => {
    reset({ amount1: "", amount2: "" });
    const data =
      wallets && wallets.data.length > 0
        ? wallets.data.find((item: any) => item.currencyCode === value)
        : null;
    setCommissionCurrency(value);
    if (action === "pay" && data) {
      handlePayInfo(data);
    } else if (action === "pass" && data) {
      handlePassInfo(data);
    }
  };

  return (
    <section className="page page-wallet">
      <Row className="g-4">
        <Col xxl={7} xs={12}>
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
                    className="px-4"
                    onClick={() => setIsOpenDialog(true)}
                  >
                    واریز {convertText(payInfo.currency, "enToFa")}
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form
                onSubmit={handleSubmit(onSubmit)}
                className={buy["formContainer"]}
              >
                <Row style={{ justifyContent: "center" }}>
                  <Col xs={6}>
                    <Controller
                      control={control}
                      name="amount1"
                      render={({ field: { name, value, onChange } }) => (
                        <div className="currency-exchange__control-group">
                          <label className="form-label">پرداخت می‌کنید:</label>
                          <ExchangeInput
                            name={name}
                            value={value}
                            onChange={(e) => {
                              onChange(e);
                              handleCommission();
                            }}
                            defaultCurrency={initialDetailIRR.currency}
                            wallets={wallets?.data}
                            onChangeCoin={(val) =>
                              handleSelectAsset(val, "pay")
                            }
                          />
                          {/* <div className={buy.amount}>
                            <div>
                              <CiWallet />
                              <span className="title">موجودی در دسترس: </span>
                              <span className="value">
                                {payInfo.availableBalance}
                                {convertText(payInfo.currency, "enToFa")}
                              </span>
                            </div>
                            <div>
                              <BsTag />
                              <span className="title">
                                نرخ {convertText(payInfo.currency, "enToFa")} :
                              </span>
                              <span className="value">
                                {convertIRRToToman(payInfo.ratePerIRR)} تومان
                              </span>
                            </div>
                          </div> */}
                        </div>
                      )}
                    />
                    {/* On extra small screens, take up the full width */}
                  </Col>
                  {/* <Col lg={1} xs={12} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TbArrowsExchange2 size={30} />
                  </Col> */}
                  <Col xs={6}>
                    <Controller
                      control={control}
                      name="amount2"
                      render={({ field: { name, value, onChange } }) => (
                        <div className="currency-exchange__control-group">
                          <label className="form-label">دریافت می‌کنید:</label>
                          <ExchangeInput
                            name={name}
                            value={value}
                            onChange={(e) => {
                              onChange(e);
                              handleCommission();
                            }}
                            defaultCurrency={initialDetailTRY.currency}
                            wallets={wallets?.data}
                            onChangeCoin={(val) =>
                              handleSelectAsset(val, "pass")
                            }
                          />
                          {/* <div className={buy.amount}>
                            <div>
                              <CiWallet />
                              <span className="title">موجودی در دسترس: </span>
                              <span className="value">
                                {Number(
                                  passInfo.availableBalance
                                ).toLocaleString("IRR")}
                                {convertText(passInfo.currency, "enToFa")}
                              </span>
                            </div>
                            <div>
                              <BsTag />
                              <span className="title">
                                نرخ {convertText(passInfo.currency, "enToFa")} :
                              </span>
                              <span className="value">
                                {passInfo.ratePerIRR} تومان
                              </span>
                            </div>
                          </div> */}
                        </div>
                      )}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <WageTable
                      commissionCurrency={commissionCurrency}
                      setCommissionCurrency={setCommissionCurrency}
                      payInfo={payInfo}
                      passInfo={passInfo}
                      commissions={commissions}
                      passValue={getValues("amount2")}
                    />
                  </Col>
                </Row>
                <div className={buy.currencyExchangeAction}>
                  <Button
                    type="submit"
                    color="primary"
                    outline
                    className="px-5 py-3"
                    // onClick={handleExchange}
                  >
                    ثبت نهایی سفارش{" "}
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Dialog
        title="واریز تتر"
        isOpen={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
        hasCloseButton
      >
        <DepositCrypto onClose={() => setIsOpenDialog(false)} currency="USDT" />
      </Dialog>
    </section>
  );
}
