import { Button, FormFeedback, Spinner } from "reactstrap";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import { useAppSelector } from "store/hooks";
import {
  useDepositMutation,
  useTransactionFeeQuery,
} from "store/api/wallet-management";
import { Link, useNavigate } from "react-router-dom";
import { useBankAccountsQuery } from "store/api/profile-management";
import { yupResolver } from "@hookform/resolvers/yup";
import { normalizeAmount, persianToEnglishNumbers } from "helpers";
import { IBankAccounts } from "types/banks";
import BanksWrapper from "components/BanksWrapper";
import CurrencyInput from "components/Input/CurrencyInput/newCurrencyInput";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import button from "assets/scss/components/button.module.scss";

type CreditCardForm = {
  accountNumber: string;
  amount: string;
  accountId: string;
};

const CreditCardForm = () => {
  // ==============|| States ||================= //
  const [hasAccount, setHasAccount] = useState<boolean>(true);
  const [optionList, setOptionList] = useState<OptionType[] | any[]>([]);
  const [isRedirect, setIsRedirect] = useState(false);

  // ==============|| Hooks ||================= //
  const { firstName, lastName, secondTierVerified } = useAppSelector(
    (state) => state.user,
  );
  const navigate = useNavigate();
  const { data: fee } = useTransactionFeeQuery("IRR");
  const { data, isSuccess } = useBankAccountsQuery({});
  const [
    depositRequest,
    { data: response, isLoading, isSuccess: isSubmitSuccess },
  ] = useDepositMutation();
  const resolver = yupResolver(
    Yup.object().shape({
      accountNumber: Yup.string().required(),
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
  } = useForm<CreditCardForm>({
    mode: "onChange",
    defaultValues: {
      accountNumber: "",
      amount: "",
      accountId: "",
    },
    resolver,
  });

  // ==============|| Handlers ||================= //
  const onSubmit = async (data: CreditCardForm) => {
    if (Number(data.amount) < fee?.depositMinAmount / 10)
      setError("amount", {
        type: "manual",
        message: `مبلغ وارد شده نمی تواند کمتر از ${normalizeAmount(
          fee?.depositMinAmount,
          "IRR",
          true,
        )} باشد.`,
      });
    else if (Number(data.amount) >= fee?.depositMaxAmount)
      setError("amount", {
        type: "manual",
        message: `مبلغ وارد شده نمی تواند بیشتر از ${normalizeAmount(
          fee.depositMaxAmount,
          "IRR",
          true,
        )} باشد.`,
      });
    else
      depositRequest({
        currencyCode: "IRR",
        amount: (Number(data.amount) * 10).toString(),
        bankAccountId: data.accountId,
        flow: "REDIRECT",
      });
  };

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    if (isSuccess) {
      if (data.length <= 0) {
        setHasAccount(false);
      } else {
        const accounts = data.filter((account: IBankAccounts) => {
          if (account.cardNumber !== null) return account;
        });

        setOptionList(
          accounts.map((account) => {
            if (account.cardNumber) {
              return {
                content: (
                  <div className={wallet["items-credit"]}>
                    <BanksWrapper
                      type="IRR"
                      value={account?.cardNumber}
                      iconClassName={wallet["items-credit__icon"]}
                    >
                      <span dir="ltr">{account?.cardNumber}</span>
                    </BanksWrapper>
                  </div>
                ),
                otherOptions: { accountId: account?.id },
                value: account?.cardNumber,
              };
            }
          }),
        );
        setHasAccount(true);
        reset({
          accountNumber: accounts[0]?.cardNumber,
          accountId: accounts[0]?.id,
          amount: "",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);

  useEffect(() => {
    if (isSubmitSuccess && response) {
      setIsRedirect(true);
      window.location.replace(response.providerData.flowRedirectUrl);
    }
  }, [isSubmitSuccess, response]);

  // ==============|| Render ||================= //
  // return hasAccount ? (
  return (
    <>
      {isRedirect && (
        <div className="overlay-redirect">
          <Spinner />
          <span>درحال انتقال به صفحه مورد نظر ...</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <Controller
              name="accountNumber"
              control={control}
              render={({ field: { name, value } }) => (
                <div className={wallet["form-group"]}>
                  <div className={wallet["form-group__label"]}>
                    <label htmlFor={name}>شماره کارت</label>
                    <Link
                      to="/dashboard/profile#iranian-accounts"
                      target="_blank"
                    >
                      افزودن حساب جدید
                    </Link>
                  </div>
                  <DropdownInput
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
                    <FormFeedback tooltip>{errors[name]?.message}</FormFeedback>
                  )}
                  {fee && (
                    <span className={wallet["form-group__hint"]}>
                      {`سقف واریز 24 ساعته ${normalizeAmount(
                        fee?.depositMaxAmount,
                        "IRR",
                        true,
                      )}`}
                    </span>
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
                    <label htmlFor={name}>مقدار واریز </label>
                  </div>
                  <CurrencyInput
                    thousandSeparator=","
                    name={name}
                    value={value}
                    onChange={(e: any) => {
                      const amountTemp = e.target.value.replaceAll(",", "");
                      setValue(name, persianToEnglishNumbers(amountTemp));
                    }}
                    placeholder="تومان"
                    // hasError={Boolean(errors?.[name])}
                  />
                  {errors?.[name] && (
                    <FormFeedback tooltip>{errors[name]?.message}</FormFeedback>
                  )}
                  <div className="d-flex flex-column">
                    {fee && (
                      <span className={wallet["form-group__hint"]}>
                        {`کارمزد شاپرک: ${normalizeAmount(
                          fee?.depositFeeStatic,
                          "IRR",
                          true,
                        )}`}
                      </span>
                    )}
                    <span className={wallet["form-group__hint"]}>
                      {Number(value) - Number(fee?.depositFeeStatic) / 10 > 0 &&
                        `مبلغ واریز به کیف پول: ${normalizeAmount(
                          (
                            Number(value) * 10 -
                            Number(fee.depositFeeStatic)
                          ).toString(),
                          "IRR",
                          true,
                        )}`}
                    </span>
                  </div>
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
              className={`${button["arsonex-btn"]} ${button["primary"]} ${button["full-width"]} mb-2`}
            >
              انتقال به درگاه پرداخت
            </button>
            {!secondTierVerified && (
              <button
                disabled={isLoading}
                type="button"
                onClick={() => {
                  navigate("/dashboard/profile#kyc-section");
                }}
                className={`${button["arsonex-btn"]} ${button["primary"]} ${button["full-width"]} mb-2`}
              >
                احراز هویت سطح دو
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
  // ) : (
  //   <Row>
  //     <AlertInfo
  //       text={`شما هیچ حسابی به پروفایل خود اضافه نکرده‌اید، ابتدا یک حساب به نام  ${firstName} ${lastName} به پروفایل خود اضافه کنید.`}
  //       hasIcon={true}
  //     />
  //     <div className="mt-3 text-center">
  //       <Button
  //         color="primary"
  //         type="button"
  //         className="px-5 py-3"
  //         onClick={() => router.push("/dashboard/profile")}
  //         outline
  //       >
  //         افزودن حساب بانکی
  //       </Button>
  //     </div>
  //   </Row>
  // );
};

export default CreditCardForm;
