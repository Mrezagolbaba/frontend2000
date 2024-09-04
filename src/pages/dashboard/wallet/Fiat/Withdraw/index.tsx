import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
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
import BanksWrapper from "components/BanksWrapper";
import Currency from "components/Input/CurrencyInput";
import Dialog from "components/Dialog";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import Notify from "components/Notify";
import WithdrawOTP from "components/WithdrawOTP";
import lirFlag from "assets/img/coins/lira.png";
import turkeyFlag from "assets/img/icons/flag-turkey.png";
import { AlertWarning } from "components/AlertWidget";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ibanMAsk, normalizeAmount } from "helpers";
import { useAppSelector } from "store/hooks";
import { useBankAccountsQuery } from "store/api/profile-management";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import wallet from "assets/scss/dashboard/wallet.module.scss";

type Props = {
  onSuccessWithdraw: () => void;
  stock: number;
};
type FiatFormType = {
  network: string;
  destination: string;
  iban: string;
  amount: string;
  destinationCountry: string;
};

export default function WithdrawFiat({ stock, onSuccessWithdraw }: Props) {
  // ==============|| States ||================= //
  const [isOpenOTP, setIsOpenOTP] = useState(false);
  const [accountOptions, setAccountOptions] = useState<OptionType[] | []>([]);

  // ==============|| Hooks ||================= //
  const { otpMethod } = useAppSelector((state) => state.user);
  const [resendOtpWithdraw, { isSuccess: isResendSuccess }] =
    useResendOtpWithdrawMutation();
  const [verifyOtpWithdraw, { isSuccess: successVerify }] =
    useVerifyOtpWithdrawMutation();
  const { data: fee } = useTransactionFeeQuery("TRY");
  const { data: accounts, isSuccess: getSuccessAccounts } =
    useBankAccountsQuery({
      filter: "currencyCode||$eq||TRY",
    });
  const [withdrawRequest, { data: response, isLoading, isSuccess }] =
    useWithdrawMutation();
  const resolver = yupResolver(
    Yup.object().shape({
      network: Yup.string().required(),
      destination: Yup.string().required(),
      iban: Yup.string().required(),
      amount: Yup.string().required("مبلغ برداشت را تعیین کنید."),
      destinationCountry: Yup.string().required(),
    }),
  );
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FiatFormType>({
    mode: "onChange",
    defaultValues: {
      network: "TRY",
      destination: "",
      iban: "",
      amount: "",
      destinationCountry: "TRY",
    },
    resolver,
  });

  // ==============|| Handlers ||================= //
  const handleSendOtp = async (data: { code: string }) => {
    if (data.code.length > 6)
      return Notify({ type: "error", text: "لطفا کد را وارد کنید" });
    const newData = {
      transactionId: response?.id,
      code: data.code,
    };
    await verifyOtpWithdraw(newData);
  };
  const handleReSendOtp = async () => {
    await resendOtpWithdraw(response?.id).then(() => {
      if (isResendSuccess)
        Notify({ type: "success", text: "کد مجددا ارسال شد" });
    });
  };
  const onSubmit = async (data: FiatFormType) => {
    if (Number(data.amount) < Number(fee?.withdrawMinAmount)) {
      setError("amount", {
        type: "manual",
        message: `مبلغ وارد شده نمی تواند کمتر از ${normalizeAmount(fee?.withdrawMinAmount, "TRY", true)} باشد.`,
      });
    } else if (Number(data.amount) > Number(fee?.withdrawMaxAmount)) {
      setError("amount", {
        type: "manual",
        message: `مبلغ وارد شده نمی تواند بیش تر از ${normalizeAmount(fee.withdrawMaxAmount, "TRY", true)} باشد.`,
      });
    } else if (Number(data.amount) > stock)
      setError("amount", {
        type: "manual",
        message: `مبلغ وارد شده بیش تر از موجودی شما می باشد.`,
      });
    else
      withdrawRequest({
        currencyCode: "TRY",
        amount: data.amount,
        destination: data.destination,
      });
  };

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    let list = [] as OptionType[] | [];

    if (accounts && accounts.length > 0) {
      list = accounts.map((item) => {
        return {
          value: item.iban,
          otherOptions: { accountId: item?.id },
          content: (
            <div className={wallet["items-credit"]}>
              <BanksWrapper
                type="TRY"
                value={item.iban}
                iconClassName={wallet["items-credit__icon"]}
              >
                <span dir="ltr">
                  {(item.iban.includes("TR")
                    ? ibanMAsk(item.iban)
                    : "TR" + ibanMAsk(item.iban)) +
                    " - " +
                    item.ownerFullName}
                </span>
              </BanksWrapper>
            </div>
          ),
        };
      });
    }
    setAccountOptions(list.filter((item) => !item.value.includes("IR")));
    // setValue("iban", accountOptions[0]?.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, getSuccessAccounts]);
  useEffect(() => {
    if (accountOptions.length > 0) {
      setValue("iban", accountOptions[0]?.value);
      setValue("destination", accountOptions[0]?.otherOptions?.accountId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountOptions]);
  useEffect(() => {
    if (isSuccess) {
      setIsOpenOTP(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (successVerify) {
      Notify({ type: "success", text: "برداشت با موفقیت انجام شد" });
      setIsOpenOTP(false);
      onSuccessWithdraw?.();
    }
  }, [onSuccessWithdraw, successVerify]);

  // ==============|| Render ||================= //
  return (
    <div className="px-2">
      <AlertWarning
        hasIcon
        text="در هنگام برداشت به اطلاعات وارد شده دقت نمایید بعد از برداشت، دارایی شما امکان بازگردانی ندارد."
        key="withdraw-alert"
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={12} md={6}>
            <Controller
              name="network"
              control={control}
              render={({ field: { name, value, onChange } }) => (
                <FormGroup className="position-relative">
                  <Label htmlFor={name}> برداشت ارز:</Label>
                  <DropdownInput
                    id={name}
                    value={value}
                    onChange={onChange}
                    options={[
                      {
                        value: "TRY",
                        content: (
                          <div className={wallet["items-credit"]}>
                            <span className={wallet["items-credit__icon"]}>
                              <img
                                className={wallet["lir-icon"]}
                                src={lirFlag}
                                alt="lir"
                              />
                            </span>
                            <span dir="ltr"> لیر ترکیه - TL</span>
                          </div>
                        ),
                      },
                    ]}
                    disabled={true}
                  />
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
                      >{`موجودی شما: ${normalizeAmount(stock.toString(), "TRY", true)}`}</FormText>
                    </span>
                  </div>
                  <Currency
                    name={name}
                    value={value}
                    onChange={(val) => {
                      clearErrors(name);
                      setValue(name, val);
                    }}
                    decimalsLimit={2}
                    hasError={Boolean(errors?.[name])}
                  />
                  {errors?.[name] && (
                    <FormFeedback tooltip>{errors[name]?.message}</FormFeedback>
                  )}
                  <div className="d-flex flex-column">
                    {fee && (
                      <FormText>
                        {`کارمزد برداشت: ${normalizeAmount(fee.withdrawFeeStatic, "TRY", true)}`}
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
                            "TRY",
                            true,
                          )}`}
                        </FormText>
                      )}
                  </div>
                </FormGroup>
              )}
            />
          </Col>
          <Col xs={12} md={6} className="mt-4">
            <Controller
              name="destinationCountry"
              control={control}
              render={({ field: { name, value, onChange } }) => (
                <FormGroup>
                  <Label htmlFor={name}> انتقال به کشور:</Label>
                  <DropdownInput
                    id={name}
                    value={value}
                    onChange={onChange}
                    options={[
                      {
                        value: "TRY",
                        content: (
                          <div className={wallet["items-credit"]}>
                            <span className={wallet["items-credit__icon"]}>
                              <img
                                className={wallet["lir-icon"]}
                                src={turkeyFlag}
                                alt="lir"
                              />
                            </span>
                            <span dir="ltr"> ترکیه</span>
                          </div>
                        ),
                      },
                    ]}
                    disabled={true}
                  />
                </FormGroup>
              )}
            />
          </Col>
          <Col xs={12} md={6} className="mt-4">
            <Controller
              name="iban"
              control={control}
              render={({ field: { name, value } }) => (
                <FormGroup>
                  <div className="d-flex flex-row justify-content-between">
                    <Label htmlFor={name}> واریز به حساب:</Label>
                    <Link
                      to="/dashboard/profile#international-accounts"
                      target="blank"
                    >
                      <span className={wallet?.["little-label"]}>
                        افزودن حساب جدید
                      </span>
                    </Link>
                  </div>
                  <DropdownInput
                    id={name}
                    value={value}
                    className={`${wallet["english-number"]} ${wallet["font-small"]}`}
                    onChange={(val, otherOption) => {
                      setValue(name, val);
                      setValue("destination", otherOption.accountId);
                    }}
                    options={accountOptions}
                  />
                </FormGroup>
              )}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <div className="text-center">
            <Button className="px-5 py-3" color="primary" outline type="submit">
              {isLoading ? (
                <Spinner style={{ color: "white" }} />
              ) : (
                "  ثبت درخواست برداشت"
              )}
            </Button>
          </div>
        </Row>
      </Form>
      <Dialog
        title="تایید برداشت"
        isOpen={isOpenOTP}
        size="md"
        onClose={() => setIsOpenOTP(false)}
      >
        <WithdrawOTP
          onClose={() => setIsOpenOTP(false)}
          securitySelection={otpMethod}
          handleResend={handleReSendOtp}
          handleGetCode={handleSendOtp}
        />
      </Dialog>
    </div>
  );
}
