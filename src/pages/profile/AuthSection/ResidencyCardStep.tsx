import { ChangeEvent, useRef, useState } from "react";
import { AuthenticationLevel2Props } from "./types";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { Button, Col, Container, Row, Spinner } from "reactstrap";

import profile from "assets/scss/dashboard/profile.module.scss";
import { useInitialVerification, useUploadDoc } from "services/verification";
export default function ResidencyCardStep({
  onClick,
}: AuthenticationLevel2Props) {
  const uploadDoc = useUploadDoc();
  const initRequest = useInitialVerification();
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);

  const [counter, setCounter] = useState<0 | 1>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
          className="mt-3"
          style={{
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Col xs={6}>
            {imgUrl[1] && <img src={imgUrl[1]} alt="residency" width={150} />}
          </Col>
          <Col xs={6}>
            {imgUrl[2] && <img src={imgUrl[2]} alt="residency" width={150} />}
          </Col>
        </Row>
      );
    }
    return null;
  };
  const finalRequestHandler = async (useInternationalServices: boolean) => {
    await initRequest
      .mutateAsync(useInternationalServices)
      .then(async (res) => {
        console.log(res);
        setIsLoading(false);
        onClick?.(6);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };

  const handleSubmit = async (fileNumber: number) => {
    setIsLoading(true);
    await uploadDoc
      .mutateAsync({
        docType:
          fileNumber === 1 ? "RESIDENCE_PERMIT_FRONT" : "RESIDENCE_PERMIT_BACK",
        file: fileNumber === 1 ? file[0] : file[1],
        fileName: "file",
      })
      .then(async (res) => {
        setIsLoading(false);
        console.log(res);
        if (counter === 1) {
          finalRequestHandler(true);
        } else setCounter(1);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };

  return (
    <Container>
      <Row>
        <Col className={profile["modal-title"]}>
          <h5> خدمات بین المللی </h5>
          <Button color="link" tag="a" href="#">
            چرا باید کارت اقامت ارسال کنم؟
          </Button>
        </Col>
      </Row>
      <Row>
        <div className="alert alert-info mb-4 mt-3">
          برای استفاده از خدمات بین المللی آرسونیکس باید کارت اقامت کشوری که در
          آن ساکن هستید را آپلود کنید.
        </div>
      </Row>
      {renderPreview()}
      <Row>
        <Col className="d-flex justify-content-center">
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
              color="primary"
              outline
              size="large"
              className="py-3 px-5 mx-2"
              disabled={isLoading}
              onClick={() => {
                inputRef1.current?.click();
              }}
            >
              {isLoading ? <Spinner /> : "آپلود روی کارت اقامت "}
              <BsFileEarmarkPlus />
            </Button>
          ) : (
            <Button
              color="primary"
              outline
              size="large"
              className="py-3 px-5 mx-2"
              disabled={isLoading}
              onClick={() => {
                handleSubmit(1);
              }}
            >
              {isLoading ? <Spinner /> : " ارسال روی کارت اقامت"}
              <BsFileEarmarkPlus />
            </Button>
          )}
          {!file["2"] ? (
            <Button
              color="primary"
              outline
              size="large"
              className="py-3 px-5"
              onClick={() => {
                inputRef2.current?.click();
              }}
            >
              آپلود پشت کارت اقامت
              <BsFileEarmarkPlus />
            </Button>
          ) : (
            <Button
              color="primary"
              outline
              size="large"
              className="py-3 px-5"
              onClick={() => {
                handleSubmit(2);
              }}
            >
              ارسال پشت کارت اقامت
              <BsFileEarmarkPlus />
            </Button>
          )}
        </Col>
      </Row>

      <Row>
        <Col className="mt-3 text-center">
          <Button
            className="py-3 px-5"
            color="primary"
            onClick={() => finalRequestHandler(false)}
          >
            قصد استفاده از خدمات بین المللی آرسونیکس را ندارم
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
