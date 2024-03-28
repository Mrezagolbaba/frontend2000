import checkImg from "assets/img/profile/Graphicloads-Colorful-Long-Shadow-Check-3.256.png";
import { Col, Container, Row } from "reactstrap";
import { useEffect } from "react";
import { useInitialInternationalMutation } from "store/api/profile-management";

import profile from "assets/scss/dashboard/profile.module.scss";

export default function FinalStep() {
  // ==============|| Hooks ||================= //
  const [initRequest] = useInitialInternationalMutation();

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    initRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ==============|| Render ||================= //
  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="text-center">
          <img src={checkImg} width={100} />
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-5 ">
          <h4>مدارک شما با موفقیت ارسال شد</h4>
          <p className={profile["note-text"]}>
            کارشناسان احراز هویت آرسونیکس بعد از بررسی درخواست امکان استفاده از
            خدمات بین المللی شما را تایید می کنند.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
