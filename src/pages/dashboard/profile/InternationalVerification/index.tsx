import { ChangeEvent, useEffect, useRef, useState } from "react";
import { BsCheck, BsFileEarmarkPlus } from "react-icons/bs";
import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";

import profile from "assets/scss/dashboard/profile.module.scss";
import { useInitialVerification, useUploadDoc } from "services/verification";

import toast from "react-hot-toast";
import { useEnglishNamesMutation } from "store/api/user";
import {
  useInitialInternationalMutation,
  useUploadDocMutation,
} from "store/api/profile-management";
export default function InternationalVerification() {
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);

  const [counter, setCounter] = useState<0 | 1>(0);
  const [imgUrl, setImgUrl] = useState<{ 1: string | null; 2: string | null }>({
    1: null,
    2: null,
  });
  const [file, setFile] = useState<{ 1: File | null; 2: File | null }>({
    1: null,
    2: null,
  });

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [uploadDoc, { isLoading, isSuccess, isError, error }] =
    useUploadDocMutation();
  const [initRequest] = useInitialInternationalMutation();
  const [
    namesRequest,
    { data, isLoading: isLoadingNames, isSuccess: successPublish },
  ] = useEnglishNamesMutation();

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
  const finalRequestHandler = () => {
    initRequest();
  };

  const handleSubmit = async (fileNumber: number) => {
    const body = {
      docType:
        fileNumber === 1 ? "RESIDENCE_PERMIT_FRONT" : "RESIDENCE_PERMIT_BACK",
      file: file[fileNumber],
      fileName: "file",
    };

    await uploadDoc({ ...body });
  };

  useEffect(() => {
    if (successPublish) {
        finalRequestHandler();
      toast.success("اطلاعات با موفقیت ثبت شد.", { position: "bottom-right" });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successPublish]);

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
              disabled={isLoading || counter > 0}
              onClick={() => {
                handleSubmit(1);
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : counter === 1 ? (
                <>
                  روی کارت اقامت ارسال شد
                  <BsCheck />
                </>
              ) : (
                <>
                  ارسال روی کارت اقامت
                  <BsFileEarmarkPlus />
                </>
              )}
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
              color={counter === 1 ? "success" : "primary"}
              outline
              size="large"
              className="py-3 px-5"
              disabled={isLoading || counter > 1}
              onClick={() => {
                handleSubmit(2);
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  ارسال پشت کارت اقامت
                  <BsFileEarmarkPlus />
                </>
              )}
            </Button>
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col xs={12} md={6}>
          <FormGroup>
            <Label htmlFor="">{`نام (انگلیسی):`}</Label>
            <Input
              dir="ltr"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={6}>
          <FormGroup>
            <Label htmlFor="">{`نام خانوادگی (انگلیسی):`}</Label>
            <Input
              dir="ltr"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </FormGroup>
        </Col>
        <Col xs={12} className="text-center mt-2">
          <Button
            color="primary"
            type="button"
            disabled={isLoadingNames}
            className="px-5 py-3"
            onClick={() => {
              namesRequest({ firstName: firstName, lastName: lastName });
            }}
          >
            {isLoadingNames ? <Spinner /> : "ارسال"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
