import IRRWallet from "./Rial";
import TRYWallet from "./Fiat";
import Tables from "./Tables";
import USDTWallet from "./Crypto";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { normalizeAmount } from "helpers";
import { useWalletsQuery } from "store/api/wallet-management";

import wallet from "assets/scss/dashboard/wallet.module.scss";

export default function Wallet() {
  const { data, isSuccess, isLoading, isFetching } = useWalletsQuery();

  const renderBalance = (code, field) => {
    const wallet = data.find((w) => w.currencyCode === code);
    return normalizeAmount(wallet?.[field], code, false);
  };

  return (
    <section className="page page-wallet">
      {/****************** wallets *******************/}
      <Card className={wallet.wallet}>
        <CardHeader>
          <CardTitle tag="h5">کیف پول</CardTitle>
        </CardHeader>
        <CardBody>
          <Row className="g-2">
            {isLoading || isFetching ? (
              <>
                <Col xs={12} md={6} className="placeholder-glow">
                  <div
                    className={`${wallet["wallet__loading--item"]} placeholder col-12 rounded`}
                  />
                </Col>
                <Col xs={12} md={6} className="placeholder-glow">
                  <div
                    className={`${wallet["wallet__loading--item"]} placeholder col-12 rounded`}
                  />
                </Col>
                <Col xs={12} md={6} className="placeholder-glow">
                  <div
                    className={`${wallet["wallet__loading--item"]} placeholder col-12 rounded`}
                  />
                </Col>
              </>
            ) : (
              data && (
                <>
                  <Col xs={12} md={6}>
                    <IRRWallet
                      balance={renderBalance("IRR", "balance")}
                      availableBalance={renderBalance(
                        "IRR",
                        "availableBalance",
                      )}
                      stock={
                        data.find((w) => w.currencyCode === "IRR")?.balance ||
                        "0"
                      }
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <USDTWallet
                      balance={renderBalance("USDT", "balance")}
                      stock={
                        data.find((w) => w.currencyCode === "USDT")?.balance ||
                        "0"
                      }
                      availableBalance={renderBalance(
                        "USDT",
                        "availableBalance",
                      )}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <TRYWallet
                      balance={renderBalance("TRY", "balance")}
                      availableBalance={renderBalance(
                        "TRY",
                        "availableBalance",
                      )}
                      stock={
                        data.find((w) => w.currencyCode === "TRY")
                          ?.availableBalance || "0"
                      }
                    />
                  </Col>
                </>
              )
            )}
          </Row>
        </CardBody>
      </Card>
      {/****************** latest transactions *******************/}
      <Tables />
    </section>
  );
}
