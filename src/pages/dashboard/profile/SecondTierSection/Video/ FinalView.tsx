import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsPause, BsPlay } from "react-icons/bs";
import { Button, Col, Row, Spinner } from "reactstrap";
import Compressor from "compressorjs";
import { useUploadDocMutation } from "store/api/profile-management";

//style
import profile from "assets/scss/dashboard/profile.module.scss";
import { MAX_DOC_SIZE, MIN_DOC_SIZE } from "../types";

type Props = {
  mediaBlobUrl: string | undefined;
  clearBlobUrl: () => void;
  handleNextStep: (number) => void;
  previewStream: any;
};

const FinalView = ({ mediaBlobUrl, clearBlobUrl, handleNextStep }: Props) => {
  //hooks
  const videoPlayRef = useRef<HTMLVideoElement>(null);
  const [uploadDoc, { isLoading, isSuccess }] = useUploadDocMutation();

  //states
  const [isPlayVideo, setIsPlayVideo] = useState<boolean>(false);

  //handlers
  const uploadVideo = async () => {
    const response = await fetch(mediaBlobUrl as string);
    const blob = await response.blob();

    new Compressor(blob, {
      quality: 0.6, // Adjust the quality as needed
      success(result) {
        // Use the compressed video Blob (result) as needed
      },
      error(err) {
        console.error(err.message);
      },
    });

    if (blob.size > MAX_DOC_SIZE) {
      toast.error(
        "متاسفانه حجم ویدیوی ضبط شده بیش تر از 60 می باشد. لطفا دوباره تلاش کنید",
        {
          position: "bottom-left",
        },
      );
    } else if (blob.size < MIN_DOC_SIZE) {
      toast.error(
        "متاسفانه حجم ویدیوی ضبط شده کم تر از 10MB می باشد. لطفا دوباره تلاش کنید",
        {
          position: "bottom-left",
        },
      );
    } else
      uploadDoc({
        docType: "SELFIE_VIDEO",
        file: blob,
        fileName: "file",
      })
        .unwrap()
        .catch((error) => {
          if (error.data.message.includes("File should be"))
            toast.error("حجم ویدیو ضبط شده پایین می باشد.", {
              position: "bottom-left",
            });
        });
  };

  //life-cycles
  useEffect(() => {
    isSuccess && handleNextStep?.(4);
  }, [isSuccess, handleNextStep]);

  //render
  return (
    <>
      <Row>
        <Col className={profile["modal-title"]}>
          <h5> تایید احراز هویت ویدیویی</h5>
          <Button
            color="link"
            onClick={() => {
              clearBlobUrl();
            }}
          >
            ضبط مجدد ویدیو
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={profile["video-container"]}>
            <div className={profile["video-warper"]}>
              <video
                ref={videoPlayRef}
                src={mediaBlobUrl}
                autoPlay={false}
                playsInline
                width="100%"
                onPause={() => setIsPlayVideo(false)}
                onPlay={() => setIsPlayVideo(true)}
              />
              <div
                className={profile["video-cover"]}
                onClick={() => {
                  if (isPlayVideo) {
                    videoPlayRef.current?.pause();
                    setIsPlayVideo(false);
                  } else {
                    videoPlayRef.current?.play?.();
                    setIsPlayVideo(true);
                  }
                }}
              >
                {isPlayVideo ? <BsPause /> : <BsPlay />}
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className={profile["video-summary-text"]}>
            ارسال ویدیو به معنای تایید احراز هویت شما و مطالعه قوانین و مقررات
            آرسونیکس می&zwnj;باشد.
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button
            color="primary"
            outline
            size="large"
            className="py-3 px-5"
            onClick={uploadVideo}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                در حال بارگذاری <Spinner />
              </>
            ) : (
              "تایید و ارسال ویدیو"
            )}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default FinalView;
