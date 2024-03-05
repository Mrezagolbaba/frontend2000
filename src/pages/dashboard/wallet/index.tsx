import { useEffect, useState } from "react";
import RialCard from "./Rial";
import { Col, Row } from "reactstrap";
import CryptoCard from "./Crypto";
import Fiat from "./Fiat";
import { InitiateCurrency } from "types/wallet";
import { useWalletsQuery } from "store/api/wallet-management";
import Tables from "./Tables";

const initiateCurrency = {
  availableBalance: "",
  balance: "",
  createdAt: "",
  currencyCode: "",
  id: "",
  updatedAt: "",
  userId: "",
};

export default function Wallet() {
  const [USDT, setUSDT] = useState<InitiateCurrency>(initiateCurrency);
  const [TRX, setTRX] = useState<InitiateCurrency>(initiateCurrency);
  const [Rial, setRial] = useState<InitiateCurrency>(initiateCurrency);
  const [Lir, setLir] = useState<InitiateCurrency>(initiateCurrency);

  const { data, isSuccess, isLoading } = useWalletsQuery();

  useEffect(() => {
    if (isSuccess) {
      data?.forEach((item) => {
        item.currencyCode === "USDT" && setUSDT(item as InitiateCurrency);
        item.currencyCode === "TRX" && setTRX(item as InitiateCurrency);
        item.currencyCode === "IRR" && setRial(item as InitiateCurrency);
        item.currencyCode === "TRY" && setLir(item as InitiateCurrency);
      });
    }
  }, [data, isSuccess]);
  return (
    <section className="page page-wallet">
      <Row>
        <Col xs={12}>
          <RialCard stock={Rial} isLoading={isLoading} />
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={6} className="mb-4">
          <CryptoCard
            USDT={USDT}
            TRX={TRX}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </Col>
        <Col xs={12} lg={6} className="mb-4">
          <Fiat TRY={Lir} isLoading={isLoading} isSuccess={isSuccess} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Tables />
        </Col>
      </Row>
    </section>
  );
}
