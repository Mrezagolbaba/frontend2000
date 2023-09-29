import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
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

import pasargad from "assets/img/bank/Pasargad.svg";
import saman from "assets/img/bank/Saman.svg";

import wallet from "../../style.module.scss";

type WithdrawType = {
  sheba: string;
  amount: string;
};

export default function Withdraw() {
  const optionList: OptionType[] = [
    {
      content: (
        <div className={wallet["items-credit"]}>
          <span className={wallet["items-credit__icon"]}>
            <img alt="بانک پاسارگارد" src={pasargad} className="bank-svg" />
          </span>
          <span>5859831058254847</span>
        </div>
      ),
      value: "5859831058254847",
    },
    {
      content: (
        <div className={wallet["items-credit"]}>
          <span className={wallet["items-credit__icon"]}>
            <img alt="بانک سامان" src={saman} className="bank-svg" />
          </span>

          <span className="text">502229103949549395</span>
        </div>
      ),
      value: "502229103949549395",
    },
  ];

  const resolver = yupResolver(
    Yup.object().shape({
      sheba: Yup.string().required(),
      amount: Yup.string().required(),
    })
  );
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<WithdrawType>({
    mode: "onChange",
    defaultValues: {
      sheba: "502229103949549395",
      amount: "",
    },
    resolver,
  });
  const onSubmit = async (data: WithdrawType) => {
    console.log(data);
  };
  return (
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
            name="sheba"
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
                  onChange={(val) => setValue(name, val)}
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
          <Button color="primary" outline type="submit">
            ثبت درخواست برداشت
          </Button>
        </div>
      </Row>
    </form>
  );
}
