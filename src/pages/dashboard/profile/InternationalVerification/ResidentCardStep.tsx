import ImageUploading, { ImageListType } from "react-images-uploading";
import { AlertDanger, AlertInfo } from "components/AlertWidget";
import { Button, Col, Row, Spinner } from "reactstrap";
import { FaUpload } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { useUploadDocMutation } from "store/api/profile-management";

import profile from "assets/scss/dashboard/profile.module.scss";

type Props = {
  successHandler: () => void;
};

export default function ResidentCardStep({ successHandler }: Props) {
  // ==============|| States ||================= //
  const [image1, setImage1] = useState<ImageListType>([]);
  const [image2, setImage2] = useState<ImageListType>([]);

  // ==============|| Hooks ||================= //
  const [uploadDoc1, { isLoading: loading1, isSuccess: success1 }] =
    useUploadDocMutation();
  const [uploadDoc2, { isLoading: loading2, isSuccess: success2 }] =
    useUploadDocMutation();

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    if (success1 && success2) {
      successHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success1, success2]);

  // ==============|| Render ||================= //
  return (
    <Row>
      <Col xs={12} className="my-3">
        <AlertInfo
          text=" برای استفاده از خدمات بین المللی آرسونیکس باید کارت اقامت کشوری که در آن ساکن هستید را آپلود کنید."
          hasIcon
        />
      </Col>
      <Col xs={6}>
        <ImageUploading
          multiple={false}
          value={image1}
          onChange={(file) => {
            setImage1(file);
          }}
          dataURLKey="data_url"
          acceptType={["jpg", "jpeg", "png", "pdf"]}
        >
          {({ imageList, onImageUpload, onImageRemove, errors, dragProps }) => (
            <>
              {errors && (
                <AlertDanger
                  text={
                    errors.maxFileSize
                      ? "حجم فایل انتخابی شما نباید بیش تر از ۱۰MB باشد."
                      : errors.acceptType
                        ? "فرمت فایل انتخابی شما درست نمی باشد."
                        : "لطفا دقت کنید که تنها مجاز به بارگذاری یک فایل می باشید."
                  }
                  hasIcon
                />
              )}

              {imageList.length > 0 ? (
                imageList.map((image, index) => (
                  <>
                    <Row className={`${profile["upload-container"]} mx-1`}>
                      <Col xs={12} className="my-2 py-3">
                        <img src={image["data_url"]} alt="" width="100%" />
                        <Button
                          color="danger"
                          onClick={() => onImageRemove(index)}
                          disabled={loading1 || loading2}
                        >
                          <MdOutlineDeleteOutline />
                        </Button>
                      </Col>
                    </Row>
                  </>
                ))
              ) : (
                <Row
                  className={`${profile["upload-container"]} ${profile["empty-upload"]} mx-1`}
                  onClick={() => {
                    onImageUpload();
                  }}
                  {...dragProps}
                >
                  <Col
                    xs={12}
                    className="my-2 d-flex flex-column justify-content-center align-items-center"
                    style={{ height: "150px" }}
                  >
                    <FaUpload />
                    <div className="mt-4">بارگذاری عکس روی کارت اقامت</div>
                  </Col>
                </Row>
              )}
            </>
          )}
        </ImageUploading>
      </Col>
      <Col xs={6}>
        <ImageUploading
          multiple={false}
          value={image2}
          onChange={(file) => {
            setImage2(file);
          }}
          dataURLKey="data_url2"
          acceptType={["jpg", "jpeg", "png", "pdf"]}
        >
          {({ imageList, onImageUpload, onImageRemove, errors, dragProps }) => (
            <>
              {errors && (
                <AlertDanger
                  text={
                    errors.maxFileSize
                      ? "حجم فایل انتخابی شما نباید بیش تر از ۱۰MB باشد."
                      : errors.acceptType
                        ? "فرمت فایل انتخابی شما درست نمی باشد."
                        : "لطفا دقت کنید که تنها مجاز به بارگذاری یک فایل می باشید."
                  }
                  hasIcon
                />
              )}

              {imageList.length > 0 ? (
                imageList.map((image, index) => (
                  <>
                    <Row className={`${profile["upload-container"]} mx-1`}>
                      <Col xs={12} className="my-2 py-3">
                        <img src={image["data_url2"]} alt="" width="100%" />
                        <Button
                          color="danger"
                          onClick={() => onImageRemove(index)}
                          disabled={loading1 || loading2}
                        >
                          <MdOutlineDeleteOutline />
                        </Button>
                      </Col>
                    </Row>
                  </>
                ))
              ) : (
                <Row
                  className={`${profile["upload-container"]} ${profile["empty-upload"]} mx-1`}
                  onClick={() => {
                    onImageUpload();
                  }}
                  {...dragProps}
                >
                  <Col
                    xs={12}
                    className="my-2 d-flex flex-column justify-content-center align-items-center"
                    style={{ height: "150px" }}
                  >
                    <FaUpload />
                    <div className="mt-4">بارگذاری عکس پشت کارت اقامت</div>
                  </Col>
                </Row>
              )}
            </>
          )}
        </ImageUploading>
      </Col>

      <Col xs={12} className="my-4 d-flex justify-content-center">
        <Button
          color="primary"
          onClick={async () => {
            uploadDoc1({
              docType: "RESIDENCE_PERMIT_FRONT",
              file: image1?.[0]?.file,
              fileName: "file",
            });
            uploadDoc2({
              docType: "RESIDENCE_PERMIT_BACK",
              file: image2?.[0]?.file,
              fileName: "file",
            });
          }}
          disabled={
            loading1 || loading2 || image1.length < 1 || image2.length < 1
          }
          className="mx-1 px-5 py-3"
        >
          {loading1 || loading2 ? <Spinner /> : "ارسال کارت اقامت"}
        </Button>
      </Col>
    </Row>
  );
}
