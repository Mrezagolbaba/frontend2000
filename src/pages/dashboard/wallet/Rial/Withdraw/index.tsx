import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
  FormText,
  Label,
  Row,
} from "reactstrap";
import {
  useTransactionFeeQuery,
  useWithdrawMutation,
} from "store/api/wallet-management";
import * as Yup from "yup";
import BanksWrapper from "components/BanksWrapper";
import Currency from "components/Input/CurrencyInput";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import Notify from "components/Notify";
import { AlertInfo } from "components/AlertWidget";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { tomanShow } from "helpers";
import { useAppSelector } from "store/hooks";
import { useBankAccountsQuery } from "store/api/profile-management";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import wallet from "assets/scss/dashboard/wallet.module.scss";

type WithdrawType = {
  iban: string;
  amount: string;
  accountId: string;
};

type Props = {
  onClose?: () => void;
  stock: string | number;
};

export default function Withdraw({ onClose, stock }: Props) {
  const { firstName, lastName, secondTierVerified } = useAppSelector(
    (state) => state.user,
  );

  const navigate = useNavigate();
  const [hasAccount, setHasAccount] = useState<boolean>(true);
  const [optionList, setOptionList] = useState<OptionType[] | []>([]);
  const { data, isSuccess } = useBankAccountsQuery({});
  const { data: fee } = useTransactionFeeQuery("IRR");
  const [withdrawRequest, { isSuccess: isSuccessWithdraw }] =
    useWithdrawMutation();

  const resolver = yupResolver(
    Yup.object().shape({
      iban: Yup.string().required(),
      amount: Yup.string().required(),
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

  useEffect(() => {
    if (isSuccess) {
      if (data.length <= 0) {
        setHasAccount(false);
      } else {
        const accounts = data.filter((account) => {
          if (account.cardNumber !== null) return account;
        });
        setHasAccount(true);
        setOptionList(
          accounts.map((account) => {
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
          iban: accounts[0]?.iban,
          accountId: accounts[0]?.id,
          amount: "",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);

  const onSubmit = async (data: WithdrawType) => {
    if (Number(data.amount) < fee?.withdrawMinAmount / 10)
      setError("amount", {
        type: "manual",
        message: `مبلغ وارد شده نمی تواند کمتر از ${tomanShow({ value: fee?.withdrawMinAmount, currency: "IRR" })} باشد.`,
      });
    else if (Number(data.amount) > fee?.withdrawMaxAmount / 10)
      setError("amount", {
        type: "manual",
        message: `مبلغ وارد شده نمی تواند بیشتر از ${tomanShow({ value: fee.withdrawMaxAmount, currency: "IRR" })} باشد.`,
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

  useEffect(() => {
    if (isSuccessWithdraw) {
      Notify({
        type: "success",
        text: "درخواست برداشت با موفقیت ثبت شد. لطفا منتظر تایید پشتیبانی بمانید.",
      });
      onClose?.();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessWithdraw]);
  return hasAccount ? (
    <form className="px-3" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        {!secondTierVerified && (
          <AlertInfo
            hasIcon
            text="برای افزایش میزان برداشت، احراز هویت سطح دو را تکمیل نمایید."
          />
        )}
        <AlertInfo
          hasIcon
          text="تسویه حساب با بانک‌های سامان، صادرات، کشاورزی، پارسیان، سپه، شهر، ملی، اقتصادنوین، آینده، پاسارگارد، ملت و تجارت سریع‌تر انجام می‌شود."
        />
        <AlertInfo
          hasIcon
          text="تمامی درخواست‌ها بعد از ثبت برداشت وارد چرخه پایا شده و در اولین سیکل یا سیکل بعدی روز‌های کاری برای شما واریز می‌شود."
        />
      </Row>
      <Row>
        <Col xs={12} lg={6}>
          <Controller
            name="iban"
            control={control}
            render={({ field: { name, value } }) => (
              <FormGroup className="position-relative">
                <div className="d-flex flex-row justify-content-between">
                  <Label htmlFor={name}> واریز به شبا: </Label>
                  <Link to="/dashboard/profile" target="blank">
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
                    <FormText>{`موجودی شما: ${tomanShow({ value: stock.toString(), currency: "IRR" })}`}</FormText>
                  </span>
                </div>
                <Currency
                  name={name}
                  value={value}
                  onChange={(val) => {
                    clearErrors("amount");
                    setValue(name, val);
                  }}
                  placeholder="مبلغ را به تومان وارد کنید"
                  hasError={Boolean(errors?.[name])}
                />
                {errors?.[name] && (
                  <FormFeedback tooltip>{errors[name]?.message}</FormFeedback>
                )}
                <span className="d-flex flex-row justify-content-between">
                  {fee && (
                    <FormText>
                      کارمزد برداشت :{" "}
                      {tomanShow({
                        value: fee.withdrawFeeStatic,
                        currency: "IRR",
                      })}
                    </FormText>
                  )}
                </span>
              </FormGroup>
            )}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <div className="text-center">
          <Button className="px-5 py-3" color="primary" outline type="submit">
            ثبت درخواست برداشت
          </Button>
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
}
