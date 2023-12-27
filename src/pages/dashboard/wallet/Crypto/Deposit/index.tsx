import { AlertInfo, AlertWarning } from "components/AlertWidget";
import * as Yup from "yup";

import wallet from "assets/scss/dashboard/wallet.module.scss";

// import eth from "assets/img/network/eth.svg";
import tron from "assets/img/network/tron.svg";
import DropdownInput, { OptionType } from "components/Input/Dropdown";
import { Controller, useForm as useRHF } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { useEffect, useState } from "react";
import CopyInput from "components/Input/CopyInput";
import {
  useCancelTransactionMutation,
  useDepositMutation,
  useTransactionFeeQuery,
} from "store/api/wallet-management";
import { success } from "assets/scss/components/Alert/style.module.scss";
import CountdownTimer from "components/Input/CountDownInput";
type CryptoFormType = {
  network: string;
};

type Props = {
  onClose: () => void;
  currency: any;
};

const DepositCrypto = ({ onClose, currency }: Props) => {
  const { data: fee } = useTransactionFeeQuery(currency);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [result, setResult] = useState({
    networkName: "",
    walletAddress: "",
    amount: "",
    endTime: "",
  });

  const [depositRequest, { data, isLoading, isSuccess }] = useDepositMutation();
  const [cancelTransaction] = useCancelTransactionMutation();

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
    }),
  );

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useRHF<CryptoFormType>({
    mode: "onChange",
    defaultValues: {
      network: "TRC20",
    },
    resolver,
  });
  const onSubmit = (data: CryptoFormType) => {
    depositRequest({
      currencyCode: currency,
      amount: "1",
      flow: "MANUAL_WITH_WALLET_ADDRESS",
    });
  };

  const handleClose = () => {
    reset({
      network: "TRC20",
    });
    setResult({
      networkName: "",
      walletAddress: "",
      amount: "",
      endTime: "",
    });
    setShowResult(false);
    data && cancelTransaction(data.id);
    onClose?.();
  };

  useEffect(() => {
    if (success && data) {
      setShowResult(true);
      setResult({
        networkName: data.currencyCode,
        walletAddress: data.providerData.flowWalletAddress,
        amount: data.amount,
        endTime: data.expiresAt as string,
      });
    }
  }, [data, isSuccess]);

  return (
    <div className="px-2">
      <AlertWarning
        hasIcon
        text="در هنگام واریز به شبکه انتخابی دقت فرمایید در صورت واریز به شبکه
          اشتباه دارایی شما از دست خواهد رفت ، همچنین از واریز قرارداد هوشمند
          خودداری فرمایید."
      />
      <AlertInfo
        hasIcon
        text=" برای امنیت شما در مقابل تهدید های (تحریم شهروندان ایرانی)
          بین المللی، آرسونیکس در هر واریز کیف پول کابران را به طور کامل
          تغییر می دهد."
      />
      {!showResult ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col xs={12} lg={6}>
              <Controller
                name="network"
                control={control}
                render={({ field: { name, value } }) => (
                  <FormGroup className="position-relative">
                    <Label htmlFor={name}> شبکه دریافت: </Label>

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
                disabled={isLoading}
                className="px-5 py-3"
              >
                {isLoading ? <Spinner /> : "ساخت کیف پول"}
              </Button>
            </div>
          </Row>
        </form>
      ) : (
        <>
          <Row className="mt-4">
            <Col xs={12} lg={6}>
              <FormGroup className="position-relative">
                <Label htmlFor="networkName">نام شبکه انتخابی:</Label>
                <Input
                  disabled
                  type="text"
                  name="networkName"
                  id="networkName"
                  value="TRC20"
                />
              </FormGroup>
            </Col>
            <Col xs={12} lg={6}>
              <FormGroup>
                <Label htmlFor="walletAddress"> آدرس کیف پول:</Label>
                <CopyInput text={result.walletAddress} />
              </FormGroup>
            </Col>
            <Col xs={12} lg={6}>
              <FormGroup className="position-relative">
                <Label htmlFor="amountResult"> مبلغ واریز:</Label>
                <Input
                  disabled
                  type="text"
                  name="amountResult"
                  id="amountResult"
                  dir="ltr"
                  value={result.amount}
                />
              </FormGroup>
            </Col>
            <Col xs={12} lg={6}>
              <FormGroup className="position-relative">
                <Label htmlFor="endTime"> زمان اتمام تراکنش:</Label>
                <Input
                  disabled
                  type="text"
                  name="endTime"
                  id="endTime"
                  value={result.endTime}
                />
                <CountdownTimer targetDate={result.endTime} />
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-4">
            <div className="d-flex flex-row justify-content-evenly">
              <Button
                color="primary"
                type="button"
                className="px-5 py-3"
                onClick={() => {
                  setShowResult(false);
                  setResult({
                    networkName: "",
                    walletAddress: "",
                    amount: "",
                    endTime: "",
                  });
                }}
              >
                تغییر مبلغ یا شبکه واریز
              </Button>
              <Button
                className="px-5 py-3"
                color="danger"
                outline
                onClick={handleClose}
              >
                لغو تراکنش
              </Button>
            </div>
          </Row>
        </>
      )}
    </div>
  );
};

export default DepositCrypto;
