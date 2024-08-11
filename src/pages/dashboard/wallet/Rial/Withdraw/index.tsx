import { FormFeedback } from "reactstrap";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import { useBankAccountsQuery } from "store/api/profile-management";
import {
  useTransactionDynamicFeeMutation,
  useTransactionFeeQuery,
  useWithdrawMutation,
} from "store/api/wallet-management";
import { normalizeAmount, persianToEnglishNumbers } from "helpers";
import BanksWrapper from "components/BanksWrapper";
import Notify from "components/Notify";
import CurrencyInput from "components/Input/CurrencyInput/newCurrencyInput";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import button from "assets/scss/components/button.module.scss";
import { AlertDanger, AlertInfo, AlertWarning } from "components/AlertWidget";

type WithdrawType = {
  iban: string;
  amount: string;
  accountId: string;
};

type Props = {
  stock: string | number;
};

export default function IRTWithdraw({ stock }: Props) {
  // ==============|| States ||================= //
  const [optionList, setOptionList] = useState<OptionType[] | []>([]);
  const [hasAccount, setHasAccount] = useState<boolean>(true);

  // ==============|| Hooks ||================= //
  const { firstName, lastName, secondTierVerified } = useAppSelector(
    (state) => state.user,
  );
  const navigate = useNavigate();
  const { data, isSuccess } = useBankAccountsQuery({});
  const { data: fee } = useTransactionFeeQuery("IRR");
  const [getFees, { data: fees }] = useTransactionDynamicFeeMutation();
  const [withdrawRequest, { isLoading, isSuccess: isSuccessWithdraw }] =
    useWithdrawMutation();
  const resolver = yupResolver(
    Yup.object().shape({
      iban: Yup.string().required(),
      amount: Yup.string().required("شما هیچ مبلغی وارد نکرده اید."),
      accountId: Yup.string().required(),
    }),
  );
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<WithdrawType>({
    mode: "onChange",
    defaultValues: {
      iban: "",
      amount: "",
      accountId: "",
    },
    resolver,
  });

  // ==============|| Handlers ||================= //
  const onSubmit = async (data: WithdrawType) => {
    if (Number(data.amount) < fee?.withdrawMinAmount / 10)
      setError("amount", {
        type: "manual",
        message: `مبلغ وارد شده نمی تواند کمتر از ${normalizeAmount(
          fee?.withdrawMinAmount,
          "IRR",
          true,
        )} باشد.`,
      });
    else if (Number(data.amount) > fee?.withdrawMaxAmount / 10)
      setError("amount", {
        type: "manual",
        message: `مبلغ وارد شده نمی تواند بیشتر از ${normalizeAmount(
          fee?.withdrawMaxAmount,
          "IRR",
          true,
        )} باشد.`,
      });
    else if (Number(data.amount) > Number(stock) / 10)
      setError("amount", {
        type: "manual",
        message: "موجودی کیف پول شما کافی نیست.",
      });
    else
      withdrawRequest({
        destination: data.accountId,
        currencyCode: "IRR",
        amount: (Number(data.amount) * 10).toString(),
      });
  };

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    if (isSuccess) {
      const bankList = data.filter((bank) => bank.cardNumber !== null);
      if (bankList.length <= 0) {
        setHasAccount(false);
      } else {
        setHasAccount(true);
        setOptionList(
          bankList.map((account) => {
            return {
              content: (
                <div className={wallet["items-credit"]}>
                  <BanksWrapper
                    type="IRR"
                    value={account.iban}
                    isSheba={true}
                    iconClassName={wallet["items-credit__icon"]}
                  >
                    <span dir="ltr">{account?.iban}</span>
                  </BanksWrapper>
                </div>
              ),
              otherOptions: { accountId: account?.id },
              value: account?.iban,
            };
          }),
        );
        reset({
          iban: bankList[0]?.iban,
          accountId: bankList[0]?.id,
          amount: "",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);
  useEffect(() => {
    if (isSuccessWithdraw) {
      Notify({
        type: "success",
        text: "درخواست برداشت با موفقیت ثبت شد.",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessWithdraw]);

  // ==============|| Render ||================= //
  return (
    <>
      <div className={wallet["form-container"]}>
        <div className={wallet["form-wrapper"]}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <Controller
                  name="iban"
                  control={control}
                  render={({ field: { name, value } }) => (
                    <div className={wallet["form-group"]}>
                      <div className={wallet["form-group__label"]}>
                        <label htmlFor={name}>شماره شبا</label>
                        <Link to="/dashboard/profile" target="blank">
                          افزودن حساب جدید
                        </Link>
                      </div>
                      <DropdownInput
                        disabled={!hasAccount}
                        id={name}
                        value={value}
                        onChange={(val, otherOption) => {
                          setValue("accountId", otherOption.accountId);
                          setValue(name, val);
                        }}
                        options={optionList}
                        hasError={Boolean(errors?.[name])}
                      />
                      {errors?.[name] && (
                        <FormFeedback tooltip>
                          {errors[name]?.message}
                        </FormFeedback>
                      )}
                      {fee?.withdrawMaxAmount && (
                        <span
                          className={wallet["form-group__hint"]}
                        >{`سقف باقیمانده برداشت روزانه: ${normalizeAmount(
                          fee?.withdrawMaxAmount,
                          "IRR",
                          true,
                        )}`}</span>
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
                        <label htmlFor={name}>مبلغ برداشت</label>
                        <span
                          className={wallet["form-group__hint"]}
                          role="button"
                          onClick={() => {
                            const val = (Number(stock) / 10).toString();

                            setValue(name, parseInt(val).toString());
                          }}
                        >{`موجودی شما: ${normalizeAmount(
                          stock.toString(),
                          "IRR",
                          true,
                        )}`}</span>
                      </div>
                      <CurrencyInput
                        thousandSeparator=","
                        name={name}
                        value={value}
                        disabled={!hasAccount}
                        onChange={(e: any) => {
                          const amountTemp = e.target.value.replaceAll(",", "");
                          e.target.value &&
                            getFees({
                              currencyCode: "IRR",
                              amount: (Number(amountTemp) * 10).toString(),
                              tranasctionType: "WITHDRAW",
                            });
                          clearErrors("amount");
                          setValue(name, persianToEnglishNumbers(amountTemp));
                        }}
                        placeholder="تومان"
                        // hasError={Boolean(errors?.[name])}
                      />
                      {errors?.[name] && (
                        <FormFeedback tooltip>
                          {errors[name]?.message}
                        </FormFeedback>
                      )}
                      <div className={wallet["form-group__hints"]}>
                        {fees && (
                          <span className={wallet["form-group__hint"]}>
                            {`کارمزد برداشت: ${normalizeAmount(
                              fees.feeAmount,
                              "IRR",
                              true,
                            )}`}
                          </span>
                        )}

                        {value !== "" &&
                          fees?.feeAmount &&
                          Number(value) - Number(fees?.feeAmount) > 0 && (
                            <span className={wallet["form-group__hint"]}>
                              {`خالص دریافتی: ${normalizeAmount(
                                (
                                  Number(value) * 10 -
                                  Number(fees?.feeAmount)
                                ).toString(),
                                "IRR",
                                true,
                              )}`}
                            </span>
                          )}
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
            <div>
              <div className="mt-3 text-center">
                <button
                  disabled={isLoading || !hasAccount}
                  type="submit"
                  className={`${button["arsonex-btn"]} ${button["primary"]} ${button["full-width"]} mb-2`}
                >
                  درخواست برداشت
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={wallet.info}>
        {!secondTierVerified && (
          <AlertInfo
            hasIcon
            text="برای افزایش میزان برداشت، احراز هویت سطح دو را تکمیل نمایید."
          />
        )}
        {hasAccount && (
          <>
            <AlertDanger
              hasIcon
              text="از واریز هرگونه وجه به حساب افراد ناشناس که از طریق آگهی‌های درآمدزایی و مشابه شما را پیدا کرده‌اند، خودداری نمایید. این روش کلاهبرداری است و در صورت وقوع جرم، مسئولیت آن بر عهده شما خواهد بود."
            />
            <AlertInfo
              hasIcon
              text="حداکثر مبلغ قابل برداشت روزانه از هر حساب ۱,۰۰۰,۰۰۰,۰۰۰ تومان می‌باشد."
            />
            <AlertInfo
              hasIcon
              text="سقف هر تراکنش برداشت 100,000,000 تومان می‌باشد."
            />
            <AlertWarning
              hasIcon
              text="در صورتی که امکان واریز حساب به حساب وجود داشته باشد واریزها به‌طور فوری انجام می‌شود؛ در غیر این صورت، طبق سیکل پایا و در روزهای کاری، واریزها در زمان‌های ۰۳:۴۵ صبح، ۱۰:۴۵ صبح، ۱۳:۴۵ عصر ،۱۸:۴۵ عصر انجام می‌گردد. درخواست‌هایی که در روزهای تعطیل ثبت شوند در اولین سیکل کاری پردازش خواهند شد."
            />
          </>
        )}
      </div>
    </>
  );
}
