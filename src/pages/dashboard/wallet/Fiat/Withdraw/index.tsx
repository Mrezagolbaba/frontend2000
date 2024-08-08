import { FormFeedback } from "reactstrap";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import { useAppSelector } from "store/hooks";
import {
  useResendOtpWithdrawMutation,
  useTransactionFeeQuery,
  useVerifyOtpWithdrawMutation,
  useWithdrawMutation,
} from "store/api/wallet-management";
import { useBankAccountsQuery } from "store/api/profile-management";
import Notify from "components/Notify";
import { ibanMAsk, normalizeAmount, persianToEnglishNumbers } from "helpers";
import BanksWrapper from "components/BanksWrapper";
import lirFlag from "assets/img/coins/lira.png";
import turkeyFlag from "assets/img/icons/flag-turkey.png";
import CurrencyInput from "components/Input/CurrencyInput/newCurrencyInput";
import { Link } from "react-router-dom";
import Dialog from "components/Dialog";
import WithdrawOTP from "components/WithdrawOTP";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import button from "assets/scss/components/button.module.scss";

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
        message: `مبلغ وارد شده نمی تواند کمتر از ${normalizeAmount(
          fee?.withdrawMinAmount,
          "TRY",
          true,
        )} باشد.`,
      });
    } else if (Number(data.amount) > Number(fee?.withdrawMaxAmount)) {
      setError("amount", {
        type: "manual",
        message: `مبلغ وارد شده نمی تواند بیش تر از ${normalizeAmount(
          fee.withdrawMaxAmount,
          "TRY",
          true,
        )} باشد.`,
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
    <>
      <div className={wallet["form-container"]}>
        <div className={wallet["form-wrapper"]}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <Controller
                  name="network"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <div className={wallet["form-group"]}>
                      <div className={wallet["form-group__label"]}>
                        <label htmlFor={name}>برداشت ارز</label>
                      </div>
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
                                    width={20}
                                    height={20}
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
                        >
                          {`موجودی شما: ${normalizeAmount(
                            stock.toString(),
                            "TRY",
                            true,
                          )}`}
                        </span>
                      </div>
                      <CurrencyInput
                        thousandSeparator=","
                        name={name}
                        value={value}
                        onChange={(e: any) => {
                          clearErrors(name);
                          const amountTemp = e.target.value.replaceAll(",", "");
                          setValue(name, persianToEnglishNumbers(amountTemp));
                        }}
                        // decimalsLimit={2}
                        // hasError={Boolean(errors?.[name])}
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
                              "TRY",
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
                                "TRY",
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
                  name="destinationCountry"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <div className={wallet["form-group"]}>
                      <div className={wallet["form-group__label"]}>
                        <label htmlFor={name}> انتقال به کشور</label>
                      </div>
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
                                    width={20}
                                    height={20}
                                    className={wallet["lir-icon"]}
                                    src={turkeyFlag}
                                    alt="turkey-flag"
                                  />
                                </span>
                                <span dir="ltr"> ترکیه</span>
                              </div>
                            ),
                          },
                        ]}
                        disabled={true}
                      />
                    </div>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="iban"
                  control={control}
                  render={({ field: { name, value } }) => (
                    <div className={wallet["form-group"]}>
                      <div className={wallet["form-group__label"]}>
                        <label htmlFor={name}>واریز به حساب</label>
                        <Link
                          to="/dashboard/profile#international-accounts"
                          target="blank"
                        >
                          افزودن حساب جدید
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
                    </div>
                  )}
                />
              </div>
            </div>
            <div>
              <div className="mt-3 text-center">
                <button
                  disabled={isLoading}
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
      </div>
      <div className={wallet.info}>
        <div className={`${wallet.info__box} ${wallet["danger-box"]}`}>
          در هنگام برداشت به اطلاعات وارد شده دقت نمایید بعد از برداشت، دارایی
          شما امکان بازگردانی ندارد.
        </div>
      </div>
    </>
  );
}
