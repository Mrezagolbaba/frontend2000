import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import * as Yup from "yup";
import Currency from "components/Input/CurrencyInput";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import { AlertInfo } from "components/AlertWidget";
import { Controller, useForm } from "react-hook-form";
import { iranianBankIcons } from "helpers/filesManagement/banksList";
import { useCallback, useEffect, useState } from "react";
import { useDepositMutation } from "store/api/wallet-management";
import { useDisconnectDebitMutation } from "store/api/profile-management";
import { yupResolver } from "@hookform/resolvers/yup";

export default function DepositDebit({
  data,
  isLoading,
  onClose,
}: {
  data: any;
  isLoading: boolean;
  onClose: () => void;
}) {
  // ==============|| States ||================= //
  const [options, setOptions] = useState<OptionType[]>([]);
  const [hasAccount, setHasAccount] = useState<boolean>(false);

  // ==============|| Validation ||================= //
  const resolver = yupResolver(
    Yup.object().shape({
      bankId: Yup.string().required("انتخاب بانک مبدا الزامی است."),
      amount: Yup.string().required("لطفا مبلغ مورد نظر خود را وارد کنید."),
    }),
  );

  // ==============|| Hooks ||================= //
  const [depositRequest, { isLoading: loadingDeposit, isSuccess }] =
    useDepositMutation();
  const [
    disconnect,
    { isLoading: loadingDisconnect, isSuccess: successDisconnect },
  ] = useDisconnectDebitMutation();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      bankId: "",
      amount: "",
    },
    resolver,
  });

  // ==============|| Handlers ||================= //
  const onSubmit = (data) =>
    depositRequest({
      currencyCode: "IRR",
      amount: (Number(data.amount) * 10).toString(),
      bankAccountId: data.accountId,
      flow: "DEBIT",
    });
  const handleList = useCallback(() => {
    if (data.length <= 0) {
      setHasAccount(false);
    } else {
      setOptions(
        data.map((bank) => {
          const bankIcon = iranianBankIcons.find(
            (item) => item.name === bank?.bank.logoPath,
          );

          return {
            content: (
              <div>
                <img
                  width="28"
                  src={bankIcon ? bankIcon?.src : iranianBankIcons[0].src}
                  alt={bank?.bank.name}
                />
                <span className="mx-2">{bank?.bank.website}</span>
              </div>
            ),
            value: bank.id,
          };
        }),
      );
      reset({
        bankId: data[0].id,
      });
    }
  }, [data, reset]);

  // ==============|| Life Cycle ||================= //
  useEffect(() => handleList(), [handleList]);
  useEffect(() => {
    if (isSuccess || successDisconnect) {
      onClose?.();
    }
  }, [successDisconnect, isSuccess, onClose]);

  // ==============|| Render ||================= //
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <AlertInfo
        hasIcon
        text="می توانید برای تغییر حساب انتخاب شده، از قابلیت قطع دسترسی به حساب و تنظیم مجدد برداشت سریع استفاده کنید."
      />
      <Row>
        <Col xs={12} lg={6}>
          <Controller
            name="bankId"
            control={control}
            render={({ field: { name, value } }) => (
              <FormGroup className="position-relative">
                <div className="d-flex flex-row justify-content-between">
                  <Label htmlFor={name}> بانک مبدا: </Label>
                </div>
                <DropdownInput
                  id={name}
                  value={value}
                  onChange={(val) => {
                    setValue(name, val);
                  }}
                  options={options}
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
            render={({ field: { name, value, onChange } }) => (
              <FormGroup className="position-relative">
                <div className="d-flex flex-row justify-content-between">
                  <Label htmlFor={name}>مبلغ واریز: </Label>
                </div>
                <Currency
                  name={name}
                  value={value}
                  onChange={onChange}
                  placeholder="مبلغ را به تومان وارد کنید"
                  hasError={Boolean(errors?.[name])}
                />
                {errors?.[name] && (
                  <FormFeedback tooltip>{errors[name]?.message}</FormFeedback>
                )}
              </FormGroup>
            )}
          />
        </Col>
        <Col xs={12}>
          <div className="text-center mt-3">
            <Button
              disabled={isLoading || loadingDeposit || loadingDisconnect}
              color="primary"
              outline
              type="submit"
              className="px-5 py-3 mx-2"
            >
              {loadingDeposit || isLoading ? <Spinner /> : "تایید برداشت سریع"}
            </Button>
            <Button
              disabled={loadingDisconnect || isLoading || loadingDeposit}
              color="primary"
              type="button"
              className="px-5 py-3 mx-2"
              onClick={() => disconnect(data?.bankId)}
            >
              {loadingDisconnect || isLoading ? (
                <Spinner />
              ) : (
                "قطع دسترسی به حساب"
              )}
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}