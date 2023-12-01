import * as Yup from "yup";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  Col,
  Label,
  Row,
  FormGroup,
  FormText,
  FormFeedback,
  Button,
} from "reactstrap";

import pasargad from "assets/img/bank/Pasargad.svg";
import saman from "assets/img/bank/Saman.svg";

import DropdownInput, { OptionType } from "components/Input/Dropdown";
import Currency from "components/Input/CurrencyInput";
import { AlertInfo } from "components/AlertWidget";

import wallet from "../../style.module.scss";
import { useList } from "@refinedev/core";
import { formatShowAccount, searchIranianBanks } from "helpers/filesManagement";

type CreditCardForm = {
  accountNumber: string;
  amount: string;
};

const CreditCardForm = () => {
  const [hasAccount, setHasAccount] = useState<boolean>(true);
  const [optionList, setOptionList] = useState<OptionType[] | []>([]);

  const { data, isSuccess, isLoading, refetch } = useList({
    resource: `bank-accounts`,
  });

  const resolver = yupResolver(
    Yup.object().shape({
      accountNumber: Yup.string().required(),
      amount: Yup.string().required(),
    })
  );
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreditCardForm>({
    mode: "onChange",
    defaultValues: {
      accountNumber: "502229103949549395",
      amount: "",
    },
    resolver,
  });
  const onSubmit = async (data: CreditCardForm) => {
    console.log(data);
  };

  useEffect(() => {
    if (isSuccess) {
      if (data.data.length <= 0) {
        setHasAccount(false);
      } else
        setOptionList(
          data.data.map((account) => {
            const bank = searchIranianBanks(account.cardNumber);
            return {
              content: (
                <div className={wallet["items-credit"]}>
                  <span className={wallet["items-credit__icon"]}>
                    <img alt={bank.name} src={bank.logo} className="bank-svg" />
                  </span>
                  <span dir="ltr">{formatShowAccount(account.cardNumber)}</span>
                </div>
              ),
              value: account.cardNumber,
            };
          })
        );
    }
  }, [data?.data, isSuccess]);

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
                <FormText>سقف واریز امروز این کارت: ۵۰ میلیون تومان</FormText>
              </FormGroup>
            )}
          />
        </Col>
        <Col xs={12} lg={6}>
          <Controller
            name="accountNumber"
            control={control}
            render={({ field: { name, value } }) => (
              <FormGroup className="position-relative">
                <div className="d-flex flex-row justify-content-between">
                  <Label htmlFor={name}>مبلغ واریز: </Label>
                  <a href="#">
                    <span className="full-withraw mt-1">حداکثر مبلغ واریز</span>
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
                <FormText>کارمزد واریز: صفر تومان </FormText>
              </FormGroup>
            )}
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <div className="d-flex flex-row justify-content-evenly">
          <Button className="px-5 py-3" color="primary" outline type="submit">
            انتقال به درگاه پرداخت
          </Button>
          <Button
            className="px-5 py-3"
            color="primary"
            type="button"
            onClick={() => {}}
          >
            احراز هویت سطح دو
          </Button>
        </div>
      </Row>
    </form>
  ) : (
    <Row>
      <AlertInfo
        text="شما هیچ حسابی به پروفایل خود اضافه نکرده‌اید، ابتدا یک حساب به نام بهزاد بابائی به پروفایل خود اضافه کنید."
        hasIcon={true}
      />
      <div className="text-center mt-3">
        <Button color="primary" type="button" onClick={() => {}} outline>
          افزودن حساب بانکی
        </Button>
      </div>
    </Row>
  );
};

export default CreditCardForm;
