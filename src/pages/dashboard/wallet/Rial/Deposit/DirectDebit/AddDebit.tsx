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
import RenderBankItem from "./RenderBankItem";
import { AlertInfo } from "components/AlertWidget";
import { Controller, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AddDebit() {
  // ==============|| States ||================= //
  const [isRedirect, setIsRedirect] = useState<boolean>(false);
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
      if (data.length > 0) {
        setOptionList(
          data.map((bank) => {
            return {
              content: (
                <RenderBankItem
                  id={bank.id}
                  name={bank.name}
                  website={bank.website}
                  logoPath={bank.logoPath as string}
                />
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
      setIsRedirect(true);
      window.location.replace(debit?.url);
    }
  }, [debit, successDebit]);

  // ==============|| Render ||================= //
  return (
    <>
      {isRedirect && (
        <div className="overlay-redirect">
          <Spinner />
          <span>درحال انتقال به صفحه مورد نظر ...</span>
        </div>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <AlertInfo
          hasIcon
          text="شماره موبایلی که در حساب کاربری آرسونیکس خود وارد کرده اید؛ باید با شماره موبایل حساب بانکی شما یکسان باشد."
        />
        <AlertInfo
          hasIcon
          text="کاربر گرامی، امکان فعالسازی این سرویس فقط با IP ایران میسر می‌باشد، لطفا در صورت استفاده از فیلترشکن آن را خاموش نمایید."
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
    </>
  );
}
