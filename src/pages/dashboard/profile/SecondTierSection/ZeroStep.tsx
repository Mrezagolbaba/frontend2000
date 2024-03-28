import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "reactstrap";
import ImageUploading from "react-images-uploading";
import { Link } from "react-router-dom";
import { AuthenticationLevel2Props } from "./types";
import { FaUpload } from "react-icons/fa6";
import { useUploadDocMutation } from "store/api/profile-management";
import { AlertDanger, AlertInfo } from "components/AlertWidget";

import profile from "assets/scss/dashboard/profile.module.scss";

function ZeroStep({
  onClick,
  allowStates,
}: AuthenticationLevel2Props): React.JSX.Element {
  //hooks
  const [uploadDoc, { isLoading: isUploading, isSuccess }] =
    useUploadDocMutation();

  //states
  const [images, setImages] = useState<{ data_url: string; file: File }[]>([]);

  //handlers
  const onChange = (imageList) => {
    setImages(imageList);
  };

  //life-cycle
  useEffect(() => {
    if (isSuccess) {
      if (!allowStates.video || !allowStates.commitLetter) onClick(4);
      else onClick(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <Container>
      <Row className="mb-3">
        <Col className={profile["modal-title"]}>
          <h6> بارگذاری مدرک شناسایی</h6>
          <Link to="#" className="title-help">
            آموزش احراز هویت
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <AlertInfo
            hasIcon
            text={
              <>
                <span>
                  فایل مدرک شناسایی (کارت ملی - کارت اقامت) خود را می توانید به
                  صورت png, jpg, jpeg یا pdf تا حداکثر 10MB بارگذاری کنید.
                </span>
              </>
            }
          />
        </Col>
      </Row>

      <ImageUploading
        multiple={false}
        value={images}
        onChange={onChange}
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
                  <Row className={profile["upload-container"]}>
                    <Col xs={12} className="my-2 py-3">
                      <img src={image["data_url"]} alt="" width="100%" />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} className="my-4 d-flex justify-content-end">
                      <Button
                        color="danger"
                        onClick={() => onImageRemove(index)}
                        className="mx-1 px-5 py-3"
                        disabled={isUploading}
                      >
                        حذف فایل
                      </Button>
                      <Button
                        color="primary"
                        onClick={async () => {
                          uploadDoc({
                            docType: "NATIONAL_CARD",
                            file: images?.[0]?.file,
                            fileName: "file",
                          });
                        }}
                        disabled={isUploading}
                        className="mx-1 px-5 py-3"
                      >
                        {isUploading ? <Spinner /> : "ارسال فایل"}
                      </Button>
                    </Col>
                  </Row>
                </>
              ))
            ) : (
              <Row
                className={`${profile["upload-container"]} ${profile["empty-upload"]}`}
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
                  <div className="mt-4">
                    روی این قسمت کلیک کنید یا عکس مدرک هویتی خود را در این قسمت
                    بندازید.
                  </div>
                </Col>
              </Row>
            )}
          </>
        )}
      </ImageUploading>
    </Container>
  );
}

export default ZeroStep;
