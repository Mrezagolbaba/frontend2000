import { useState } from "react";
import { Button } from "reactstrap";
import irIcon from "assets/img/icons/flag-iran.png";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import Dialog from "components/Dialog";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

type Props = {
  balance: string;
};

export default function IRRWallet({ balance }: Props) {
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
        <Withdraw stock={balance} onClose={() => setIsOpenWithdraw(false)} />
      </Dialog>
    </>
  );
}
