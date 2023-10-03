import { yupResolver } from "@hookform/resolvers/yup";
import { AlertInfo, AlertWarning } from "components/AlertWidget";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from "reactstrap";

import wallet from "pages/dashboard/wallet/style.module.scss";

import eth from "assets/img/network/eth.svg";
import tron from "assets/img/network/tron.svg";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import Currency from "components/Input/CurrencyInput";
import { useState } from "react";

type CryptoFormType = {
  network: string;
  amount: string;
};

const WithdrawCrypto = () => {
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const optionList: OptionType[] = [
    {
      content: (
        <div className={wallet["items-credit"]}>
          <span className={wallet["items-credit__icon"]}>
            <img alt="ترون" src={tron} className="bank-svg" />
          </span>
          <span>TRC20 - ترون</span>
        </div>
      ),
      value: "1",
    },
    {
      content: (
        <div className={wallet["items-credit"]}>
          <span className={wallet["items-credit__icon"]}>
            <img alt="اتریوم" src={eth} className="bank-svg" />
          </span>

          <span className="text">TRC20 - اتریوم</span>
        </div>
      ),
      value: "2",
    },
  ];

  const resolver = yupResolver(
    Yup.object().shape({
      network: Yup.string().required(),
      amount: Yup.string().required(),
    })
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CryptoFormType>({
    mode: "onChange",
    defaultValues: {
      network: "1",
      amount: "",
    },
    resolver,
  });
  const onSubmit = async (data: CryptoFormType) => {
    console.log(data);
    // setShowResult(true);
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
                      // hasError={Boolean(errors?.[name])}
                    />
                    {errors?.[name] && (
                      <FormFeedback tooltip>
                        {errors[name]?.message}
                      </FormFeedback>
                    )}
                    <FormText>
                      سقف واریز امروز این کارت: ۵۰ میلیون تومان
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
                        <span className="full-withraw mt-1">
                          حداکثر مبلغ واریز
                        </span>
                      </a>
                    </div>
                    <Currency
                      name={name}
                      value={value}
                      placeholder="مبلغ را به تومان وارد کنید"
                      hasError={Boolean(errors?.[name])}
                    />
                    {errors?.[name] && (
                      <FormFeedback tooltip>
                        {errors[name]?.message}
                      </FormFeedback>
                    )}
                    <FormText> موجودی شما: 233 USDT </FormText>
                  </FormGroup>
                )}
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <div className="d-flex flex-row justify-content-evenly">
              <Button color="primary" outline type="submit">
                ثبت درخواست برداشت
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
    </div>
  );
};

export default WithdrawCrypto;
