import Dialog from "components/Dialog";
import tetherIcon from "assets/img/coins/tether.svg";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlertSuccess } from "components/AlertWidget";

import wallet from "assets/scss/dashboard/wallet.module.scss";

type Props = {
  balance: string;
  availableBalance: string;
};
export default function USDTWallet({ balance, availableBalance }: Props) {
  // ==============|| States ||================= //
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
          <Link to="/dashboard/wallet/withdraw/crypto">برداشت</Link>
          <Button
            color="primary"
            outline
            onClick={() => navigate("/dashboard/wallet/deposit/crypto")}
          >
            واریز
          </Button>
          <Button
            color="primary"
            outline
            onClick={() =>
              navigate(
                "/dashboard/exchange?sourceCurrency=USDT&destinationCurrency=IRR",
              )
            }
          >
            معامله
          </Button>
        </div>
      </div>
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
