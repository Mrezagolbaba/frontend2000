import { useForm, useList } from "@refinedev/core";
import { AlertInfo, AlertWarning } from "components/AlertWidget";
import * as Yup from "yup";

import wallet from "pages/dashboard/wallet/style.module.scss";

import eth from "assets/img/network/eth.svg";
import tron from "assets/img/network/tron.svg";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import { Controller, useForm as useRHF } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import Currency from "components/Input/CurrencyInput";
import { useEffect, useState } from "react";
import CopyInput from "components/Input/CopyInput";

type CryptoFormType = {
  currencyCode: string;
  amount: string;
};

type CurrencyType = {
  code: string;
  type: "FIAT" | "CRYPTO";
  name: string;
  symbol: string;
  decimals: number;
};

const DepositCrypto = () => {
  const { data, isSuccess } = useList<CurrencyType>({
    resource: "currencies",
  });

  const { formLoading, onFinish } = useForm({
    action: "create",
    resource: "transactions/deposit",
    onMutationSuccess: (data, variables, context, isAutoSave) => {
      console.log({ data, variables, context, isAutoSave });
    },
  });
  const [currencyList, setCurrencyList] = useState<CurrencyType[] | null>(null);

  const [showResult, setShowResult] = useState<boolean>(false);
  const [result, setResult] = useState({
    networkName: "",
    walletAddress: "",
    amount: "",
    endTime: "",
  });

  useEffect(() => {
    if (isSuccess)
      setCurrencyList(
        data.data.filter((currency: CurrencyType) => currency.type === "CRYPTO")
      );
  }, [data?.data, isSuccess]);

  const optionList: OptionType[] = currencyList
    ? currencyList.map((currency: CurrencyType) => {
        return {
          content: (
            <div className={wallet["items-credit"]}>
              <span className={wallet["items-credit__icon"]}>
                <img alt={currency.name} src={tron} className="bank-svg" />
              </span>
              <span>{currency.symbol}</span>
              <span>{currency.name}</span>
            </div>
          ),
          value: currency.code,
        };
      })
    : [];

  const resolver = yupResolver(
    Yup.object().shape({
      currencyCode: Yup.string().required(),
      amount: Yup.string().required(),
    })
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useRHF<CryptoFormType>({
    mode: "onChange",
    defaultValues: {
      currencyCode: "",
      amount: "",
    },
    resolver,
  });
  const onSubmit = async (data: CryptoFormType) => {
    onFinish(data);
  };

  return (
    <div className="px-2">
      <AlertWarning
        hasIcon
        text="در هنگام واریز به شبکه انتخابی دقت فرمایید در صورت واریز به شبکه
          اشتباه دارایی شما از دست خواهد رفت ، همچنین از واریز قرارداد هوشمند
          خودداری فرمایید."
      />
      <AlertInfo
        hasIcon
        text=" برای امنیت شما در مقابل تهدید های (تحریم شهروندان ایرانی)
          بین المللی، آرسونیکس در هر واریز کیف پول کابران را به طور کامل
          تغییر می دهد."
      />
      <AlertInfo
        hasIcon
        text="در صورت واریز مبلغ متفاوت از عدد مشخص شده باید مبلغ واریز را تغییر
          دهید."
      />
      {!showResult ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col xs={12} lg={6}>
              <Controller
                name="currencyCode"
                control={control}
                render={({ field: { name, value } }) => (
                  <FormGroup className="position-relative">
                    <Label htmlFor={name}> شبکه دریافت: </Label>

                    <DropdownInput
                      id={name}
                      value={value}
                      onChange={(val) => setValue(name, val)}
                      options={optionList}
                      // hasError={Boolean(errors?.[name])}
                    />
                    {errors?.[name] && (
                      <FormFeedback tooltip>
                        {errors[name]?.message}
                      </FormFeedback>
                    )}
                    <FormText>
                      سقف واریز امروز این کارت: ۵۰ میلیون تومان
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
                      <Label htmlFor={name}>مبلغ واریز: </Label>
                      <a href="#">
                        <span className="full-withraw mt-1">
                          حداکثر مبلغ واریز
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
                      <FormFeedback tooltip>
                        {errors[name]?.message}
                      </FormFeedback>
                    )}
                    <FormText>کارمزد دریافت تتر: صفر USDT </FormText>
                  </FormGroup>
                )}
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <div className="d-flex flex-row justify-content-evenly">
              <Button
                color="primary"
                outline
                type="submit"
                disabled={formLoading}
              >
                {formLoading && <Spinner />}
                ساخت کیف پول
              </Button>
            </div>
          </Row>
        </form>
      ) : (
        <>
          <Row className="mt-4">
            <Col xs={12} lg={6}>
              <FormGroup className="position-relative">
                <Label htmlFor="networkName">نام شبکه انتخابی:</Label>
                <Input
                  disabled
                  type="text"
                  name="networkName"
                  id="networkName"
                  value={result.networkName}
                />
              </FormGroup>
            </Col>
            <Col xs={12} lg={6}>
              <FormGroup>
                <Label htmlFor="walletAddress"> شماره شبا:</Label>
                <CopyInput text={result.walletAddress} />
              </FormGroup>
            </Col>
            <Col xs={12} lg={6}>
              <FormGroup className="position-relative">
                <Label htmlFor="amountResult"> مبلغ واریز:</Label>
                <Input
                  disabled
                  type="text"
                  name="amountResult"
                  id="amountResult"
                  value={result.amount}
                />
              </FormGroup>
            </Col>
            <Col xs={12} lg={6}>
              <FormGroup className="position-relative">
                <Label htmlFor="endTime"> زمان اتمام تراکنش:</Label>
                <Input
                  disabled
                  type="text"
                  name="endTime"
                  id="endTime"
                  value={result.endTime}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-4">
            <div className="d-flex flex-row justify-content-evenly">
              <Button color="primary" type="button">
                تغییر مبلغ یا شبکه واریز
              </Button>
              <Button color="danger" outline type="button">
                لغو تراکنش
              </Button>
            </div>
          </Row>
        </>
      )}
    </div>
  );
};

export default DepositCrypto;
