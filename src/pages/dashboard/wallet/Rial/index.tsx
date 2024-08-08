import irIcon from "assets/img/coins/Toman.svg";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

import wallet from "assets/scss/dashboard/wallet.module.scss";

type Props = {
  balance: string;
  availableBalance: string;
};

export default function IRRWallet({ balance, availableBalance }: Props) {
  const navigate = useNavigate();

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
        <div className={wallet.wallet__item__price}>
          {balance}
          {availableBalance !== balance && (
            <span className={wallet["available-balance"]}>
              در دسترس: {availableBalance}
            </span>
          )}
        </div>
        <div className={wallet.wallet__item__actions}>
          <Link to="/dashboard/wallet/withdraw/irt">برداشت</Link>
          <Button
            color="primary"
            outline
            onClick={() => navigate("/dashboard/wallet/deposit/irt")}
          >
            واریز
          </Button>
        </div>
      </div>
    </>
  );
}
