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
import {
  useDepositMutation,
  useWalletsQuery,
} from "store/api/wallet-management";
import { useDisconnectDebitMutation } from "store/api/profile-management";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty } from "lodash";
import { useAppSelector } from "store/hooks";

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
  const { refetch } = useWalletsQuery();
  const { token } = useAppSelector((state) => state.auth);
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
      bankAccountId: data.bankId,
      flow: "DEBIT",
    });

  const handleList = useCallback(() => {
    if (data.length <= 0) {
      setHasAccount(false);
    } else {
      setOptions(
        data.map((bank) => {
          let result = "";
          try {
            // Fetch the image data from your API
            const response: any = fetch(
              `${import.meta.env.VITE_BASE_URL}admin/banks/logo/${bank.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            const imageData = response.blob();
            result = URL.createObjectURL(imageData);
          } catch (error) {
            console.error("Error fetching image:", error);
          }

          return {
            content: (
              <div>
                <img
                  width="28"
                  src={!isEmpty(result) ? result : iranianBankIcons[0].src}
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
  }, [data, reset, token]);

  const handleClose = useCallback(() => {
    if (isSuccess || successDisconnect) {
      onClose?.();
      refetch();
    }
  }, [isSuccess, onClose, refetch, successDisconnect]);

  // ==============|| Life Cycle ||================= //
  useEffect(() => handleList(), [handleList]);
  useEffect(() => {
    handleClose();
  }, [handleClose]);

  // ==============|| Render ||================= //
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <AlertInfo
        hasIcon
        text="می توانید برای تغییر حساب انتخاب شده، از قابلیت قطع دسترسی به حساب و تنظیم مجدد برداشت مستقیم استفاده کنید."
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
              onClick={() => {
                !isLoading && data && disconnect(data[0]?.id);
              }}
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
