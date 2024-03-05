import { BsCameraVideo } from "react-icons/bs";
import { GiPhotoCamera } from "react-icons/gi";
import { Link } from "react-router-dom";
import { AuthenticationLevel2Props } from "./types";
import { Button, Col, Container, Row } from "reactstrap";
import { AlertInfo } from "components/AlertWidget";

import profile from "assets/scss/dashboard/profile.module.scss";

export default function FirstStep({
  onClick,
}: AuthenticationLevel2Props): React.JSX.Element {
  return (
    <Container>
      <Row className="mb-3">
        <Col className={profile["modal-title"]}>
          <h6>نحوه احراز هویت</h6>
          <Link to="#" className="title-help">
            آموزش احراز هویت
          </Link>
        </Col>
      </Row>
      <Row>
        <AlertInfo
          text="در هر کدام از روش های زیر به همراه داشتن یک مدرک هویتی برای تکمیل احراز هویت (کارت ملی، شناسنامه، گواهینامه یا پاسپورت) الزامی می باشد."
          hasIcon
        />
        <p className={profile["note-text"]}>
          برای تکمیل احراز هویت یکی از روش&zwnj;های زیر را انتخاب کنید.
        </p>
      </Row>

      <Row className="mt-2">
        <Col xs={6}>
          <Button
            size="large"
            color="secondary"
            outline
            block
            className={profile["secondary-btn"]}
            onClick={() => onClick(2)}
          >
            <span className="icon">
              <BsCameraVideo />
            </span>
            ضبط ویدیو
          </Button>
          <span className={profile["button-summary"]}>
            یک ویدیو کوتاه همراه با مدرک هویتی ضبط و ارسال می&zwnj;کنید.
          </span>
        </Col>
        <Col xs={6}>
          <Button
            size="large"
            block
            color="secondary"
            outline
            className={profile["secondary-btn"]}
            onClick={() => onClick(3)}
          >
            <span className="icon">
              <GiPhotoCamera />
            </span>
            عکس سلفی
          </Button>
          <span className={profile["button-summary"]}>
            یک عکس سلفی همراه با مدرک هویتی ارسال می&zwnj;کنید.
          </span>
        </Col>
      </Row>
    </Container>
  );
}
