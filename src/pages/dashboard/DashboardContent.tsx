import { useAppSelector } from "store/hooks";
import { BsCheck2 } from "react-icons/bs";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";

import UserInformation from "./UserInformation";
import ExchangeSection from "./ExchangeSection";
import TradingMarkets from "./TradingMarkets";
import EasyAccess from "./EasyAccess";
import LatestDeals from "./LatestDeals";
import LastTransactions from "./LastTransactions";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";

const DashboardContent = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <>
      <section className="mb-3">
        <UserInformation />
      </section>

      {!user?.secondTierVerified && (
        <section className="mb-4">
          <Card
            className="custom-card  auth-jumbotron "
            style={{ backgroundColor: "#111bff08" }}
          >
            <CardHeader>
              <CardTitle tag="h5">احراز هویت</CardTitle>
            </CardHeader>
            <CardBody>
              <Row className="g-4">
                <Col xxl={6}>
                  <div className="auth-jumbotron__summary">
                    <p>
                      برای استفاده کامل و بدون محدودیت از آرسونیکس باید فرایند
                      احراز هویت را تکمیل کنید، زمان بررسی و تایید اطلاعات ۱
                      ساعت &zwnj;می&zwnj;باشد.{" "}
                    </p>
                    <Button outline color="primary">
                      شروع احراز هویت سطح دو
                    </Button>
                  </div>
                </Col>
                <Col xxl={3} md={6}>
                  <ul className="auth-jumbotron__advantages">
                    <li>
                      <h5>احراز هویت سطح یک</h5>
                    </li>
                    <li>
                      <BsCheck2 className="icon" size={15} color={"#ff8d00"} />
                      ﻭﺍﺭﯾﺰ تومان ﺭﻭﺯﺍﻧﻪ :<strong>۱ میلیون تومان</strong>
                    </li>
                    <li>
                      <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                      برداشت تومان ﺭﻭﺯﺍﻧﻪ
                      <strong>نامحدود</strong>
                    </li>
                    <li>
                      <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                      واریز و برداشت رمزارز ﺭﻭﺯﺍﻧﻪ :<strong>نامحدود</strong>
                    </li>
                    <li>
                      <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                      واریز و برداشت فیات روزانه :
                      <strong>معادل ۵۰۰ دلار</strong>
                    </li>
                  </ul>
                </Col>
                <Col xxl={3} md={6}>
                  <ul className="auth-jumbotron__advantages">
                    <li>
                      <h5>احراز هویت سطح دو</h5>
                    </li>
                    <li>
                      <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                      ﻭﺍﺭﯾﺰ تومان ﺭﻭﺯﺍﻧﻪ:
                      <strong>نامحدود </strong>
                    </li>
                    <li>
                      <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                      برداشت تومان ﺭﻭﺯﺍﻧﻪ:
                      <strong> نامحدود </strong>
                    </li>
                    <li>
                      <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                      واریز و برداشت رمزارز ﺭﻭﺯﺍﻧﻪ:
                      <strong>نامحدود</strong>
                    </li>
                    <li>
                      <BsCheck2 className="icon" size={15} color={"#55cd51"} />
                      ﻭﺍﺭﯾﺰ و برداشت فیات ﺭﻭﺯﺍﻧﻪ :<strong>۳۵ هزار دلار</strong>
                    </li>
                  </ul>
                </Col>
                <Col xl={12} className="d-none">
                  <div className="auth-jumbotron__summary">
                    <Link
                      className="btn btn-outline-primary"
                      to="profile#kyc-section"
                    >
                      شروع احراز هویت
                    </Link>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
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
          <Col xxl={7} xl={6} className="mb-4">
            <LatestDeals />
          </Col>
          <Col xxl={5} xl={6} className="mb-4">
            <LastTransactions />
          </Col>
        </Row>
      </section>
    </>
  );
};

export default DashboardContent;
