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
import {
  useBanksQuery,
  useDebitSubscriptionMutation,
} from "store/api/profile-management";
import * as Yup from "yup";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import { AlertInfo } from "components/AlertWidget";
import { Controller, useForm } from "react-hook-form";
import { iranianBankIcons } from "helpers/filesManagement/banksList";
import { useCallback, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AddDebit() {
  // ==============|| States ||================= //
  const [hasAccount, setHasAccount] = useState<boolean>(true);
  const [optionList, setOptionList] = useState<OptionType[] | any[]>([]);

  // ==============|| Validation ||================= //
  const resolver = yupResolver(
    Yup.object().shape({
      bankId: Yup.string().required("انتخاب بانک مبدا الزامی است."),
    }),
  );

  // ==============|| Hooks ||================= //
  const { data, isSuccess, isLoading } = useBanksQuery({
    filter: ["currencyCode||$eq||IRR", "vandarDebitCode||$ne||'null'"],
  });
  const [
    debitRequest,
    { data: debit, isSuccess: successDebit, isLoading: loadingDebit },
  ] = useDebitSubscriptionMutation();
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
    },
    resolver,
  });

  // ==============|| Handlers ||================= //
  const onSubmit = (data) => {
    debitRequest(data.bankId);
  };
  const handleList = useCallback(() => {
    if (isSuccess) {
      if (data.length <= 0) {
        setHasAccount(false);
      } else {
        setOptionList(
          data.map((bank) => {
            const bankIcon = iranianBankIcons.find(
              (item) => item.name === bank.logoPath,
            );

            return {
              content: (
                <div>
                  <img
                    src={bankIcon ? bankIcon?.src : iranianBankIcons[0].src}
                    alt={bank.name}
                  />
                  <span className="mx-2">{bank.website}</span>
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
    }
  }, [data, isSuccess, reset]);

  // ==============|| Life Cycle ||================= //
  useEffect(() => handleList(), [handleList]);
  useEffect(() => {
    if (successDebit && debit) {
      window.location.replace(debit?.url);
    }
  }, [debit, successDebit]);

  // ==============|| Render ||================= //
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <AlertInfo
        hasIcon
        text="شماره موبایلی که در حساب کاربری آرسونیکس خود وارد کرده اید؛ باید با شماره موبایل حساب بانکی شما یکسان باشد."
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
                  options={optionList}
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
              disabled={loadingDebit || isLoading}
              color="primary"
              outline
              type="submit"
              className="px-5 py-3"
            >
              {loadingDebit || isLoading ? <Spinner /> : "ثبت و ادامه"}
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}