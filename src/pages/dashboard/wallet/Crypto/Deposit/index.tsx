import { useList } from "@refinedev/core";
import { AlertInfo, AlertWarning } from "components/AlertWidget";
import * as Yup from "yup";

import wallet from "pages/dashboard/wallet/style.module.scss";

import eth from "assets/img/network/eth.svg";
import tron from "assets/img/network/tron.svg";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import { Controller, useForm } from "react-hook-form";
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
} from "reactstrap";
import Currency from "components/Input/CurrencyInput";
import { useState } from "react";
import CopyInput from "components/Input/CopyInput";

type CryptoFormType = {
  network: string;
  amount: string;
};
const DepositCrypto = () => {
  const { data, isSuccess, isError, isLoading } = useList({
    resource: "wallets",
  });

  const [showResult, setShowResult] = useState<boolean>(false);
  const [result, setResult] = useState({
    networkName: "",
    walletAddress: "",
    amount: "",
    endTime: "",
  });

  console.log(data);

  const optionList: OptionType[] = [
    {
      content: (
        <div className={wallet["items-credit"]}>
          <span className={wallet["items-credit__icon"]}>
            <img alt="ترون" src={tron} className="bank-svg" />
          </span>
          <span>TRC20 - ترون</span>
        </div>
      ),
      value: "1",
    },
    {
      content: (
        <div className={wallet["items-credit"]}>
          <span className={wallet["items-credit__icon"]}>
            <img alt="اتریوم" src={eth} className="bank-svg" />
          </span>

          <span className="text">TRC20 - اتریوم</span>
        </div>
      ),
      value: "2",
    },
  ];

  const resolver = yupResolver(
    Yup.object().shape({
      network: Yup.string().required(),
      amount: Yup.string().required(),
    })
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CryptoFormType>({
    mode: "onChange",
    defaultValues: {
      network: "1",
      amount: "",
    },
    resolver,
  });
  const onSubmit = async (data: CryptoFormType) => {
    console.log(data);
    setShowResult(true);
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
                name="network"
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
              <Button color="primary" outline type="submit">
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
