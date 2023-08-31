import React, { ChangeEvent, useRef, useState } from "react";
import { AuthenticationLevel2Props } from "./types";
import { Alert, Button, Col, Row, Space, Typography } from "antd";
import { BsFile, BsFileEarmarkPlus, BsInfoCircle } from "react-icons/bs";

const { Title } = Typography;
export default function ResidencyCardStep({
  onClick,
}: AuthenticationLevel2Props) {
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const [imgUrl, setImgUrl] = useState<{ 1: string | null; 2: string | null }>({
    1: null,
    2: null,
  });
  const [file, setFile] = useState<{ 1: File | null; 2: File | null }>({
    1: null,
    2: null,
  });

  const renderPreview = () => {
    if (file) {
      return (
        <Row
          gutter={16}
          className="mt-3"
          style={{
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Col xs={12}>
            {imgUrl[1] && <img src={imgUrl[1]} alt="residency" width={150} />}
          </Col>
          <Col xs={12}>
            {imgUrl[2] && <img src={imgUrl[2]} alt="residency" width={150} />}
          </Col>
        </Row>
      );
    }
    return null;
  };

  const handleSubmit = (fileNumber: number) => {
    console.log(fileNumber);
  };

  return (
    <div className="tab">
      <Row className="justify-content-between my-3">
        <Title level={5}> خدمات بین المللی </Title>
        <Button type="text" onClick={() => {}} className="title-help">
          چرا باید کارت اقامت ارسال کنم؟
        </Button>
      </Row>
      <Row>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Alert
            message="برای استفاده از خدمات بین المللی آرسونیکس باید کارت اقامت کشوری که در آن ساکن هستید را آپلود کنید."
            type="info"
            showIcon
            icon={<BsInfoCircle />}
          />
        </Space>
      </Row>
      {renderPreview()}
      <Row className="mt-3 justify-content-evenly">
        <input
          type="file"
          ref={inputRef1}
          style={{ display: "none" }}
          onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
            const fileTemp = target.files && target.files[0];
            setFile({ ...file, 1: fileTemp || null });
            if (fileTemp) {
              const url = URL.createObjectURL(fileTemp);
              setImgUrl({ ...imgUrl, 1: url });
            } else {
              setImgUrl({ ...imgUrl, 1: null });
            }
          }}
        />
        <input
          type="file"
          ref={inputRef2}
          style={{ display: "none" }}
          onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
            const fileTemp = target.files && target.files[0];
            setFile({ ...file, 2: fileTemp || null });
            if (fileTemp) {
              const url = URL.createObjectURL(fileTemp);
              setImgUrl({ ...imgUrl, 2: url });
            } else {
              setImgUrl({ ...imgUrl, 2: null });
            }
          }}
        />
        {!file["1"] ? (
          <Button
            type="primary"
            ghost
            size="large"
            onClick={() => {
              inputRef1.current?.click();
            }}
          >
            آپلود روی کارت اقامت
            <BsFileEarmarkPlus />
          </Button>
        ) : (
          <Button
            type="primary"
            ghost
            size="large"
            onClick={() => {
              handleSubmit(1);
            }}
          >
            ارسال روی کارت اقامت
            <BsFileEarmarkPlus />
          </Button>
        )}
        {!file["2"] ? (
          <Button
            type="primary"
            ghost
            size="large"
            onClick={() => {
              inputRef2.current?.click();
            }}
          >
            آپلود پشت کارت اقامت
            <BsFileEarmarkPlus />
          </Button>
        ) : (
          <Button
            type="primary"
            ghost
            size="large"
            onClick={() => {
              handleSubmit(2);
            }}
          >
            ارسال پشت کارت اقامت
            <BsFileEarmarkPlus />
          </Button>
        )}
      </Row>

      <Row className="mt-3 justify-content-center">
        <Button type="primary" onClick={() => onClick?.(6)}>
          قصد استفاده از خدمات بین المللی آرسونیکس را ندارم
        </Button>
      </Row>
    </div>
  );
}
