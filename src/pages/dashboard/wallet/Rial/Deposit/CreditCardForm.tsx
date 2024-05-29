import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
  FormText,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import {
  useDepositMutation,
  useTransactionFeeQuery,
} from "store/api/wallet-management";
import * as Yup from "yup";
import BanksWrapper from "components/BanksWrapper";
import Currency from "components/Input/CurrencyInput";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import { AlertInfo } from "components/AlertWidget";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { normalizeAmount } from "helpers";
import { useAppSelector } from "store/hooks";
import { useBankAccountsQuery } from "store/api/profile-management";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import wallet from "assets/scss/dashboard/wallet.module.scss";

type CreditCardForm = {
  accountNumber: string;
  amount: string;
  accountId: string;
};

const CreditCardForm = () => {
  // ==============|| States ||================= //
  const [hasAccount, setHasAccount] = useState<boolean>(true);
  const [optionList, setOptionList] = useState<OptionType[] | any[]>([]);

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
        message: `مبلغ وارد شده نمی تواند کمتر از ${normalizeAmount(fee?.depositMinAmount, "IRR", true)} باشد.`,
      });
    else if (Number(data.amount) >= fee?.depositMaxAmount)
      setError("amount", {
        type: "manual",
        message: `مبلغ وارد شده نمی تواند بیشتر از ${normalizeAmount(fee.depositMaxAmount, "IRR", true)} باشد.`,
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
        const accounts = data.filter((account) => {
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
      window.location.replace(response.providerData.flowRedirectUrl);
    }
  }, [isSubmitSuccess, response]);

  // ==============|| Render ||================= //
  return hasAccount ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col xs={12} lg={6}>
          <Controller
            name="accountNumber"
            control={control}
            render={({ field: { name, value } }) => (
              <FormGroup className="position-relative">
                <div className="d-flex flex-row justify-content-between">
                  <Label htmlFor={name}>کارت واریزی: </Label>
                  <Link
                    to="/dashboard/profile#iranian-accounts"
                    target="_blank"
                  >
                    <span className={wallet?.["little-label"]}>
                      افزودن حساب جدید
                    </span>
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
                  <FormText>
                    {`سقف واریز: ${normalizeAmount(fee?.depositMaxAmount, "IRR", true)}`}
                  </FormText>
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
                  <Label htmlFor={name}>مبلغ واریز: </Label>
                </div>
                <Currency
                  name={name}
                  value={value}
                  onChange={(val) => setValue(name, val)}
                  placeholder="مبلغ را به تومان وارد کنید"
                  hasError={Boolean(errors?.[name])}
                />
                {errors?.[name] && (
                  <FormFeedback tooltip>{errors[name]?.message}</FormFeedback>
                )}
                <div className="d-flex flex-column">
                  {fee && (
                    <FormText>
                      {`کارمزد شاپرک: ${normalizeAmount(fee?.depositFeeStatic, "IRR", true)}`}
                    </FormText>
                  )}
                  <FormText>
                    {Number(value) - Number(fee?.depositFeeStatic) / 10 > 0 &&
                      `مبلغ واریز به کیف پول: ${normalizeAmount(
                        (
                          Number(value) -
                          Number(fee.depositFeeStatic) / 10
                        ).toString(),
                        "IRR",
                        true,
                      )}`}
                  </FormText>
                </div>
              </FormGroup>
            )}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <div className="d-flex flex-row justify-content-evenly">
          <Button
            className="px-5 py-3"
            color="primary"
            outline
            type="submit"
            disabled={isLoading || isSubmitSuccess}
          >
            {isLoading ? <Spinner /> : "انتقال به درگاه پرداخت"}
          </Button>
          {!secondTierVerified && (
            <Button
              className="px-5 py-3"
              color="primary"
              type="button"
              onClick={() => {
                navigate("/dashboard/profile#kyc-section");
              }}
            >
              احراز هویت سطح دو
            </Button>
          )}
        </div>
      </Row>
    </form>
  ) : (
    <Row>
      <AlertInfo
        text={`شما هیچ حسابی به پروفایل خود اضافه نکرده‌اید، ابتدا یک حساب به نام  ${firstName} ${lastName} به پروفایل خود اضافه کنید.`}
        hasIcon={true}
      />
      <div className="text-center mt-3">
        <Button
          color="primary"
          type="button"
          className="px-5 py-3"
          onClick={() => navigate("/dashboard/profile")}
          outline
        >
          افزودن حساب بانکی
        </Button>
      </div>
    </Row>
  );
};

export default CreditCardForm;
