import { useNavigate, useParams } from "react-router-dom";
import { useWalletsQuery } from "store/api/wallet-management";
import WithdrawCrypto from "./Crypto/Withdraw";
import WithdrawFiat from "./Fiat/Withdraw";
import { Button, Card, CardBody } from "reactstrap";

import wallet from "assets/scss/dashboard/wallet.module.scss";
import IRTWithdraw from "./Rial/Withdraw";

export default function Withdraw() {
  const { currency } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useWalletsQuery();

  const renderWithdraw = () => {
    switch (currency) {
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
    <Card>
      <CardBody>
        <div className={wallet["button-section"]}>
          <Button
            color={currency === "irt" ? "primary" : "outline"}
            onClick={() =>
              currency !== "irt" && navigate("/dashboard/wallet/withdraw/irt")
            }
          >
            برداشت تومان
          </Button>
          <Button
            color={currency === "crypto" ? "primary" : "outline"}
            onClick={() =>
              currency !== "crypto" &&
              navigate("/dashboard/wallet/withdraw/crypto")
            }
          >
            برداشت کوین
          </Button>
          <Button
            color={currency === "fiat" ? "primary" : "outline"}
            onClick={() =>
              currency !== "fiat" && navigate("/dashboard/wallet/withdraw/fiat")
            }
          >
            برداشت فیات دیجیتال
          </Button>
        </div>
        <div className={wallet["horizontal-divider"]} />
        <div className={wallet["content-section"]}>{renderWithdraw()}</div>
      </CardBody>
    </Card>
  );
}
