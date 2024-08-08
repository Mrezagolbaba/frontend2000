import { FormFeedback, Input } from "reactstrap";
import * as Yup from "yup";
import { Controller, useForm as useRHF } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "store/hooks";
import {
  useResendOtpWithdrawMutation,
  useTransactionFeeQuery,
  useVerifyOtpWithdrawMutation,
  useWithdrawMutation,
} from "store/api/wallet-management";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import tron from "assets/img/network/tron.svg";
import { normalizeAmount, persianToEnglishNumbers } from "helpers";
import Notify from "components/Notify";
import CurrencyInput from "components/Input/CurrencyInput/newCurrencyInput";
import Dialog from "components/Dialog";
import WithdrawOTP from "components/WithdrawOTP";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import button from "assets/scss/components/button.module.scss";

type CryptoFormType = {
  network: string;
  amount: string;
  destination: string;
};

const WithdrawCrypto = ({
  onSuccessWithdraw,
  currency,
  stock,
}: {
  onSuccessWithdraw: () => void;
  currency: string;
  stock: number;
}) => {
  // ==============|| States ||================= //
  const [isOpenOtp, setIsOpenOTP] = useState(false);

  // ==============|| Validation ||================= //
  const resolver = yupResolver(
    Yup.object().shape({
      network: Yup.string().required(),
      amount: Yup.string().required("مبلغ برداشت را وارد کنید."),
      destination: Yup.string().required("آدرس کیف پول را وارد کنید."),
    }),
  );

  // ==============|| Hooks ||================= //
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
            <img
              width={20}
              height={20}
              alt="TRC20"
              src={tron}
              className="bank-svg"
            />
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
        message: `مبلغ وارد شده نمی تواند کمتر از ${normalizeAmount(
          fee?.withdrawMinAmount,
          "USDT",
          true,
        )} باشد.`,
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
      onSuccessWithdraw();
      Notify({ type: "success", text: "برداشت با موفقیت انجام شد" });
    }
  }, [onSuccessWithdraw, successVerify]);

  // ==============|| Render ||================= //
  return (
    <>
      <div className={wallet["form-container"]}>
        <div className={wallet["form-wrapper"]}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <Controller
                  name="network"
                  control={control}
                  render={({ field: { name, value } }) => (
                    <div className={wallet["form-group"]}>
                      <div className={wallet["form-group__label"]}>
                        <label htmlFor={name}>شبکه برداشت</label>
                      </div>
                      <DropdownInput
                        id={name}
                        value={value}
                        onChange={(val) => setValue(name, val)}
                        options={optionList}
                        disabled={true}
                      />
                      {errors?.[name] && (
                        <FormFeedback tooltip>
                          {errors[name]?.message}
                        </FormFeedback>
                      )}
                    </div>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field: { name, value } }) => (
                    <div className={wallet["form-group"]}>
                      <div className={wallet["form-group__label"]}>
                        <label htmlFor={name}>مقدار برداشت</label>
                        <span
                          className={wallet["form-group__hint"]}
                          role="button"
                          onClick={() => setValue(name, stock.toString())}
                        >{`موجودی شما: ${normalizeAmount(
                          stock.toString(),
                          "USDT",
                          true,
                        )}`}</span>
                      </div>
                      <CurrencyInput
                        thousandSeparator=","
                        name={name}
                        value={value}
                        onChange={({ target }) => {
                          clearErrors(name);
                          setValue(name, target.value);
                        }}
                      />
                      {errors?.[name] && (
                        <FormFeedback tooltip>
                          {errors[name]?.message}
                        </FormFeedback>
                      )}
                      <div className={wallet["form-group__hints"]}>
                        {fee && (
                          <span className={wallet["form-group__hint"]}>
                            {`کارمزد برداشت: ${normalizeAmount(
                              fee.withdrawFeeStatic,
                              "USDT",
                              true,
                            )}`}
                          </span>
                        )}
                        {value !== "" &&
                          fee?.withdrawFeeStatic &&
                          Number(value) - Number(fee?.withdrawFeeStatic) >
                            0 && (
                            <span className={wallet["form-group__hint"]}>
                              {`خالص دریافتی: ${normalizeAmount(
                                (
                                  Number(value) - Number(fee.withdrawFeeStatic)
                                ).toString(),
                                "USDT",
                                true,
                              )}`}
                            </span>
                          )}
                      </div>
                    </div>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="destination"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <div className={wallet["form-group"]}>
                      <div className={wallet["form-group__label"]}>
                        <label htmlFor={name}>آدرس کیف پول</label>
                      </div>
                      <Input
                        name={name}
                        value={value}
                        onChange={(e) => {
                          clearErrors(name);
                          onChange(e);
                        }}
                        className="latin-font"
                        // invalid={Boolean(errors?.destination)}
                      />
                      {errors?.[name] && (
                        <FormFeedback tooltip>
                          {errors[name]?.message}
                        </FormFeedback>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
            <div>
              <div className="mt-3 text-center">
                <button
                  type="submit"
                  className={`${button["arsonex-btn"]} ${button["primary-outline"]} ${button["full-width"]} mb-2`}
                >
                  برداشت
                </button>
              </div>
            </div>
          </form>
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
        </div>
      </div>
      <div className={wallet.info}>
        <div className={`${wallet.info__box} ${wallet["danger-box"]}`}>
          در هنگام برداشت به آدرس وارد شده دقت نمایید در صورت برداشت اشتباه ارز
          دیجیتال از دست خواهد رفت.
        </div>
        <div className={`${wallet.info__box} ${wallet["info-box"]}`}>
          انتقال داخلی (آرسونیکس به آرسونیکس) هیچ کارمزدی ندارد.
        </div>
      </div>
    </>
  );
};

export default WithdrawCrypto;
