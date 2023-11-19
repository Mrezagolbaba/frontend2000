import * as Yup from "yup";
import Dialog from "components/Dialog";
import ExchangeInput from "components/Input/ExchangeInput";
import { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Button, Card, CardBody, CardHeader, Col, Form, Row } from "reactstrap";
import { Controller, useForm as useRHF } from "react-hook-form";
import DepositCrypto from "pages/dashboard/wallet/Crypto/Deposit";

import buy from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useList } from "@refinedev/core";
import { convertText } from "helpers";
import { AlertDanger } from "components/AlertWidget";
import WageTable from "./WageTable";
import toast from "react-hot-toast";

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
  const [commission, setCommission] = useState<any>({});

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
    onMutationSuccess: (data) => {
      const res = data.data;
      setCommission({
        pay: {
          amount: res.transactions[0].fee,
          currency: res.transactions[0].currencyCode,
        },
        pass: {
          amount: res.transactions[1].fee,
          currency: res.transactions[1].currencyCode,
        },
      });
    },
    onMutationError: (error) => {
      toast.error(error.message, { position: "bottom-left" });
      throw new Error(error.message);
    },
  });

  const { onFinish: finishExchange } = useForm({
    action: "create",
    resource: "currency-swaps",
    onMutationSuccess: (data) => {
      toast.error("تبدیل با موفقیت انجام شد.", { position: "bottom-left" });
    },
    onMutationError: (error) => {
      toast.error(error.message, { position: "bottom-left" });
      throw new Error(error.message);
    },
  });

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useRHF<ExchangeFormType>({
    mode: "onChange",
    defaultValues: {
      pay: { currency: "IRR", amount: "", rate: undefined },
      pass: { currency: "TRY", amount: "", rate: undefined },
    },
    resolver,
  });

  const handleErrors = (name, text) => {
    setError(name, {
      type: "custom",
      message: text,
    });
    if (text === null) clearErrors(name);
  };
  const handleCommission = () => {
    const payValue = getValues("pay");
    const passValue = getValues("pass");
    if (payValue.currency === passValue.currency) {
      toast.error("نمیتوانید ارز یکسان را تبدیل کنید");
      return;
    }
    const data = {
      sourceCurrencyCode: convertText(payValue.currency, "faToEn"),
      sourceAmount: payValue.amount,
      destinationCurrencyCode: convertText(passValue.currency, "faToEn"),
      feeCurrencyCode: convertText(payValue.currency, "faToEn"),
    };

    handleSwaps(data);
  };

  const handleChange = (data, action) => {
    setValue(action, {
      amount: data.val,
      currency: data.currency,
      rate: data.rate,
    });
    if (action === "pay") {
      const passValue = getValues("pass");
      passValue &&
        passValue.rate &&
        setValue("pass", {
          ...passValue,
          amount: Number(data.val) * passValue.rate,
        });
    } else {
      const payValue = getValues("pay");
      data.rate &&
        setValue("pay", {
          ...payValue,
          amount: Math.trunc(Number(data.val) * data.rate),
        });
    }

    handleCommission();
  };

  const onSubmit = (values) => {
    const data = {
      sourceCurrencyCode: convertText(values.payValue.currency, "faToEn"),
      sourceAmount: values.payValue.amount,
      destinationCurrencyCode: convertText(values.passValue.currency, "faToEn"),
      feeCurrencyCode: convertText(values.payValue.currency, "faToEn"),
    };
    finishExchange(data);
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
                            onChange={(val, currency, rate) =>
                              handleChange({ val, currency, rate }, "pay")
                            }
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
                            onChange={(val, currency, rate) =>
                              handleChange({ val, currency, rate }, "pass")
                            }
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
                    <WageTable
                      commission={commission}
                      payValue={getValues("pay")}
                      passValue={getValues("pass")}
                    />
                  </Col>
                </Row>
                <div className={buy.currencyExchangeAction}>
                  <Button
                    type="submit"
                    color="primary"
                    outline
                    className="px-5 py-3"
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
