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

import wallet from "pages/dashboard/wallet/style.module.scss";

import eth from "assets/img/network/eth.svg";
import tron from "assets/img/network/tron.svg";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import Currency from "components/Input/CurrencyInput";
import { useEffect, useState } from "react";
import { useForm, useList } from "@refinedev/core";
import { CurrencyType } from "../../constants";
import toast from "react-hot-toast";

type CryptoFormType = {
  currencyCode: string;
  amount: string;
  destination: string;
};

const WithdrawCrypto = ({
  onClose,
  wallets,
}: {
  onClose: () => void;
  wallets: any;
}) => {
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [currencyList, setCurrencyList] = useState<CurrencyType[] | null>(null);
  const [stock, setStock] = useState<number>(0);
  const [stockCode, setStockCode] = useState<string>("");
  const { data, isSuccess } = useList<CurrencyType>({
    resource: "currencies",
  });

  useEffect(() => {
    if (isSuccess)
      setCurrencyList(
        data.data.filter((currency: CurrencyType) => currency.type === "CRYPTO")
      );
  }, [data?.data, isSuccess]);

  const optionList: OptionType[] = currencyList
    ? currencyList.map((currency: CurrencyType) => {
        return {
          content: (
            <div className={wallet["items-credit"]}>
              <span className={wallet["items-credit__icon"]}>
                <img alt={currency.name} src={tron} className="bank-svg" />
              </span>
              <span>{currency.name}</span>
            </div>
          ),
          value: currency.code,
        };
      })
    : [];

  const resolver = yupResolver(
    Yup.object().shape({
      currencyCode: Yup.string().required(),
      amount: Yup.string().required(),
      destination: Yup.string().required(),
    })
  );

  const { formLoading, onFinish } = useForm({
    action: "create",
    resource: "transactions/withdraw",
    onMutationSuccess: (data, variables, context, isAutoSave) => {
      setShowOtp(true);
      console.log("looooooooooog", { data, variables, context, isAutoSave });
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
      currencyCode: "",
      amount: "",
      destination: "",
    },
    resolver,
  });
  const onSubmit = async (data: CryptoFormType) => {
    console.log(data);
    if (Number(data.amount) > stock)
      toast.error("مبلغ انتخابی بیش تر از موجودی شما می باشد.", {
        position: "bottom-left",
      });
    else onFinish(data);
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
                name="currencyCode"
                control={control}
                render={({ field: { name, value } }) => (
                  <FormGroup className="position-relative">
                    <Label htmlFor={name}> شبکه برداشت: </Label>

                    <DropdownInput
                      id={name}
                      value={value}
                      onChange={(val) => {
                        const stockTemp = wallets.filter(
                          (wallet) => val === wallet.currencyCode && wallet
                        );
                        setStock(Number(stockTemp[0]?.balance));
                        setStockCode(stockTemp[0]?.currencyCode);
                        setValue(name, val);
                      }}
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
                      onChange={(val) => setValue(name, val)}
                      placeholder="مبلغ را به تومان وارد کنید"
                      hasError={Boolean(errors?.[name])}
                    />
                    {errors?.[name] && (
                      <FormFeedback tooltip>
                        {errors[name]?.message}
                      </FormFeedback>
                    )}
                    <FormText>
                      موجودی شما: {stock} {stockCode}
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
    </div>
  );
};

export default WithdrawCrypto;
