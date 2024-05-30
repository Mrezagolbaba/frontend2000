import Deposit from "./Deposit";
import Dialog from "components/Dialog";
import Withdraw from "./Withdraw";
import irIcon from "assets/img/coins/Toman.svg";
import { Button } from "reactstrap";
import { useState } from "react";

import wallet from "assets/scss/dashboard/wallet.module.scss";

type Props = {
  balance: string;
  stock: string
};

export default function IRRWallet({ balance,stock }: Props) {
  const [isOpenDepositForm, setIsOpenDepositForm] = useState<boolean>(false);
  const [isOpenWithdraw, setIsOpenWithdraw] = useState<boolean>(false);

  return (
    <>
      <div className={wallet.wallet__item}>
        <div className={wallet.wallet__item__icon}>
          <img src={irIcon} alt="irt" />
          <h6 className={wallet.wallet__item__title}>
            تومان
            <span className={wallet.wallet__item__subtitle}>TMN</span>
          </h6>
        </div>
        <div className={wallet.wallet__item__price}>{balance}</div>
        <div className={wallet.wallet__item__actions}>
          <a
            onClick={() => {
              setIsOpenWithdraw(true);
            }}
          >
            برداشت
          </a>
          <Button
            color="primary"
            outline
            onClick={() => setIsOpenDepositForm(true)}
          >
            واریز
          </Button>
        </div>
      </div>
      <Dialog
        title="واریز تومان"
        isOpen={isOpenDepositForm}
        onClose={() => setIsOpenDepositForm(false)}
        hasCloseButton
      >
        <Deposit onClose={() => setIsOpenDepositForm(false)} />
      </Dialog>
      <Dialog
        title="برداشت تومان"
        isOpen={isOpenWithdraw}
        onClose={() => setIsOpenWithdraw(false)}
        hasCloseButton
      >
        <Withdraw stock={stock} onClose={() => setIsOpenWithdraw(false)} />
      </Dialog>
    </>
  );
}
