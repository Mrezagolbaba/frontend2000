import { yupResolver } from "@hookform/resolvers/yup";
import { AlertInfo, AlertWarning } from "components/AlertWidget";
import OtpInput from "react-otp-input";
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
import auth from "layouts/auth";
import { useAppSelector } from "store/hooks";
import { LabeLText } from "helpers";
import { useVerifyOtpWithdrawMutation } from "store/api/wallet-management";

type CryptoFormType = {
  network: string;
  amount: string;
  destination: string;
};

const WithdrawCrypto = ({
  onClose,
  currency,
  stock,
}: {
  onClose: () => void;
  currency: string;
  stock: number;
}) => {
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState("");
  const [transactionId, setTransactionId] = useState<string>("");
  const user = useAppSelector((state) => state.user);
  const [verifyOtpWithdraw, { isSuccess }] = useVerifyOtpWithdrawMutation()
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
    })
  );

  const { formLoading, onFinish } = useForm({
    action: "create",
    resource: "transactions/withdraw",
    onMutationSuccess: (data, variables, context, isAutoSave) => {
      setShowOtp(true);
      setTransactionId('data');
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
      });
  };
  const handleSendOtp = async () => {
    await verifyOtpWithdraw({ code: otpCode, transactionId: transactionId }).then((res) => {
      if (isSuccess) {
        toast.success('برداشت با موفقیت انجام شد', { position: 'bottom-left' })
        onClose()
      } else {
        toast.error('کد وارد شده صحیح نمی باشد', { position: 'bottom-left' })
      }
    })
  }

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
      {!showOtp ? (
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
                      <FormFeedback tooltip>
                        {errors[name]?.message}
                      </FormFeedback>
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
      ) : (
        <>
          <AlertInfo
            hasIcon
            text="کد تایید را که در برنامه Google Authenticator تولید شده است، وارد
              کنید و ثبت نهایی را انتخاب کنید."
          />
          <Row>
            <Col xs={12} lg={6}>
              <FormGroup className="position-relative">
                <Label htmlFor="networkName"> روش تایید برداشت:</Label>
                <a href="#">
                  <span className="full-withraw mt-1">ارسال کد به موبایل</span>
                </a>
                <Input
                  disabled
                  type="text"
                  name="networkName"
                  id="networkName"
                  value="Google Authenticator"
                />
              </FormGroup>
            </Col>
            <Col xs={12} lg={6}>
              <div className="col-lg-6">
                <label htmlFor="disabledTextInput">کد تایید برداشت: </label>
                <a href="#">
                  <span className="full-withraw mt-1">
                    ارسال مجدد به موبایل
                  </span>
                </a>
                <div className="mb-4">
                  <div className="code-input-control">
                    {/* <input type="number" className="form-control d-ltr control-auto-focus" maxlength="1" placeholder="-" />
<input type="number" className="form-control d-ltr control-auto-focus" maxlength="1" placeholder="-"/>
<input type="number" className="form-control d-ltr control-auto-focus" maxlength="1" placeholder="-"/>
<input type="number" className="form-control d-ltr control-auto-focus" maxlength="1" placeholder="-"/>
<input type="number" className="form-control d-ltr control-auto-focus" maxlength="1" placeholder="-"/>
<input type="number" className="form-control d-ltr control-auto-focus" maxlength="1" placeholder="-"/> */}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row></Row>
          <div className="row mt-4">
            <div className="col-lg-6">
              <label htmlFor="disabledTextInput">کد تایید برداشت: </label>
              <a href="#">
                <span className="full-withraw mt-1">ارسال مجدد به موبایل</span>
              </a>
              <div className="mb-4">
                <div className="code-input-control">
                  {/* <input type="number" className="form-control d-ltr control-auto-focus" maxlength="1" placeholder="-" />
<input type="number" className="form-control d-ltr control-auto-focus" maxlength="1" placeholder="-"/>
<input type="number" className="form-control d-ltr control-auto-focus" maxlength="1" placeholder="-"/>
<input type="number" className="form-control d-ltr control-auto-focus" maxlength="1" placeholder="-"/>
<input type="number" className="form-control d-ltr control-auto-focus" maxlength="1" placeholder="-"/>
<input type="number" className="form-control d-ltr control-auto-focus" maxlength="1" placeholder="-"/> */}
                </div>
              </div>
            </div>
          </div>
          <Row className="mt-4">
            <div className="d-flex flex-row justify-content-evenly">
              <Button color="primary" type="button">
                ثبت نهایی برداشت
              </Button>
              <Button color="danger" outline type="button">
                لغو برداشت
              </Button>
            </div>
          </Row>
        </>
      )}
      {showOtp && (
        <div className="d-flex justify-content-center align-items-center container">
          <div className="py-5 px-3 d-flex-col justify-content-center align-items-center  " style={{ backgroundColor: '#f1f1f1', borderRadius: '10px' }}>
            <div className="d-flex justify-content-center align-items-center flex-row">
            </div>
            <hr />
            <h6> برای تایید تغییر تایید هویت دو مرحله ای کد ارسال شده به {LabeLText[user.otpMethod]} را وارد کنید </h6>

            <OtpInput
              containerStyle={auth["otp-container"]}
              value={otpCode}
              onChange={(code) => {
                setOtpCode(code);
              }}
              inputStyle={auth["otp-input"]}
              numInputs={6}
              renderSeparator={undefined}
              placeholder={undefined}
              shouldAutoFocus={true}
              renderInput={(props) => <input {...props} />}
            />

            <button disabled={otpCode.length !== 6} className="btn btn-primary mt-4" onClick={handleSendOtp}>تایید</button>
          </div>
        </div>

      )

      }
    </div>
  );
};

export default WithdrawCrypto;
