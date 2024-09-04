import { Card, CardBody } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import DepositCrypto from "./Crypto/Deposit";
import DepositFiat from "./Fiat/Deposit";
import IRTDeposit from "./Rial/Deposit";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import button from "assets/scss/components/button.module.scss";

export default function Deposit() {
  const { type } = useParams();
  const navigate = useNavigate();

  const renderDeposit = () => {
    switch (type) {
      case "crypto":
        return <DepositCrypto currency="USDT" onClose={() => {}} />;
      case "fiat":
        return <DepositFiat onClose={() => {}} />;
      case "irt":
      default:
        return <IRTDeposit />;
    }
  };
  return (
    <Card>
      <CardBody>
        <div className={wallet["button-section"]}>
          <button
            className={`${button["arsonex-btn"]} ${type === "irt" ? button["primary"] : button["primary-light"]}`}
            onClick={() =>
              type !== "irt" && navigate("/dashboard/wallet/deposit/irt")
            }
          >
            واریز تومان
          </button>
          <button
            className={`${button["arsonex-btn"]} ${type === "crypto" ? button["primary"] : button["primary-light"]}`}
            onClick={() =>
              type !== "crypto" && navigate("/dashboard/wallet/deposit/crypto")
            }
          >
            واریز کوین
          </button>
          <button
            className={`${button["arsonex-btn"]} ${type === "fiat" ? button["primary"] : button["primary-light"]}`}
            onClick={() =>
              type !== "fiat" && navigate("/dashboard/wallet/deposit/fiat")
            }
          >
            واریز فیات دیجیتال
          </button>
        </div>
        <div className={wallet["horizontal-divider"]} />
        <div className={wallet["content-section"]}>{renderDeposit()}</div>
      </CardBody>
    </Card>
  );
}
