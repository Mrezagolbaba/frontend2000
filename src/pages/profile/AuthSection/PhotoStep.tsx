import React, { ChangeEvent, useRef, useState } from "react";
import { AuthenticationLevel2Props } from "./types";
import { Button, Row, Spin, Typography } from "antd";

import defaultImage from "assets/img/profile/auth.png";
import { BsTrash3, BsUpload } from "react-icons/bs";
import useUploadDoc from "services/verification";

const { Title, Paragraph } = Typography;
export default function PhotoStep({
  onClick,
}: AuthenticationLevel2Props): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadDoc = useUploadDoc();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(defaultImage);

  const uploadFile = async () => {
    setIsLoading(true);
    const type = file?.type.split("/")[1];
    await uploadDoc
      .mutateAsync({ docType: type, file: file })
      .then((res) => {
        setIsLoading(false);
        console.log(res);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };

  return (
    <div className="tab">
      <Row className="justify-content-between my-3">
        <Title level={5}> احراز هویت سلفی</Title>
        <Button
          type="text"
          onClick={() => {
            onClick(1);
          }}
          className="title-help"
        >
          تغییر روش احراز هویت
        </Button>
      </Row>
      <Row className="justify-content-center">
        <Paragraph
          className="image-container"
          onClick={() => {
            setFile(null);
            setImageUrl(defaultImage);
          }}
        >
          {!file ? (
            "نمونه تصویر تعهدنامه"
          ) : (
            <div className="image-cover">
              <BsTrash3 />
            </div>
          )}
          <img src={imageUrl} alt="how-i-should-take-selfie-photo" />
        </Paragraph>
      </Row>
      <Row>
        <Paragraph className="note-text">
          متن زیر را همراه با یک مدرک معتبر هویتی مانند تصویر بالا آپلود نمایید.
        </Paragraph>
        <Paragraph className="auth-sample-text mb-4 mt-2">
          اینجانب بهزاد بابائی به کد ملی 002043434 متعهد می&zwnj;شوم که حساب
          کاربری و مدارک خود را جهت خرید و فروش ارزهای دیجیتال در اختیار دیگران
          قرار ندهم و به کلیه&zwnj;ی قوانین و مقررات درج شده در قوانین سایت
          متعهد و پایبند باشم و در صورت هر گونه تخلف، کلیه&zwnj;ی
          مسئولیت&zwnj;های حقوقی و کیفری آن را در قبال آرسونیکس و اشخاص ثالث، به
          عهده می گیرم.
        </Paragraph>
      </Row>
      <Row className="justify-content-center">
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
            const file = target.files && target.files[0];
            setFile(file || null);
            if (file) {
              const url = URL.createObjectURL(file);
              setImageUrl(url);
            } else {
              setImageUrl(defaultImage);
            }
          }}
        />
        {!file ? (
          <Button
            type="primary"
            size="large"
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            <BsUpload style={{ marginLeft: "10px" }} />
            آپلود تصویر تعهدنامه
          </Button>
        ) : (
          <Button
            type="primary"
            size="large"
            ghost
            onClick={uploadFile}
            disabled={isLoading}
          >
            {isLoading ? <Spin /> : "ارسال تصویر تعهد نامه"}
          </Button>
        )}
      </Row>
    </div>
  );
}
