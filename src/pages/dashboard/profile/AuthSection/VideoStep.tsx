import React, { useEffect, useRef, useState } from "react";
import { BsCameraVideo, BsPause, BsPlay } from "react-icons/bs";
import { useReactMediaRecorder } from "react-media-recorder";
import { useUploadDoc } from "services/verification";
import { AuthenticationLevel2Props } from "./types";
import { useAppSelector } from "store/hooks";
import { Button, Col, Container, Row, Spinner } from "reactstrap";

import profile from "assets/scss/dashboard/profile.module.scss";

export default function VideoStep({
  onClick,
}: AuthenticationLevel2Props): React.JSX.Element {
  //hooks
  const user = useAppSelector((state) => state.user);
  const { firstName, lastName, nationalId } = user;
  const recordingTimerRef = useRef<any>(null);
  const videoPlayRef = useRef<HTMLVideoElement>(null);
  const uploadDoc = useUploadDoc();
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream,
    clearBlobUrl,
  } = useReactMediaRecorder({ video: true });

  //states
  const [isPlayVideo, setIsPlayVideo] = useState<boolean>(false);
  const [isRecorded, setIsRecorded] = useState<boolean>(false);
  const maxRecordingDuration = 60; // Maximum recording duration in seconds (1 minutes)
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasCameraAccess, setHasCameraAccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //constants
  const remainingTime = maxRecordingDuration - recordingTime;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  //handlers
  const checkCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setHasCameraAccess(true);
    } catch (error) {
      setHasCameraAccess(false);
    }
  };
  const uploadVideo = async () => {
    setIsLoading(true);
    const response = await fetch(mediaBlobUrl as string);
    const blob = await response.blob();
    await uploadDoc
      .mutateAsync({ docType: "SELFIE_VIDEO", file: blob, fileName: "file" })
      .then((res) => {
        setIsLoading(false);
        onClick?.(6);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };

  //life-cycles
  useEffect(() => {
    checkCameraAccess();
  }, []);
  useEffect(() => {
    if (status === "recording") {
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);

        if (recordingTime >= maxRecordingDuration) {
          stopRecording();
          setRecordingTime(0);
          setIsRecorded(true);
        }
      }, 1000);
    } else if (recordingTimerRef.current !== null) {
      clearInterval(recordingTimerRef.current);
    }

    return () => {
      if (recordingTimerRef.current !== null) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [recordingTime, status, stopRecording]);

  //DOM-rendered functions
  function renderRecordVideo(): React.JSX.Element {
    return (
      <Container>
        <Row className="mb-3">
          <Col className={profile["modal-title"]}>
            <h5> احراز هویت ویدیویی</h5>
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
        {!hasCameraAccess && (
          <Row>
            <div className="alert alert-warning mb-4 mt-3">
              برای ضبط ویدیو، اجازه دسترسی مرورگر به دوربین و میکروفون موبایل یا
              رایانه خود را تایید کنید.
            </div>
          </Row>
        )}
        <Row>
          <Col>
            <div className="timer">
              {minutes}:{seconds < 10 ? "0" : ""}
              {seconds}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className={profile["video-container"]}>
              {status === "recording" ? (
                <video
                  ref={(video) =>
                    video ? (video.srcObject = previewStream) : null
                  }
                  autoPlay
                  muted
                ></video>
              ) : (
                <div className={profile["empty-video"]}>
                  <BsCameraVideo />
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className={profile["note-text"]}>
              متن زیر را به طور واضح همراه با یک مدرک هویتی، هنگام ضبط ویدیو
              نهایتا .در ۶۰ ثانیه بخوانید
            </p>
            <p className={profile["video-summary-text"]}>
              اینجانب
              {` ${firstName} ${lastName} `}
              به کد ملی
              {` ${nationalId} `}
              متعهد می&zwnj;شوم که حساب کاربری و مدارک خود را جهت خرید و فروش
              ارزهای دیجیتال در اختیار دیگران قرار ندهم و به کلیه&zwnj;ی قوانین
              و مقررات درج شده در قوانین سایت متعهد و پایبند باشم و در صورت هر
              گونه تخلف، کلیه&zwnj;ی مسئولیت&zwnj;های حقوقی و کیفری آن را در
              قبال آرسونیکس و اشخاص ثالث، به عهده می گیرم.
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            {status !== "recording" && (
              <Button
                color="danger"
                outline
                size="large"
                className="py-3 px-5"
                onClick={() => {
                  checkCameraAccess();
                  startRecording();
                }}
              >
                شروع ضبط
              </Button>
            )}
            {status === "recording" && (
              <Button
                color="danger"
                size="large"
                className="py-3 px-5"
                onClick={() => {
                  if (recordingTimerRef.current !== null) {
                    clearInterval(recordingTimerRef.current);
                  }
                  setIsRecorded(true);
                  stopRecording();
                  setRecordingTime(0);
                }}
              >
                توقف ضبط
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    );
  }

  function renderConfirmVideo(): React.JSX.Element {
    return (
      <>
        <Row>
          <Col className={profile["modal-title"]}>
            <h5> تایید احراز هویت ویدیویی</h5>
            <Button
              color="link"
              onClick={() => {
                clearBlobUrl();
                setIsRecorded(false);
              }}
            >
              ضبط مجدد ویدیو
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className={profile["video-container"]}>
              {mediaBlobUrl && (
                <>
                  <video
                    ref={videoPlayRef}
                    onEnded={() => setIsPlayVideo(false)}
                  >
                    <source src={mediaBlobUrl} type="video/webm" />
                  </video>
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
                </>
              )}
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
              {isLoading ? <Spinner /> : "تایید و ارسال ویدیو"}
            </Button>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <div className="tab">
      {isRecorded ? renderConfirmVideo() : renderRecordVideo()}
    </div>
  );
}