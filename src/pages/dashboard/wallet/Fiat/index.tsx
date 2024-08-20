import Dialog from "components/Dialog";
import lirIcon from "assets/img/coins/icon_try.svg";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import { AlertSuccess } from "components/AlertWidget";

interface Props {
  balance: string;
  availableBalance: string;
}

export default function TRYWallet({ balance, availableBalance }: Props) {
  // ==============|| States ||================= //
  const [showSuccess, setShowSuccess] = useState(false);

  // ==============|| Hooks ||================= //
  const navigate = useNavigate();

  // ==============|| Render ||================= //
  return (
    <>
      <div className={`${wallet.wallet__item} ${wallet["lir-box"]}`}>
        <div className={wallet.wallet__item__icon}>
          <img src={lirIcon} alt="try" />
          <h6 className={wallet.wallet__item__title}>
            لیر
            <span className={wallet.wallet__item__subtitle}>TL</span>
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
          <Link to="/dashborad/wallet/withdraw/fiat">برداشت</Link>
          <Button
            color="primary"
            outline
            onClick={() => navigate("/dashboard/wallet/deposit/fiat")}
          >
            واریز
          </Button>
          <Button
            color="primary"
            outline
            onClick={() =>
              navigate(
                "/dashboard/exchange?sourceCurrency=TRY&destinationCurrency=IRR",
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
