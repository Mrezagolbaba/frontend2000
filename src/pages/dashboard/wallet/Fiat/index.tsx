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
import DepositFiat from "./Deposit";
import Dialog from "components/Dialog";
import Notify from "components/Notify";
import WithdrawFiat from "./Withdraw";
import WithdrawOTP from "components/WithdrawOTP";
import lirFlag from "assets/img/coins/lira.png";
import { InitiateCurrency } from "types/wallet";
import { lirShow } from "helpers";
import { useAppSelector } from "store/hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import lirIcon from "assets/img/icons/flag-turkey.png";

import wallet from "assets/scss/dashboard/wallet.module.scss";

interface Props {
  balance: string;
}

export default function TRYWallet({ balance }: Props) {
  // ==============|| States ||================= //
  const [depositForm, setDepositForm] = useState<{
    isOpen: boolean;
    currency: string;
  }>({ isOpen: false, currency: "" });
  const [withdrawForm, setWithdrawForm] = useState<{
    isOpen: boolean;
    currency: string;
    stock: number;
  }>({ isOpen: false, currency: "", stock: 0 });
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>("");

  // ==============|| Hooks ||================= //
  const navigate = useNavigate();
  const [resendOtpWithdraw, { isSuccess: isResendSuccess }] =
    useResendOtpWithdrawMutation();
  const [verifyOtpWithdraw] = useVerifyOtpWithdrawMutation();
  const user = useAppSelector((state) => state.user);

  // ==============|| Handlers ||================= //
  const handleCloseModal = () => {
    setShowOtp(false);
  };
  const handleSendOtp = async (data: { code: string }) => {
    if (data.code.length > 6)
      return Notify({ type: "error", text: "لطفا کد را وارد کنید" });
    const newData = {
      transactionId,
      code: data.code,
    };
    await verifyOtpWithdraw(newData).then((res: any) => {
      if (res) {
        handleCloseModal();
        Notify({ type: "success", text: "برداشت با موفقیت انجام شد" });
        window.location.reload();
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
    <div className={`${wallet.wallet__item} ${wallet["lir-box"]}`}>
      <div className={wallet.wallet__item__icon}>
        <img src={lirIcon} alt="try" />
        <h6 className={wallet.wallet__item__title}>
          لیر
          <span className={wallet.wallet__item__subtitle}>TL</span>
        </h6>
      </div>
      <div className={wallet.wallet__item__price}>{balance}</div>
      <div className={wallet.wallet__item__actions}>
        <a onClick={() => {}}>برداشت</a>
        <Button color="primary" outline onClick={() => {}}>
          واریز
        </Button>
        <Button color="primary" outline onClick={() => {}}>
          معامله
        </Button>
      </div>
    </div>
  );
}
