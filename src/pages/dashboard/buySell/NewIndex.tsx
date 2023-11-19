import * as Yup from "yup";
import Dialog from "components/Dialog";
import ExchangeInput from "components/Input/ExchangeInput";
import React, { useEffect, useState } from "react";
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
import { AlertDanger } from "components/AlertWidget";

type ExchangeFormType = {
  pay: {
    amount: string | number;
    currency: string;
    rate?: number;
  };
  pass: {
    amount: string | number;
    currency: string;
    rate?: number;
  };
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
    pay: Yup.object({
      amount: Yup.lazy((val) =>
        typeof val === "string"
          ? Yup.string().required()
          : Yup.number().required()
      ),
      currency: Yup.string().required(),
    }),
    pass: Yup.object({
      amount: Yup.lazy((val) =>
        typeof val === "string"
          ? Yup.string().required()
          : Yup.number().required()
      ),
      currency: Yup.string().required(),
    }),
  })
);

export default function BuySell() {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

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
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useRHF<ExchangeFormType>({
    mode: "onChange",
    defaultValues: {
      pay: { currency: "IRR", amount: "", rate: undefined },
      pass: { currency: "TRY", amount: "", rate: undefined },
    },
    resolver,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleErrors = (name, text) => {
    setError(name, {
      type: "custom",
      message: text,
    });
    if (text === null) clearErrors(name);
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
                    واریز {convertText(getValues("pay").currency, "enToFa")}
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form
                onSubmit={handleSubmit(onSubmit)}
                className={buy["formContainer"]}
              >
                <Row>
                  {errors.pay && (
                    <Col xs={12}>
                      <AlertDanger
                        hasIcon
                        text={errors?.pay?.message}
                        key="amount-error"
                      />
                    </Col>
                  )}
                </Row>
                <Row style={{ justifyContent: "center" }}>
                  <Col xs={6}>
                    <Controller
                      control={control}
                      name="pay"
                      render={({ field: { name, value } }) => (
                        <div className="currency-exchange__control-group">
                          <label className="form-label">پرداخت می‌کنید:</label>
                          <ExchangeInput
                            name={name}
                            value={value.amount}
                            error={errors?.[name]}
                            onError={(text) => handleErrors(name, text)}
                            onChange={(val, currency, rate) => {
                              setValue("pay", {
                                amount: val,
                                currency: currency,
                                rate: rate,
                              });
                              const passValue = getValues("pass");
                              passValue &&
                                passValue.rate &&
                                setValue("pass", {
                                  ...passValue,
                                  amount: Number(val) * passValue.rate,
                                });
                            }}
                            currencyValue={value.currency}
                            wallet={wallets?.data.find(
                              (wallet) =>
                                wallet?.currencyCode === value.currency
                            )}
                          />
                        </div>
                      )}
                    />
                  </Col>

                  <Col xs={6}>
                    <Controller
                      control={control}
                      name="pass"
                      render={({ field: { name, value } }) => (
                        <div className="currency-exchange__control-group">
                          <label className="form-label">دریافت می‌کنید:</label>
                          <ExchangeInput
                            name={name}
                            value={value.amount}
                            error={errors?.[name]}
                            // onError={(text) => handleErrors(name, text)}
                            onChange={(val, currency, rate) => {
                              setValue("pass", {
                                amount: val,
                                currency: currency,
                                rate: rate,
                              });
                              const payValue = getValues("pay");
                              rate &&
                                setValue("pay", {
                                  ...payValue,
                                  amount: Math.trunc(Number(val) * rate),
                                });
                            }}
                            currencyValue={value.currency}
                            wallet={wallets?.data.find(
                              (wallet) =>
                                wallet?.currencyCode === value.currency
                            )}
                          />
                        </div>
                      )}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    {/* <WageTable
                      commissionCurrency={commissionCurrency}
                      setCommissionCurrency={setCommissionCurrency}
                      payInfo={payInfo}
                      passInfo={passInfo}
                      commissions={commissions}
                      passValue={getValues("passAmount")}
                    /> */}
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
