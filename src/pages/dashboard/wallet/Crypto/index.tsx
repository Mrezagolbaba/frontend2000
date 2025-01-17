import DepositCrypto from "./Deposit";
import Dialog from "components/Dialog";
import WithdrawCrypto from "./Withdraw";
import tetherIcon from "assets/img/coins/tether.svg";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import { AlertSuccess } from "components/AlertWidget";

type Props = {
  balance: string;
  availableBalance: string;
  stock: string;
};
export default function USDTWallet({
  balance,
  availableBalance,
  stock,
}: Props) {
  // ==============|| States ||================= //
  const [isOpenDeposit, setIsOpenDeposit] = useState(false);
  const [isOpenWithdraw, setIsOpenWithdraw] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ==============|| Hooks ||================= //
  const navigate = useNavigate();

  // ==============|| Render ||================= //
  return (
    <>
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
          {availableBalance !== balance && (
            <span className={wallet["available-balance"]}>
              در دسترس: {availableBalance}
            </span>
          )}
        </div>
        <div className={wallet.wallet__item__actions}>
          <a onClick={() => setIsOpenWithdraw(true)}>برداشت</a>
          <Button
            color="primary"
            outline
            onClick={() => setIsOpenDeposit(true)}
          >
            واریز
          </Button>
          <Button
            color="primary"
            outline
            onClick={() =>
              navigate("/dashboard/exchange", {
                state: {
                  source: { currency: "USDT" },
                  destination: { currency: "IRR" },
                },
              })
            }
          >
            معامله
          </Button>
        </div>
      </div>
      <Dialog
        isOpen={isOpenDeposit}
        title="واریز تتر"
        onClose={() => setIsOpenDeposit(false)}
        hasCloseButton
      >
        <DepositCrypto
          currency="USDT"
          onClose={() => setIsOpenDeposit(false)}
        />
      </Dialog>
      <Dialog
        isOpen={isOpenWithdraw}
        title="برداشت تتر"
        onClose={() => setIsOpenWithdraw(false)}
      >
        <WithdrawCrypto
          stock={Number(stock)}
          currency="USDT"
          onSuccessWithdraw={() => setIsOpenWithdraw(false)}
        />
      </Dialog>
      <Dialog
        title=""
        size="md"
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      >
        <div className="d-flex flex-column align-items-center">
          <AlertSuccess
            hasIcon
            text="برداشت شما با موفقیت ثبت شد. می توانید از قسمت تاریخچه وضعیت برداشت را مشاهده نمایید."
          />
          <Button
            color="primary"
            outline
            className="px-5 py-3 mt-5"
            onClick={() => {
              setShowSuccess(false);
              navigate("/dashboard/history");
            }}
          >
            مشاهده وضعیت برداشت
          </Button>
        </div>
      </Dialog>
    </>
  );
}
