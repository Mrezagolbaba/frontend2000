import { useForm } from "@refinedev/core";
import { AlertInfo, AlertWarning } from "components/AlertWidget";
import * as Yup from "yup";

import wallet from "pages/dashboard/wallet/style.module.scss";

// import eth from "assets/img/network/eth.svg";
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
import { CurrencyType } from "../../constants";

type CryptoFormType = {
  network: string;
  amount: string;
};

const DepositCrypto = ({
  onClose,
  currency,
}: {
  onClose: () => void;
  currency: string;
}) => {
  const [showResult, setShowResult] = useState<boolean>(false);
  const [result, setResult] = useState({
    networkName: "",
    walletAddress: "",
    amount: "",
    endTime: "",
  });

  // const { data, isSuccess } = useList<CurrencyType>({
  //   resource: "currencies",
  // });

  const { formLoading, onFinish } = useForm({
    action: "create",
    resource: "transactions/deposit",
    onMutationSuccess: (data, variables, context, isAutoSave) => {
      setShowResult(true);
      setResult({
        networkName: data.data.currencyCode,
        walletAddress: data.data.providerData.flowWalletAddress,
        amount: data.data.amount,
        endTime: new Date(data.data.expiresAt).toLocaleDateString("fa-IR"),
      });
      console.log("looooooooooog", { data, variables, context, isAutoSave });
    },
  });

  const optionList: OptionType[] = [
    {
      content: (
        <div className={wallet["items-credit"]}>
          <span className={wallet["items-credit__icon"]}>
            <img alt="TRC20" src={tron} className="bank-svg" />
          </span>
          <span>TRC20</span>
        </div>
      ),
      value: "TRC20",
    },
  ];

  const resolver = yupResolver(
    Yup.object().shape({
      amount: Yup.string().required(),
      network: Yup.string().required(),
    })
  );

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useRHF<CryptoFormType>({
    mode: "onChange",
    defaultValues: {
      network: "TRC20",
      amount: "",
    },
    resolver,
  });
  const onSubmit = (data: CryptoFormType) => {
    onFinish({
      currencyCode: currency,
      amount: data.amount,
    });
  };

  const handleClose = () => {
    reset({
      network: "TRC20",
      amount: "",
    });
    setResult({
      networkName: "",
      walletAddress: "",
      amount: "",
      endTime: "",
    });
    setShowResult(false);
    onClose?.();
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
                      disabled={true}
                      // hasError={Boolean(errors?.[name])}
                    />
                    {errors?.[name] && (
                      <FormFeedback tooltip>
                        {errors[name]?.message}
                      </FormFeedback>
                    )}
                    <FormText>سقف واریز</FormText>
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
                      // placeholder="مبلغ را به تومان وارد کنید"
                      hasError={Boolean(errors?.[name])}
                    />
                    {errors?.[name] && (
                      <FormFeedback tooltip>
                        {errors[name]?.message}
                      </FormFeedback>
                    )}
                    <FormText>کارمزد دریافت تتر: صفر {currency} </FormText>
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
                className="px-5 py-3"
              >
                {formLoading ? <Spinner /> : "ساخت کیف پول"}
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
                  value="TRC20"
                />
              </FormGroup>
            </Col>
            <Col xs={12} lg={6}>
              <FormGroup>
                <Label htmlFor="walletAddress"> آدرس کیف پول:</Label>
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
                  dir="ltr"
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
              <Button
                color="primary"
                type="button"
                className="px-5 py-3"
                onClick={() => {
                  setShowResult(false);
                  setResult({
                    networkName: "",
                    walletAddress: "",
                    amount: "",
                    endTime: "",
                  });
                }}
              >
                تغییر مبلغ یا شبکه واریز
              </Button>
              <Button
                className="px-5 py-3"
                color="danger"
                outline
                onClick={handleClose}
              >
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
