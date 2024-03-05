import { BsCheck2 } from "react-icons/bs";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { useAppSelector } from "store/hooks";

import dashboard from "assets/scss/dashboard/dashboard.module.scss";

export default function UserTier() {
  const { secondTierVerified } = useAppSelector((state) => state.user);
  return (
    <Card className={dashboard["user-tier-card"]}>
      <CardHeader className={dashboard["user-tier-card__header"]}>
        <CardTitle tag="h5">احراز هویت</CardTitle>
      </CardHeader>
      <CardBody className={dashboard["user-tier-card__body"]}>
        <Row className="g-4">
          <Col xxl={6} className={dashboard["user-tier-first-button"]}>
            <div className={dashboard["user-tier-summary"]}>
              <p>
                برای استفاده کامل و بدون محدودیت از آرسونیکس باید فرایند احراز
                هویت را تکمیل کنید، زمان بررسی و تایید اطلاعات ۱ ساعت
                &zwnj;می&zwnj;باشد.{" "}
              </p>
              <Button outline color="primary" tag="a" href="/dashboard/profile">
                احراز هویت سطح دو
              </Button>
            </div>
          </Col>
          <Col xxl={3} md={6}>
            <ul className={dashboard["user-tier-advantages"]}>
              <li className={!secondTierVerified ? dashboard["level-now"] : ""}>
                <h5>احراز هویت سطح یک</h5>
                {!secondTierVerified && (
                  <Badge color="primary">سطح فعلی شما</Badge>
                )}
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
                واریز و برداشت فیات روزانه :<strong>معادل ۵۰۰ دلار</strong>
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
          <Col xs={12} className={dashboard["user-tier-second-button"]}>
            <div className={dashboard["user-tier-summary"]}>
              <Button outline color="primary" tag="a" href="/dashboard/profile">
                احراز هویت سطح دو
              </Button>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
