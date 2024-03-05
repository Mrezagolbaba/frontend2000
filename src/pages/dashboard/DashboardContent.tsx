import { useAppSelector } from "store/hooks";
import { Col, Row } from "reactstrap";

import UserInformation from "./UserInformation";
import ExchangeSection from "./ExchangeSection";
import TradingMarkets from "./TradingMarkets";
import EasyAccess from "./EasyAccess";
import LatestDeals from "./LatestDeals";
import LastTransactions from "./LastTransactions";
import UserTier from "./UserTier";

const DashboardContent = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <>
      <section className="mb-3">
        <UserInformation />
      </section>

      {!user?.secondTierVerified && (
        <section className="mb-4">
          <UserTier />
        </section>
      )}

      <section className="mb-4">
        <Row className="g-4">
          <Col xxl={7} xl={6}>
            <ExchangeSection />
          </Col>
          <Col xxl={5} xl={6}>
            <TradingMarkets />
          </Col>
        </Row>
      </section>
      <section className="mb-4 mt-4">
        <Row className="gx-4">
          <EasyAccess />
        </Row>
      </section>
      <section className="mb-4">
        <Row className="gx-4">
          <Col xxl={5} xl={6} className="mb-4">
            <LastTransactions />
          </Col>
          <Col xxl={7} xl={6} className="mb-4">
            <LatestDeals />
          </Col>
        </Row>
      </section>
    </>
  );
};

export default DashboardContent;
