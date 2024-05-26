import DepositFiat from "./Deposit";
import Dialog from "components/Dialog";
import WithdrawFiat from "./Withdraw";
import lirIcon from "assets/img/icons/flag-turkey.png";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import wallet from "assets/scss/dashboard/wallet.module.scss";

interface Props {
  balance: string;
  stock: string;
}

export default function TRYWallet({ balance, stock }: Props) {
  // ==============|| States ||================= //
  const [isOpenDeposit, setIsOpenDeposit] = useState(false);
  const [isOpenWithdraw, setIsOpenWithdraw] = useState(false);

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
        <div className={wallet.wallet__item__price}>{balance}</div>
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
                  source: { currency: "TRY" },
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
        title="واریز لیر"
        isOpen={isOpenDeposit}
        onClose={() => setIsOpenDeposit(false)}
      >
        <DepositFiat onClose={() => setIsOpenDeposit(false)} />
      </Dialog>

      <Dialog
        title="برداشت لیر"
        isOpen={isOpenWithdraw}
        onClose={() => setIsOpenWithdraw(false)}
      >
        <WithdrawFiat
          stock={Number(stock)}
          onClose={() => setIsOpenWithdraw(false)}
        />
      </Dialog>
    </>
  );
}
