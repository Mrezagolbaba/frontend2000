import { AuthenticationLevel2Props } from "./types";
import checkImg from "assets/img/profile/Graphicloads-Colorful-Long-Shadow-Check-3.256.png";
import { Col, Container, Row } from "reactstrap";

import profile from "assets/scss/dashboard/profile.module.scss";
import { useEffect } from "react";
import { useInitialVerificationMutation } from "store/api/profile-management";

export default function FinalStep({ onClick }: AuthenticationLevel2Props) {

  const [initVerify, { isSuccess }] = useInitialVerificationMutation();

  useEffect(() => {
    initVerify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            کارشناسان احراز هویت آرسونیکس بعد از بررسی درخواست ارتقا سطح کاربری
            شما را تایید می کنند.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
