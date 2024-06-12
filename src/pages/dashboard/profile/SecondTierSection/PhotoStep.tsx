import Notify from "components/Notify";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import defaultImage from "assets/img/profile/auth.png";
import { AuthenticationLevel2Props } from "./types";
import { BsTrash3, BsUpload } from "react-icons/bs";
import { Button, Col, Container, Row, Spinner } from "reactstrap";
import { useAppSelector } from "store/hooks";
import { useUploadDocMutation } from "store/api/profile-management";

import profile from "assets/scss/dashboard/profile.module.scss";

export default function PhotoStep({
  onClick,
}: AuthenticationLevel2Props): React.JSX.Element {
  const user = useAppSelector((state) => state.user);
  const { firstName, lastName, nationalId } = user;
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadDoc, { isLoading, isSuccess }] = useUploadDocMutation();

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(defaultImage);

  const uploadFile = async () => {
    await uploadDoc({
      docType: "COMMITMENT_LETTER",
      file: file,
      fileName: "file",
    });
  };

  useEffect(() => {
    isSuccess && onClick?.(4);
  }, [isSuccess, onClick]);

  return (
    <Container>
      <Row>
        <Col className={profile["modal-title"]}>
          <h5> احراز هویت سلفی</h5>
          <Button
            color="link"
            onClick={() => {
              onClick(1);
            }}
          >
            تغییر روش احراز هویت
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <p
            className={profile["image-container"]}
            onClick={() => {
              setFile(null);
              setImageUrl(defaultImage);
            }}
          >
            {!file ? (
              "نمونه تصویر تعهدنامه"
            ) : (
              <div className={profile["image-cover"]}>
                <BsTrash3 />
              </div>
            )}
            <img src={imageUrl} alt="how-i-should-take-selfie-photo" />
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className={profile["note-text"]}>
            متن زیر را همراه با یک مدرک معتبر هویتی مانند تصویر بالا آپلود
            نمایید.
          </p>
          <p className={profile["video-summary-text"]}>
            اینجانب
            {` ${firstName} ${lastName} `}
            به کد ملی {` ${nationalId} `} متعهد می&zwnj;شوم که حساب کاربری و
            مدارک خود را جهت معامله ارزهای دیجیتال در اختیار دیگران قرار
            ندهم و به کلیه&zwnj;ی قوانین و مقررات درج شده در قوانین سایت متعهد و
            پایبند باشم و در صورت هر گونه تخلف، کلیه&zwnj;ی مسئولیت&zwnj;های
            حقوقی و کیفری آن را در قبال آرسونیکس و اشخاص ثالث، به عهده می گیرم.
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <input
            type="file"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              const file = target.files && target.files[0];
              setFile(file || null);
              if (
                file &&
                (file.type === "image/png" ||
                  file.type === "image/jpg" ||
                  file.type === "image/jpeg" ||
                  file.type === "image/web" ||
                  file.type === "application/pdf")
              ) {
                const url = URL.createObjectURL(file);
                setImageUrl(url);
              } else {
                Notify({
                  type: "error",
                  text: "لطفا توجه داشته باشید که فایل انتخابی باید یکی از فرمت های عکس (jpg, jpeg, png یا pdf) باشد.",
                }),
                  setImageUrl(defaultImage);
                setFile(null);
              }
            }}
          />
          {!file ? (
            <Button
              color="primary"
              size="large"
              className="py-3 px-5"
              onClick={() => {
                inputRef.current?.click();
              }}
            >
              <BsUpload style={{ marginLeft: "10px" }} />
              آپلود تصویر تعهدنامه
            </Button>
          ) : (
            <Button
              color="primary"
              size="large"
              outline
              onClick={uploadFile}
              disabled={isLoading}
              className="py-3 px-5"
            >
              {isLoading ? <Spinner /> : "ارسال تصویر تعهد نامه"}
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}
