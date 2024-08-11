import { useNavigate, useParams } from "react-router-dom";
import { useWalletsQuery } from "store/api/wallet-management";
import WithdrawCrypto from "./Crypto/Withdraw";
import WithdrawFiat from "./Fiat/Withdraw";
import { Card, CardBody } from "reactstrap";
import IRTWithdraw from "./Rial/Withdraw";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import button from "assets/scss/components/button.module.scss";
import FiatWithdraw from "../history/FiatWithdraw";
import USDTWithdraw from "../history/USDTWithdraw";
import IRRWithdraw from "../history/IRRWithdraw";

export default function Withdraw() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useWalletsQuery();

  const renderWithdraw = () => {
    switch (type) {
      case "crypto":
        return (
          <WithdrawCrypto
            onSuccessWithdraw={() => {}}
            currency="USDT"
            stock={
              data
                ? Number(
                    data.find((w) => w.currencyCode === "USDT")
                      ?.availableBalance,
                  )
                : 0
            }
          />
        );
      case "fiat":
        return (
          <WithdrawFiat
            onSuccessWithdraw={() => {}}
            stock={
              data
                ? Number(
                    data.find((w) => w.currencyCode === "TRY")
                      ?.availableBalance,
                  )
                : 0
            }
          />
        );
      case "irt":
      default:
        return (
          <IRTWithdraw
            stock={
              data
                ? Number(
                    data.find((w) => w.currencyCode === "IRR")
                      ?.availableBalance,
                  )
                : 0
            }
          />
        );
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
                type !== "irt" && navigate("/dashboard/wallet/withdraw/irt")
              }
            >
              برداشت تومان
            </button>
            <button
              className={`${button["arsonex-btn"]} ${type === "crypto" ? button["primary"] : button["primary-light"]}`}
              onClick={() =>
                type !== "crypto" &&
                navigate("/dashboard/wallet/withdraw/crypto")
              }
            >
              برداشت ارز دیجیتال
            </button>
            <button
              className={`${button["arsonex-btn"]} ${type === "fiat" ? button["primary"] : button["primary-light"]}`}
              onClick={() =>
                type !== "fiat" && navigate("/dashboard/wallet/withdraw/fiat")
              }
            >
              برداشت فیات دیجیتال
            </button>
          </div>
          <div className={wallet["horizontal-divider"]} />
          <div className={wallet["content-section"]}>{renderWithdraw()}</div>
        </CardBody>
      </Card>
      <Card className="mt-3">
        <CardBody>
          {type === "fiat" ? (
            <FiatWithdraw limit={5} />
          ) : type === "crypto" ? (
            <USDTWithdraw limit={5} />
          ) : (
            <IRRWithdraw limit={5}/>
          )}
        </CardBody>
      </Card>
    </>
  );
}
