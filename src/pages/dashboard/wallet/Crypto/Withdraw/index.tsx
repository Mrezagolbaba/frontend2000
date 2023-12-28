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

import wallet from "assets/scss/dashboard/wallet.module.scss";

// import eth from "assets/img/network/eth.svg";
import tron from "assets/img/network/tron.svg";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import Currency from "components/Input/CurrencyInput";
import { useState } from "react";
import { useForm } from "@refinedev/core";
import toast from "react-hot-toast";
import {
  useResendOtpWithdrawMutation,
  useVerifyOtpWithdrawMutation,
} from "store/api/wallet-management";

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
      network: Yup.string().required(),
      amount: Yup.string().required(),
      destination: Yup.string().required(),
    }),
  );
  const { formLoading, onFinish } = useForm({
    action: "create",
    resource: "transactions/withdraw",
    onMutationSuccess: (data, variables, context, isAutoSave) => {
      setShowOtp();
      onCloseModal();
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useRHF<CryptoFormType>({
    mode: "onChange",
    defaultValues: {
      network: "TRC20",
      amount: "",
      destination: "",
    },
    resolver,
  });
  const onSubmit = async (data: CryptoFormType) => {
    if (Number(data.amount) > stock)
      toast.error("مبلغ انتخابی بیش تر از موجودی شما می باشد.", {
        position: "bottom-left",
      });
    else
      onFinish({
        currencyCode: currency,
        amount: data.amount,
        destination: data.destination,
      }).then((res: any) => {
        if (res) {
          setTransactionId(res.data?.id);
        }
      });
  };

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
                    onChange={(val) => setValue(name, val)}
                    // placeholder="مبلغ را به تومان وارد کنید"
                    hasError={Boolean(errors?.[name])}
                  />
                  {errors?.[name] && (
                    <FormFeedback tooltip>{errors[name]?.message}</FormFeedback>
                  )}
                  <FormText>
                    موجودی شما: {stock} {currency}
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
                    onChange={onChange}
                    placeholder="آدرس کیف پول خود را وارد کنید"
                    // hasError={Boolean(errors?.[name])}
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
