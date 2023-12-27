import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AlertWarning } from "components/AlertWidget";
import OtpInput from "react-otp-input";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import { Controller, useForm } from "react-hook-form";
import Currency from "components/Input/CurrencyInput";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Label,
  Modal,
  Row,
  Spinner,
} from "reactstrap";
import { useBankAccountsQuery } from "store/api/profile-management";
import { useEffect, useState } from "react";
import { useResendOtpWithdrawMutation, useVerifyOtpWithdrawMutation, useWithdrawMutation } from "store/api/wallet-management";
import turkeyFlag from "assets/img/icons/flag-turkey.png";
import lirFlag from "assets/img/coins/lira.png";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import { useAppSelector } from "store/hooks";
import toast from "react-hot-toast";
import WithdrawOTP from "components/WithdrawOTP";
import Dialog from "components/Dialog";
import { set } from "lodash";

type Props = {
  onClose: () => void;
  stock: number;
  currency: string;
  open: boolean;
  onCloseModal: () => void;
  setTransactionId: (id: string) => void
  setShowOtp: () => void
};
type FiatFormType = {
  network: string;
  destination: string;
  iban: string;
  amount: string;
  destinationCountry: string;
};

const WithdrawFiat = ({ onClose, stock, currency, open, onCloseModal, setTransactionId, setShowOtp }: Props) => {
  const [accountOptions, setAccountOptions] = useState<OptionType[] | []>([]);
  const [otpCode, setOtpCode] = useState("");
  const [verifyOtpWithdraw, { isSuccess: isVerifySuccess }] = useVerifyOtpWithdrawMutation()
  const [resendOtpWithdraw, { isSuccess: isResendSuccess }] = useResendOtpWithdrawMutation()
  const user = useAppSelector((state) => state.user);
  const { data: accounts, isSuccess: getSuccessAccounts } =
    useBankAccountsQuery({
      filters: "currencyCode||$eq||TRY",
    });

  const [withdrawRequest, { data: response, isLoading, isSuccess, isError }] =
    useWithdrawMutation();

  const resolver = yupResolver(
    Yup.object().shape({
      network: Yup.string().required(),
      destination: Yup.string().required(),
      iban: Yup.string().required(),
      amount: Yup.string().required(),
      destinationCountry: Yup.string().required(),
    }),
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FiatFormType>({
    mode: "onChange",
    defaultValues: {
      network: "TRY",
      destination: "",
      iban: "",
      amount: "",
      destinationCountry: "TRY",
    },
    resolver,
  });

  const onSubmit = async (data: FiatFormType) => {
    if (Number(data.amount) > stock) return toast.error('موجودی شما کافی نمی باشد', { position: 'bottom-left' })

    withdrawRequest({
      currencyCode: "TRY",
      amount: data.amount,
      destination: data.destination,
    }).then((res: any) => {
      setTransactionId(res.data?.id)
      setShowOtp()
      onCloseModal()
    })
  };

  useEffect(() => {
    let list = [] as OptionType[] | [];
    if (accounts && accounts.length > 0) {
      list = accounts.map((item) => ({
        value: item.iban,
        otherOptions: { accountId: item?.id },
        content: (
          <div className={wallet["items-credit"]}>
            {/* <span className={wallet["items-credit__icon"]}>
                <span
                  className="mx-3"
                  dangerouslySetInnerHTML={{ __html: bank.logo }}
                />
              </span> */}
            <span dir="ltr">{"TR" + item.iban}</span>
          </div>
        ),
      }));
    }
    setAccountOptions(list.filter((item) => !item.value.includes("IR")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, getSuccessAccounts]);
  return (
    <div className="px-2">
      <AlertWarning
        hasIcon
        text="در هنگام برداشت به اطلاعات وارد شده دقت نمایید بعد از برداشت، دارایی شما امکان بازگردانی ندارد."
        key="withdraw-alert"
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={12} md={6}>
            <Controller
              name="network"
              control={control}
              render={({ field: { name, value, onChange } }) => (
                <FormGroup>
                  <Label htmlFor={name}> برداشت ارز:</Label>
                  <DropdownInput
                    id={name}
                    value={value}
                    onChange={onChange}
                    options={[
                      {
                        value: "TRY",
                        content: (
                          <div className={wallet["items-credit"]}>
                            <span className={wallet["items-credit__icon"]}>
                              <img
                                className={wallet["lir-icon"]}
                                src={lirFlag}
                                alt="lir"
                              />
                            </span>
                            <span dir="ltr"> لیر ترکیه - TL</span>
                          </div>
                        ),
                      },
                    ]}
                    disabled={true}
                  // hasError={Boolean(errors?.[name])}
                  />
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
                    {/* <a href="#">
                          <span className="full-withraw mt-1">
                            حداکثر مبلغ واریز
                          </span>
                        </a> */}
                  </div>
                  <Currency
                    name={name}
                    value={value}
                    onChange={(val) => setValue(name, val)}
                  // placeholder="مبلغ را به تومان وارد کنید"
                  // hasError={Boolean(errors?.[name])}
                  />
                  {errors?.[name] && (
                    <FormFeedback tooltip>
                      {errors[name]?.message}
                    </FormFeedback>
                  )}
                  <FormText>
                    {` موجودی در دسترس: ${stock} ${currency}`}
                  </FormText>
                </FormGroup>
              )}
            />
          </Col>
          <Col xs={12} md={6}>
            <Controller
              name="destinationCountry"
              control={control}
              render={({ field: { name, value, onChange } }) => (
                <FormGroup>
                  <Label htmlFor={name}> انتقال به کشور:</Label>
                  <DropdownInput
                    id={name}
                    value={value}
                    onChange={onChange}
                    options={[
                      {
                        value: "TRY",
                        content: (
                          <div className={wallet["items-credit"]}>
                            <span className={wallet["items-credit__icon"]}>
                              <img
                                className={wallet["lir-icon"]}
                                src={turkeyFlag} alt="lir" />
                            </span>
                            <span dir="ltr"> ترکیه</span>
                          </div>
                        ),
                      },
                    ]}
                    disabled={true}
                  // hasError={Boolean(errors?.[name])}
                  />
                </FormGroup>
              )}
            />
          </Col>
          <Col xs={12} md={6}>
            <Controller
              name="iban"
              control={control}
              render={({ field: { name, value } }) => (
                <FormGroup>
                  <Label htmlFor={name}> واریز به حساب:</Label>
                  <DropdownInput
                    id={name}
                    value={value}
                    onChange={(val, otherOption) => {
                      setValue(name, val);
                      setValue("destination", otherOption.accountId);
                    }}
                    options={accountOptions}
                  // hasError={Boolean(errors?.[name])}
                  />
                </FormGroup>
              )}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <div className="text-center">
            <Button
              className="px-5 py-3"
              color="primary"
              outline
              type="submit"
            >
              {isLoading ? (
                <Spinner style={{ color: "white" }} />
              ) : (
                "  ثبت درخواست برداشت"

              )}
            </Button>
          </div>
        </Row>
      </Form>

    </div>
  );

};

export default WithdrawFiat;
