import React, { useEffect, useState } from "react";

import RialCard from "./Rial";
import { Col, Row } from "reactstrap";
import CryptoCard from "./Crypto";
import Fiat from "./Fiat";
import { useList } from "@refinedev/core";

const initiateCurrency = {
  availableBalance: "",
  balance: "",
  createdAt: "",
  currencyCode: "",
  id: "",
  updatedAt: "",
  userId: "",
};

export const WalletList: React.FC = () => {
  const [USDT, setUSDT] = useState<any>(initiateCurrency);
  const [TRX, setTRX] = useState<any>(initiateCurrency);
  const [Rial, setRial] = useState<any>(initiateCurrency);

  const { data, isSuccess, isLoading } = useList({
    resource: `wallets`,
  });

  useEffect(() => {
    if (isSuccess) {
      data?.data.forEach((item) => {
        item.currencyCode === "USDT" && setUSDT(item);
        item.currencyCode === "TRX" && setTRX(item);
        item.currencyCode === "IRR" && setRial(item);
      });
    }
  }, [data?.data, isSuccess]);

  return (
    <section className="page page-wallet">
      <Row>
        <Col xs={12}>
          <RialCard stock={Rial} isLoading={isLoading} />
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={6}>
          <CryptoCard
            USDT={USDT}
            TRX={TRX}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </Col>
        <Col xs={12} lg={6}>
          <Fiat />
        </Col>
      </Row>
    </section>
  );
};
