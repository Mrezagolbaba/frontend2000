import { yupResolver } from "@hookform/resolvers/yup";
import { AlertInfo, AlertWarning } from "components/AlertWidget";
import * as Yup from "yup";
import { Controller, useForm as useRHF } from "react-hook-form";
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
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import Currency from "components/Input/CurrencyInput";
import { useEffect } from "react";

import tron from "assets/img/network/tron.svg";

import wallet from "assets/scss/dashboard/wallet.module.scss";

import {
  useTransactionFeeQuery,
  useWithdrawMutation,
} from "store/api/wallet-management";
import { coinShow } from "helpers";

type CryptoFormType = {
  network: string;
  amount: string;
  destination: string;
};

const WithdrawCrypto = ({
  onClose,
  currency,
  stock,
  onCloseModal,
  setShowOtp,
  setTransactionId,
}: {
  onClose: () => void;
  currency: string;
  stock: number;
  onCloseModal: () => void;
  setShowOtp: () => void;
  setTransactionId: (id: string) => void;
}) => {
  //hooks
  const { data: fee } = useTransactionFeeQuery("USDT");
  const [withdraw, { data: response, isLoading: formLoading, isSuccess }] =
    useWithdrawMutation();
  const resolver = yupResolver(
    Yup.object().shape({
      network: Yup.string().required(),
      amount: Yup.string().required("مبلغ برداشت را وارد کنید."),
      destination: Yup.string().required("آدرس کیف پول را وارد کنید."),
    }),
  );
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useRHF<CryptoFormType>({
    mode: "onChange",
    defaultValues: {
      network: "TRC20",
      amount: "",
      destination: "",
    },
    resolver,
  });

  //constants
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

  //handlers
  const onSubmit = async (data: CryptoFormType) => {
    if (data.destination.length < 34)
      setError("destination", {
        type: "manual",
        message: "آدرس کیف پول وارد شده صحیح نمی باشد.",
      });
    else if (Number(data.amount) < fee?.withdrawMinAmount)
      setError("amount", {
        type: "manual",
        message: `مبلغ وارد شده نمی تواند کمتر از ${coinShow(fee?.withdrawMinAmount, "USDT")} باشد.`,
      });
    else if (Number(data.amount) > stock)
      setError("amount", {
        type: "manual",
        message: "موجودی کیف پول شما کافی نیست.",
      });
    else
      withdraw({
        currencyCode: currency,
        amount: data.amount,
        destination: data.destination,
      });
  };

  //life-cycle
  useEffect(() => {
    if (isSuccess) {
      setTransactionId(response?.id as string);
      setShowOtp();
      onCloseModal();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, response]);

  console.log(errors);

  //render
  return (
    <div className="px-2">
      <AlertWarning
        hasIcon
        text="در هنگام برداشت به آدرس وارد شده نمایید در صورت برداشت اشتباه ارز
          دیجیتال از دست خواهد رفت."
      />
      <AlertInfo
        hasIcon
        text="انتقال داخلی (آرسونیکس به آرسونیکس) هیچ کارمزدی ندارد."
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={12} lg={6}>
            <Controller
              name="network"
              control={control}
              render={({ field: { name, value } }) => (
                <FormGroup className="position-relative">
                  <Label htmlFor={name}> شبکه برداشت: </Label>

                  <DropdownInput
                    id={name}
                    value={value}
                    onChange={(val) => setValue(name, val)}
                    options={optionList}
                    disabled={true}
                    // hasError={Boolean(errors?.[name])}
                  />
                  {errors?.[name] && (
                    <FormFeedback tooltip>{errors[name]?.message}</FormFeedback>
                  )}
                  {/* <FormText>سقف واریز</FormText> */}
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
                  </div>
                  <Currency
                    name={name}
                    value={value}
                    onChange={(val) => {
                      clearErrors(name);
                      setValue(name, val);
                    }}
                    hasError={Boolean(errors?.amount)}
                  />
                  {errors?.[name] && (
                    <FormFeedback tooltip>{errors[name]?.message}</FormFeedback>
                  )}
                  <FormText>
                    موجودی شما: {coinShow(stock.toString(), "USDT")}
                  </FormText>
                </FormGroup>
              )}
            />
          </Col>
          <Col xs={12} lg={6}>
            <Controller
              name="destination"
              control={control}
              render={({ field: { name, value, onChange } }) => (
                <FormGroup className="position-relative">
                  <div className="d-flex flex-row justify-content-between">
                    <Label htmlFor={name}> آدرس کیف پول: </Label>
                  </div>
                  <Input
                    name={name}
                    value={value}
                    onChange={(e) => {
                      clearErrors(name);
                      onChange(e);
                    }}
                    className="latin-font"
                    invalid={Boolean(errors?.destination)}
                  />
                  {errors?.[name] && (
                    <FormFeedback tooltip>{errors[name]?.message}</FormFeedback>
                  )}
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
              className="px-5 py-3"
              disabled={formLoading}
            >
              {formLoading ? <Spinner /> : "ثبت درخواست برداشت"}
            </Button>
          </div>
        </Row>
      </form>
    </div>
  );
};

export default WithdrawCrypto;
