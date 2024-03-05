import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";

import ChangePassword from "./ChangePassword";

import Authenticator from "./Authenticator";
import Notices from "./Notices";

export default function Setting() {
  return (
    <section className="page settings">
      <Row>
        <Col xs={12} xl={6} className="mb-3">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات امنیتی</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="security-form ">
                <h6 className=" mb-4 mt-4">
                  نحوه تایید هویت دو مرحله ای جهت ورود به حساب کاربری و درخواست
                  برداشت
                </h6>
                <Authenticator />
                <ChangePassword />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} xl={6} className="mb-3">
          <Notices />
        </Col>
      </Row>
    </section>
  );
}
