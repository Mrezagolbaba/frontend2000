import { Button, Col, Divider, Row, Typography } from "antd";
import { Dispatch, SetStateAction } from "react";
import { BsCameraVideo } from "react-icons/bs";
import { GiPhotoCamera } from "react-icons/gi";
import { Link } from "react-router-dom";
import { AuthenticationLevel2Props } from "./types";

const { Title, Paragraph } = Typography;

export default function FirstStep({
  onClick,
}: AuthenticationLevel2Props): React.JSX.Element {
  return (
    <div className="tab">
      <Row className="justify-content-between my-3">
        <Title level={5}>نحوه احراز هویت</Title>
        <Link to="#" className="title-help">
          آموزش احراز هویت
        </Link>
      </Row>
      <Row>
        <Paragraph className="note-text">
          برای تکمیل احراز هویت یکی از روش&zwnj;های زیر را انتخاب کنید.
          <br />
          در هر کدام از روش&zwnj;های زیر به همراه داشتن یک مدرک هویتی برای تکمیل
          احراز هویت (کارت ملی، شناسنامه، گواهینامه یا پاسپورت) الزامی
          می&zwnj;باشد.
        </Paragraph>
      </Row>

      <Row gutter={16} className="mt-2">
        <Col xs={12} className="d-flex justify-content-around">
          <Button
            size="large"
            block
            className="btn btn-transparent"
            onClick={() => onClick(2)}
          >
            <span className="icon">
              <BsCameraVideo />
            </span>
            ضبط ویدیو
          </Button>
        </Col>
        <Col xs={12} className="d-flex justify-content-around">
          <Button
            size="large"
            block
            className="btn btn-transparent"
            onClick={() => onClick(3)}
          >
            <span className="icon">
              <GiPhotoCamera />
            </span>
            عکس سلفی
          </Button>
        </Col>
      </Row>
      <Row gutter={16} className="mt-2">
        <Col xs={12}>
          <Paragraph className="text-method mt-2">
            یک ویدیو کوتاه همراه با مدرک هویتی ضبط و ارسال می&zwnj;کنید.
          </Paragraph>
        </Col>
        <Col xs={12}>
          <Paragraph className="text-method mt-2">
            یک عکس سلفی همراه با مدرک هویتی ارسال می&zwnj;کنید.
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
}
