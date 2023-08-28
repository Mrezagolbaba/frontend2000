import React from "react";
import { AuthenticationLevel2Props } from "./types";
import { Alert, Button, Row, Space, Typography } from "antd";
import { BsInfoCircle } from "react-icons/bs";

const { Title, Paragraph } = Typography;
export default function ConfirmInternationalService({
  onClick,
}: AuthenticationLevel2Props) {
  return (
    <div className="tab">
      <Row className="justify-content-between my-3">
        <Title level={5}> خدمات بین المللی </Title>
        <Button type="text" onClick={() => {}} className="title-help">
          خدمات بین المللی چیست؟
        </Button>
      </Row>
      <Row>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Alert
            message="خدمات بین المللی آرسونیکس برای ایرانیان مقیم خارج از کشور می باشد."
            type="info"
            showIcon
            icon={<BsInfoCircle />}
          />
        </Space>
        <Paragraph className="auth-sample-text mb-4 mt-2">
          قصد استفاده از خدمات بین المللی آرسونیکس را دارید؟
          <br />
          (می توانید دارایی های خود را در حساب های بانکی خارج از ایران را به
          تومان یا ارز دیجیتال و بالعکس تبدیل کنید.)
        </Paragraph>
      </Row>
      <Row className="justify-content-evenly">
        <Button
          style={{ minWidth: "180px" }}
          type="primary"
          size="large"
          ghost
          onClick={() => onClick?.(5)}
        >
          بله
        </Button>
        <Button
          style={{ minWidth: "180px" }}
          type="primary"
          size="large"
          danger
        >
          خیر
        </Button>
      </Row>
    </div>
  );
}
