import { Card, CardBody } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import DepositCrypto from "./Crypto/Deposit";
import DepositFiat from "./Fiat/Deposit";
import IRTDeposit from "./Rial/Deposit";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import button from "assets/scss/components/button.module.scss";
import FiatDeposit from "../history/FiatDeposit";
import USDTDeposit from "../history/USDTDeposit";
import IRRDeposit from "../history/IRRDeposit";
import { useAppSelector } from "store/hooks";
import { useEffect } from "react";

export default function Deposit() {
  const { phoneNumber } = useAppSelector((state) => state.user);
  const { type } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (type === "fiat" && phoneNumber.includes("+98")) {
      navigate("/404");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderDeposit = () => {
    switch (type) {
      case "crypto":
        return <DepositCrypto currency="USDT" />;
      case "fiat":
        return <DepositFiat />;
      case "irt":
      default:
        return <IRTDeposit />;
    }
  };
  return (
    <>
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
                type !== "crypto" &&
                navigate("/dashboard/wallet/deposit/crypto")
              }
            >
              واریز ارز دیجیتال
            </button>
            {!phoneNumber.includes("+98") && (
              <button
                className={`${button["arsonex-btn"]} ${type === "fiat" ? button["primary"] : button["primary-light"]}`}
                onClick={() =>
                  type !== "fiat" && navigate("/dashboard/wallet/deposit/fiat")
                }
              >
                واریز فیات دیجیتال
              </button>
            )}
          </div>
          <div className={wallet["horizontal-divider"]} />
          <div className={wallet["content-section"]}>{renderDeposit()}</div>
        </CardBody>
      </Card>
      <Card className="mt-3">
        <CardBody>
          {type === "fiat" ? (
            <FiatDeposit limit={8} />
          ) : type === "crypto" ? (
            <USDTDeposit limit={8} />
          ) : (
            <IRRDeposit limit={8} />
          )}
        </CardBody>
      </Card>
    </>
  );
}
