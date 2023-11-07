import React, { useEffect, useState } from "react";

import RialCard from "./Rial";
import { Col, Row } from "reactstrap";
import CryptoCard from "./Crypto";
import Fiat from "./Fiat";
import { useList } from "@refinedev/core";

const initiateCrypto = {
  availableBalance: "",
  balance: "",
  createdAt: "",
  currencyCode: "",
  id: "",
  updatedAt: "",
  userId: "",
};

export const WalletList: React.FC = () => {
  const [USDT, setUSDT] = useState<any>(initiateCrypto);
  const [TRX, setTRX] = useState<any>(initiateCrypto);

  const { data, isSuccess, isLoading } = useList({
    resource: `wallets`,
  });

  useEffect(() => {
    if (isSuccess) {
      data?.data.forEach((item) => {
        item.currencyCode === "USDT" && setUSDT(item);
        item.currencyCode === "TRX" && setTRX(item);
      });
    }
  }, [data?.data, isSuccess]);

  return (
    <section className="page page-wallet">
      <Row>
        <Col xs={12}>
          <RialCard />
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
