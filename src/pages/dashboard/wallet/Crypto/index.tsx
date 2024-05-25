import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Modal,
  Row,
  Table,
} from "reactstrap";
import {
  useResendOtpWithdrawMutation,
  useVerifyOtpWithdrawMutation,
} from "store/api/wallet-management";
import DepositCrypto from "./Deposit";
import Dialog from "components/Dialog";
import Notify from "components/Notify";
import WithdrawCrypto from "./Withdraw";
import WithdrawOTP from "components/WithdrawOTP";
import teter from "assets/img/coins/tether.svg";
import { coinShow, persianToEnglishNumbers } from "helpers";
import { useAppSelector } from "store/hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import tetherIcon from "assets/img/coins/tether.png";

import wallet from "assets/scss/dashboard/wallet.module.scss";

type Props = {
  balance: string;
  availableBalance: string;
};
export default function USDTWallet({ balance, availableBalance }: Props) {
  // ==============|| States ||================= //
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>("");

  // ==============|| Hooks ||================= //
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [verifyOtpWithdraw] = useVerifyOtpWithdrawMutation();
  const [resendOtpWithdraw, { isSuccess: isResendSuccess }] =
    useResendOtpWithdrawMutation();
  const [depositForm, setDepositForm] = useState<{
    isOpen: boolean;
    currency: string;
  }>({ isOpen: false, currency: "" });
  const [withdrawForm, setWithdrawForm] = useState<{
    isOpen: boolean;
    currency: string;
    stock: number;
  }>({ isOpen: false, currency: "", stock: 0 });

  // ==============|| Handlers ||================= //
  const handleCloseModal = () => {
    setShowOtp(false);
  };
  const handleSendOtp = async (data: { code: string }) => {
    if (data.code.length > 6)
      return Notify({ type: "error", text: "لطفا کد را وارد کنید" });
    const newData = {
      transactionId,
      code: persianToEnglishNumbers(data.code),
    };
    await verifyOtpWithdraw(newData).then((res: any) => {
      if (res) {
        handleCloseModal();
        Notify({ type: "success", text: "برداشت با موفقیت انجام شد" });
      }
    });
  };
  const handleReSendOtp = async () => {
    await resendOtpWithdraw(transactionId).then(() => {
      if (isResendSuccess)
        Notify({ type: "success", text: "کد مجددا ارسال شد" });
    });
  };

  // ==============|| Render ||================= //
  return (
    <div className={`${wallet.wallet__item} ${wallet["usdt-box"]}`}>
      <div className={wallet.wallet__item__icon}>
        <img src={tetherIcon} alt="usdt" />
        <h6 className={wallet.wallet__item__title}>
          تتر
          <span className={wallet.wallet__item__subtitle}>USDT</span>
        </h6>
      </div>
      <div className={wallet.wallet__item__price}>
        {balance}
        <span className={wallet["available-balance"]}>
          در دسترس: {availableBalance}
        </span>
      </div>
      <div className={wallet.wallet__item__actions}>
        <a onClick={() => {}}>برداشت</a>
        <Button color="primary" outline>
          واریز
        </Button>
        <Button color="primary" outline>
          معامله
        </Button>
      </div>
    </div>
  );
}
