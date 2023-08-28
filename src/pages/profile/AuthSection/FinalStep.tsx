import React from "react";
import { AuthenticationLevel2Props } from "./types";
import { Row, Typography } from "antd";
import checkImg from "assets/img/profile/Graphicloads-Colorful-Long-Shadow-Check-3.256.png";

const { Title, Paragraph } = Typography;

export default function FinalStep({ onClick }: AuthenticationLevel2Props) {
  return (
    <div className="tab">
      <Row className="justify-content-center">
        <img src={checkImg} width={100} />
      </Row>
      <Row className="mt-3 justify-content-center">
        <Title level={4}>ویدیو/ تعهدنامه شما با موفقیت ارسال شد</Title>
        <Paragraph className="note-text">
          کارشناسان احراز هویت آرسونیکس بعد از بررسیُ درخواست ارتقا سطح کاربری
          شما را تایید می کنند.
        </Paragraph>
      </Row>
    </div>
  );
}
