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
  Spinner,
} from "reactstrap";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import Currency from "components/Input/CurrencyInput";
import { AlertInfo } from "components/AlertWidget";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import { formatShowAccount, searchIranianBanks } from "helpers/filesManagement";
import { useBankAccountsQuery } from "store/api/profile-management";
import { useDepositMutation } from "store/api/wallet-management";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "store/hooks";

type CreditCardForm = {
  accountNumber: string;
  amount: string;
  accountId: string;
};

const CreditCardForm = () => {
  const { firstName, lastName, secondTierVerified } = useAppSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const [hasAccount, setHasAccount] = useState<boolean>(true);
  const [optionList, setOptionList] = useState<OptionType[] | any[]>([]);

  const { data, isSuccess } = useBankAccountsQuery({});

  const [
    depositRequest,
    { data: response, isLoading, isSuccess: isSubmitSuccess },
  ] = useDepositMutation();

  const resolver = yupResolver(
    Yup.object().shape({
      accountNumber: Yup.string().required(),
      amount: Yup.string().required(),
      accountId: Yup.string().required(),
    })
  );
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreditCardForm>({
    mode: "onChange",
    defaultValues: {
      accountNumber: "",
      amount: "",
      accountId: "",
    },
    resolver,
  });
  const onSubmit = async (data: CreditCardForm) => {
    depositRequest({
      currencyCode: "IRR",
      amount: (Number(data.amount) * 10).toString(),
      bankAccountId: data.accountId,
      flow: "REDIRECT",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      if (data.length <= 0) {
        setHasAccount(false);
      } else {
        setOptionList(
          data.map((account) => {
            const bank =
              account.cardNumber && searchIranianBanks(account.cardNumber);
            return {
              content: (
                <div className={wallet["items-credit"]}>
                  {bank && bank.logo && (
                    <span className={wallet["items-credit__icon"]}>
                      <span
                        className="mx-3"
                        dangerouslySetInnerHTML={{ __html: bank.logo }}
                      />
                    </span>
                  )}

                  <span dir="ltr">
                    {account?.cardNumber &&
                      formatShowAccount(account?.cardNumber)}
                  </span>
                </div>
              ),
              otherOptions: { accountId: account?.id },
              value: account?.cardNumber ? account?.cardNumber : "",
            };
          })
        );
        setHasAccount(true);
        reset({
          accountNumber: data[0]?.cardNumber,
          accountId: data[0]?.id,
          amount: "",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);

  useEffect(() => {
    if (isSubmitSuccess && response) {
      window.location.replace(response.providerData.flowRedirectUrl);
    }
  }, [isSubmitSuccess, navigate, response]);

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
                  onChange={(val, otherOption) => {
                    setValue("accountId", otherOption.accountId);
                    setValue(name, val);
                  }}
                  options={optionList}
                  hasError={Boolean(errors?.[name])}
                />
                {errors?.[name] && (
                  <FormFeedback tooltip>{errors[name]?.message}</FormFeedback>
                )}
                <FormText>
                  {`سقف واریز: ${
                    secondTierVerified ? "نامحدود" : "ا میلیون تومان"
                  }`}
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
                    <span className="full-withraw mt-1">حداکثر مبلغ واریز</span>
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
          <Button
            className="px-5 py-3"
            color="primary"
            outline
            type="submit"
            disabled={isLoading || isSubmitSuccess}
          >
            {isLoading ? <Spinner /> : "انتقال به درگاه پرداخت"}
          </Button>
          {!secondTierVerified && (
            <Button
              className="px-5 py-3"
              color="primary"
              type="button"
              onClick={() => {}}
            >
              احراز هویت سطح دو
            </Button>
          )}
        </div>
      </Row>
    </form>
  ) : (
    <Row>
      <AlertInfo
        text={`شما هیچ حسابی به پروفایل خود اضافه نکرده‌اید، ابتدا یک حساب به نام  ${firstName} ${lastName} به پروفایل خود اضافه کنید.`}
        hasIcon={true}
      />
      <div className="text-center mt-3">
        <Button
          color="primary"
          type="button"
          className="px-5 py-3"
          onClick={() => navigate("/dashboard/profile")}
          outline
        >
          افزودن حساب بانکی
        </Button>
      </div>
    </Row>
  );
};

export default CreditCardForm;
