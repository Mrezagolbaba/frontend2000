import * as Yup from "yup";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Col,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  Label,
  Row,
} from "reactstrap";
import CopyInput from "components/Input/CopyInput";
import { AlertInfo } from "components/AlertWidget";

import saman from "assets/img/bank/Saman.svg";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import { useDepositInfoQuery } from "store/api/wallet-management";

type ShebaFormType = {
  accountName: string;
  shebaNumber: string;
  depositId: string;
  bankName: string;
};
const ShebaForm = () => {
  const [hasLevel2, setHasLevel2] = useState<boolean>(true);

  const { data, isLoading, isSuccess } = useDepositInfoQuery("IRR");

  const resolver = yupResolver(
    Yup.object().shape({
      accountName: Yup.string().required(),
      shebaNumber: Yup.string().required(),
      depositId: Yup.string().required(),
      bankName: Yup.string().required(),
    })
  );
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ShebaFormType>({
    mode: "onChange",
    defaultValues: {
      accountName: "",
      shebaNumber: "",
      depositId: "",
      bankName: "",
    },
    resolver,
  });
  const onSubmit = async (data: ShebaFormType) => {
    console.log(data);
  };

  useEffect(() => {
    if (isSuccess && data && data.length > 0) {
      reset({
        accountName: data[0]?.accountOwnerName,
        shebaNumber: data[0]?.iban,
        bankName: data[0]?.bankName,
      });
    }
  }, [data, isSuccess, reset]);

  return hasLevel2 ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col xs={12} lg={6}>
          <Controller
            name="accountName"
            control={control}
            render={({ field: { name, value, onChange, ref } }) => (
              <FormGroup>
                <Label htmlFor={name}>نام صاحب حساب:</Label>
                <Input
                  disabled
                  type="text"
                  name={name}
                  value={value}
                  onChange={onChange}
                  ref={ref}
                />
              </FormGroup>
            )}
          />
        </Col>
        <Col xs={12} lg={6}>
          <Controller
            name="shebaNumber"
            control={control}
            render={({ field: { name, value } }) => (
              <FormGroup>
                <Label htmlFor={name}> شماره شبا:</Label>
                <CopyInput text={value} />
                <FormText>حداقل مبلغ واریز: 500 هزارتومان</FormText>
              </FormGroup>
            )}
          />
        </Col>
        <Col xs={12} lg={6}>
          <Controller
            name="depositId"
            control={control}
            render={({ field: { name, value } }) => (
              <FormGroup>
                <Label htmlFor={name}> شناسه واریز:</Label>
                <CopyInput text={value} />
                <FormText>کارمزد واریز بین بانکی: صفر تومان</FormText>
              </FormGroup>
            )}
          />
        </Col>
        <Col xs={12} lg={6}>
          <Controller
            name="bankName"
            control={control}
            render={({ field: { name, value, onChange, ref } }) => (
              <FormGroup>
                <Label htmlFor={name}>نام صاحب حساب:</Label>
                <InputGroup className={wallet["bank-name-input"]}>
                  <div className={wallet["input-prepend"]}>
                    <span className={wallet["bank-logo"]}>
                      <img
                        src={saman}
                        className="img-responsive bank-logo"
                        alt="TL"
                      />
                    </span>
                  </div>
                  <Input
                    className={wallet.input}
                    disabled
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    ref={ref}
                  />
                </InputGroup>
              </FormGroup>
            )}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12} className="mt-3">
          <div className="col-lg-12 mt-3">
            <span className={wallet["iban-text"]}>
              1- از حساب&zwnj;هایی که در پروفایل خود وارد کرده&zwnj;اید امکان
              واریز وجود دارد.{" "}
            </span>
            <span className={wallet["iban-text"]}>
              2- شناسه واریز را در قسمت توضیحات یا شناسه واریز وارد نمایید.{" "}
            </span>
            <span className={wallet["iban-text"]}>
              3- تمامی روش&zwnj;های پرداخت بجز روش پل مورد تایید می&zwnj;باشد.{" "}
            </span>
          </div>
        </Col>
      </Row>
    </form>
  ) : (
    <Row>
      <AlertInfo
        text="واریز بین بانکی در صورتی برای شما فعال می‌شود که به سطح دو کاربری ارتقا پیدا کنید."
        hasIcon={true}
      />
      <div className="text-center mt-3">
        <Button color="primary" type="button" onClick={() => {}} outline>
          ارتقاع سطح کاربری
        </Button>
      </div>
    </Row>
  );
};

export default ShebaForm;
