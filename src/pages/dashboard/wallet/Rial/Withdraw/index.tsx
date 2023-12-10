import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AlertInfo } from "components/AlertWidget";
import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
  FormText,
  Label,
  Row,
} from "reactstrap";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import Currency from "components/Input/CurrencyInput";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import { useBankAccountsQuery } from "store/api/profile-management";
import { formatShowAccount, searchIranianBanks } from "helpers/filesManagement";
import { useWithdrawMutation } from "store/api/wallet-management";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "store/hooks";

type WithdrawType = {
  iban: string;
  amount: string;
  accountId: string;
};

type Props = {
  onClose?: () => void;
};

export default function Withdraw({ onClose }: Props) {
  const { firstName, lastName } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [hasAccount, setHasAccount] = useState<boolean>(true);
  const [optionList, setOptionList] = useState<OptionType[] | []>([]);
  const { data, isSuccess } = useBankAccountsQuery({});

  const [
    withdrawRequest,
    {
      data: response,
      isLoading,
      isSuccess: isSuccessWithdraw,
      isError: isErrorWithdraw,
    },
  ] = useWithdrawMutation();

  const resolver = yupResolver(
    Yup.object().shape({
      iban: Yup.string().required(),
      amount: Yup.string().required(),
      accountId: Yup.string().required(),
    })
  );
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
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
        setHasAccount(true);
        setOptionList(
          data.map((account) => {
            const bank = searchIranianBanks(account?.cardNumber);
            return {
              content: (
                <div className={wallet["items-credit"]}>
                  <span className={wallet["items-credit__icon"]}>
                    <span
                      className="mx-3"
                      dangerouslySetInnerHTML={{ __html: bank.logo }}
                    />
                  </span>
                  <span dir="ltr">{formatShowAccount(account?.iban)}</span>
                </div>
              ),
              otherOptions: { accountId: account?.id },
              value: account?.iban,
            };
          })
        );
        reset({
          iban: data[0]?.iban,
          accountId: data[0]?.id,
          amount: "",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);

  const onSubmit = async (data: WithdrawType) => {
    await withdrawRequest({
      destination: data.accountId,
      currencyCode: "IRR",
      amount: (Number(data.amount) * 10).toString(),
    });
  };

  useEffect(() => {
    isSuccessWithdraw &&
      toast.success(
        "درخواست برداشت با موفقیت ثبت شد. لطفا منتظر تایید پشتیبانی بمانید."
      );
    isErrorWithdraw &&
      toast.error(
        "در ثبت درخواست مشکلی پیش آمده است لطفا در صورت هرگونه ابهام با پشتیبانی ارتباط برقرار کنید."
      );

    onClose?.();
  }, [isSuccessWithdraw, isErrorWithdraw, onClose]);
  return hasAccount ? (
    <form className="px-3" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <AlertInfo
          hasIcon
          text="برای افزایش میزان برداشت، احراز هویت سطح دو را تکمیل نمایید."
        />
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
                  <a href="#">
                    <span className="full-withraw mt-1">افزودن حساب جدید</span>
                  </a>
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
                  <FormFeedback tooltip>
                    {errors[name]?.message}sdfsdfsfd
                  </FormFeedback>
                )}
                <FormText>
                  سقف باقی مانده برداشت روزانه این حساب: 100,000,000 تومان
                </FormText>
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
                  <a href="#">
                    <span className="full-withraw mt-1">
                      حداکثر قابل برداشت
                    </span>
                  </a>
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
                <span className="d-flex flex-row justify-content-between">
                  <FormText>موجودی شما: 12,000,000 تومان</FormText>
                  <FormText>کارمزد برداشت بانکی: 2,000 هزارتومان</FormText>
                </span>
              </FormGroup>
            )}
          />
        </Col>
      </Row>
      <Row className="mt-4">
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
