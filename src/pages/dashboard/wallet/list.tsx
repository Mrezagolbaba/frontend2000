import React from "react";

import RialCard from "./Rial";
import { Col, Row } from "reactstrap";
import CryptoCard from "./Crypto";
import Fiat from "./Fiat";

export const WalletList: React.FC = () => {
  return (
    <section className="page page-wallet">
      <Row>
        <RialCard />
      </Row>
      <Row>
        <Col xs={12} lg={6}>
          <CryptoCard />
        </Col>
        <Col xs={12} lg={6}>
          <Fiat />
        </Col>
      </Row>
    </section>
  );
};
