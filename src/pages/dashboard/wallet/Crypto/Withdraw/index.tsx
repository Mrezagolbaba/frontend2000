import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import {
  useResendOtpWithdrawMutation,
  useTransactionFeeQuery,
  useVerifyOtpWithdrawMutation,
  useWithdrawMutation,
} from "store/api/wallet-management";
import * as Yup from "yup";
import Currency from "components/Input/CurrencyInput";
import Dialog from "components/Dialog";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import Notify from "components/Notify";
import WithdrawOTP from "components/WithdrawOTP";
import tron from "assets/img/network/tron.svg";
import { AlertInfo, AlertSuccess, AlertWarning } from "components/AlertWidget";
import { Controller, useForm as useRHF } from "react-hook-form";
import { normalizeAmount, persianToEnglishNumbers } from "helpers";
import { useAppSelector } from "store/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import wallet from "assets/scss/dashboard/wallet.module.scss";

type CryptoFormType = {
  network: string;
  amount: string;
  destination: string;
};

const WithdrawCrypto = ({
  onClose,
  currency,
  stock,
}: {
  onClose: () => void;
  currency: string;
  stock: number;
}) => {
  // ==============|| States ||================= //
  const [isOpenOtp, setIsOpenOTP] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ==============|| Validation ||================= //
  const resolver = yupResolver(
    Yup.object().shape({
      network: Yup.string().required(),
      amount: Yup.string().required("مبلغ برداشت را وارد کنید."),
      destination: Yup.string().required("آدرس کیف پول را وارد کنید."),
    }),
  );

  // ==============|| Hooks ||================= //
  const navigate = useNavigate();
  const { otpMethod } = useAppSelector((state) => state.user);
  const [verifyOtpWithdraw, { isSuccess: successVerify }] =
    useVerifyOtpWithdrawMutation();
  const { data: fee } = useTransactionFeeQuery("USDT");
  const [withdraw, { data: response, isLoading: formLoading, isSuccess }] =
    useWithdrawMutation();
  const [resendOtpWithdraw, { isSuccess: isResendSuccess }] =
    useResendOtpWithdrawMutation();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useRHF<CryptoFormType>({
    mode: "onChange",
    defaultValues: {
      network: "TRC20",
      amount: "",
      destination: "",
    },
    resolver,
  });

  // ==============|| constants ||================= //
  const optionList: OptionType[] = [
    {
      content: (
        <div className={wallet["items-credit"]}>
          <span className={wallet["items-credit__icon"]}>
            <img alt="TRC20" src={tron} className="bank-svg" />
          </span>
          <span>TRC20</span>
        </div>
      ),
      value: "TRC20",
    },
  ];

  // ==============|| Handlers ||================= //
  const onSubmit = async (data: CryptoFormType) => {
    if (data.destination.length < 34)
      setError("destination", {
        type: "manual",
        message: "آدرس کیف پول وارد شده صحیح نمی باشد.",
      });
    else if (Number(data.amount) < fee?.withdrawMinAmount)
      setError("amount", {
        type: "manual",
        message: `مبلغ وارد شده نمی تواند کمتر از ${normalizeAmount(fee?.withdrawMinAmount, "USDT", true)} باشد.`,
      });
    else if (Number(data.amount) > stock)
      setError("amount", {
        type: "manual",
        message: "موجودی کیف پول شما کافی نیست.",
      });
    else
      withdraw({
        currencyCode: currency,
        amount: data.amount,
        destination: data.destination,
      });
  };
  const handleSendOtp = async (data: { code: string }) => {
    if (data.code.length > 6)
      return Notify({ type: "error", text: "لطفا کد را وارد کنید" });
    const newData = {
      transactionId: response?.id,
      code: persianToEnglishNumbers(data.code),
    };
    verifyOtpWithdraw(newData);
  };
  const handleReSendOtp = async () => {
    await resendOtpWithdraw(response?.id).then(() => {
      if (isResendSuccess)
        Notify({ type: "success", text: "کد مجددا ارسال شد" });
    });
  };

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    if (isSuccess) setIsOpenOTP(true);
  }, [isSuccess]);

  useEffect(() => {
    if (successVerify) {
      setIsOpenOTP(false);
      setShowSuccess(true);
      Notify({ type: "success", text: "برداشت با موفقیت انجام شد" });
    }
  }, [successVerify]);

  // ==============|| Render ||================= //
  return (
    <div className="px-2">
      <AlertWarning
        hasIcon
        text="در هنگام برداشت به آدرس وارد شده نمایید در صورت برداشت اشتباه ارز
          دیجیتال از دست خواهد رفت."
      />
      <AlertInfo
        hasIcon
        text="انتقال داخلی (آرسونیکس به آرسونیکس) هیچ کارمزدی ندارد."
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={12} lg={6}>
            <Controller
              name="network"
              control={control}
              render={({ field: { name, value } }) => (
                <FormGroup className="position-relative">
                  <Label htmlFor={name}> شبکه برداشت: </Label>

                  <DropdownInput
                    id={name}
                    value={value}
                    onChange={(val) => setValue(name, val)}
                    options={optionList}
                    disabled={true}
                  />
                  {errors?.[name] && (
                    <FormFeedback tooltip>{errors[name]?.message}</FormFeedback>
                  )}
                </FormGroup>
              )}
            />
          </Col>
          <Col xs={12} lg={6}>
            <Controller
              name="amount"
              control={control}
              render={({ field: { name, value } }) => (
                <FormGroup className="position-relative">
                  <div className="d-flex flex-row justify-content-between">
                    <Label htmlFor={name}>مبلغ برداشت: </Label>
                    <span className="d-flex flex-row justify-content-between">
                      <FormText
                        role="button"
                        onClick={() => setValue(name, stock.toString())}
                      >{`موجودی شما: ${normalizeAmount(stock.toString(), "USDT", true)}`}</FormText>
                    </span>
                  </div>
                  <Currency
                    name={name}
                    value={value}
                    onChange={(val) => {
                      clearErrors(name);
                      setValue(name, val);
                    }}
                    decimalsLimit={6}
                    hasError={Boolean(errors?.amount)}
                  />
                  {errors?.[name] && (
                    <FormFeedback tooltip>{errors[name]?.message}</FormFeedback>
                  )}
                  <div className="d-flex flex-column">
                    {fee && (
                      <FormText>
                        {`کارمزد برداشت: ${normalizeAmount(fee.withdrawFeeStatic, "USDT", true)}`}
                      </FormText>
                    )}
                    {value !== "" &&
                      fee?.withdrawFeeStatic &&
                      Number(value) - Number(fee?.withdrawFeeStatic) > 0 && (
                        <FormText>
                          {`خالص دریافتی: ${normalizeAmount(
                            (
                              Number(value) - Number(fee.withdrawFeeStatic)
                            ).toString(),
                            "USDT",
                            true,
                          )}`}
                        </FormText>
                      )}
                  </div>
                </FormGroup>
              )}
            />
          </Col>
          <Col xs={12} lg={6}>
            <Controller
              name="destination"
              control={control}
              render={({ field: { name, value, onChange } }) => (
                <FormGroup className="position-relative">
                  <div className="d-flex flex-row justify-content-between">
                    <Label htmlFor={name}> آدرس کیف پول: </Label>
                  </div>
                  <Input
                    name={name}
                    value={value}
                    onChange={(e) => {
                      clearErrors(name);
                      onChange(e);
                    }}
                    className="latin-font"
                    invalid={Boolean(errors?.destination)}
                  />
                  {errors?.[name] && (
                    <FormFeedback tooltip>{errors[name]?.message}</FormFeedback>
                  )}
                </FormGroup>
              )}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <div className="d-flex flex-row justify-content-evenly">
            <Button
              color="primary"
              outline
              type="submit"
              className="px-5 py-3"
              disabled={formLoading}
            >
              {formLoading ? <Spinner /> : "ثبت درخواست برداشت"}
            </Button>
          </div>
        </Row>
      </Form>
      <Dialog
        title="تایید برداشت"
        size="md"
        isOpen={isOpenOtp}
        onClose={() => setIsOpenOTP(false)}
      >
        <WithdrawOTP
          title="تایید برداشت"
          onClose={() => setIsOpenOTP(false)}
          securitySelection={otpMethod}
          handleResend={handleReSendOtp}
          handleGetCode={handleSendOtp}
        />
      </Dialog>
      <Dialog
        title=""
        size="md"
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      >
        <AlertSuccess
          hasIcon
          text="برداشت شما با موفقیت ثبت شد. می توانید از قسمت تاریخچه وضعیت برداشت را مشاهده نمایید."
        />
        <Button
          onClick={() => {
            onClose?.();
            setShowSuccess(false);
            navigate("/dashboard/orders");
          }}
        >
          مشاهده وضعیت برداشت
        </Button>
      </Dialog>
    </div>
  );
};

export default WithdrawCrypto;
