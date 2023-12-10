import { AuthenticationLevel2Props } from "./types";
import checkImg from "assets/img/profile/Graphicloads-Colorful-Long-Shadow-Check-3.256.png";
import { Col, Container, Row } from "reactstrap";

import profile from "assets/scss/dashboard/profile.module.scss";

export default function FinalStep({ onClick }: AuthenticationLevel2Props) {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="text-center">
          <img src={checkImg} width={100} />
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-5 ">
          <h4>ویدیو/ تعهدنامه شما با موفقیت ارسال شد</h4>
          <p className={profile["note-text"]}>
            کارشناسان احراز هویت آرسونیکس بعد از بررسی درخواست ارتقا سطح کاربری
            شما را تایید می کنند.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
