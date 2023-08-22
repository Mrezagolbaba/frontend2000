import { Alert, Button, Row, Spin, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  BsCameraVideo,
  BsExclamationTriangle,
  BsPause,
  BsPlay,
} from "react-icons/bs";
import { useReactMediaRecorder } from "react-media-recorder";
import useUploadDoc from "services/verification";
import { AuthenticationLevel2Props } from "./types";

const { Title, Paragraph } = Typography;

export default function VideoStep({
  onClick,
}: AuthenticationLevel2Props): React.JSX.Element {
  //hooks
  const recordingTimerRef = useRef<NodeJS.Timer | null>(null);
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
      .mutateAsync({ docType: "mp4", file: blob })
      .then((res) => {
        setIsLoading(false);
        console.log(res);
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
      <>
        <Row className="justify-content-between my-3">
          <Title level={5}> احراز هویت ویدیویی</Title>
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
        {!hasCameraAccess && (
          <Row>
            <Alert
              type="warning"
              showIcon
              className="mb-4 mt-3"
              style={{ width: "100%" }}
              message="برای ضبط ویدیو، اجازه دسترسی مرورگر به
          دوربین و میکروفون موبایل یا رایانه خود
          را تایید کنید."
              icon={<BsExclamationTriangle />}
            />
          </Row>
        )}
        <Row>
          <div className="timer">
            {minutes}:{seconds < 10 ? "0" : ""}
            {seconds}
          </div>
        </Row>
        <Row>
          <div className="video-container mb-4">
            {status === "recording" ? (
              <video
                ref={(video) =>
                  video ? (video.srcObject = previewStream) : null
                }
                autoPlay
                muted
              ></video>
            ) : (
              <div className="empty-video">
                <BsCameraVideo />
              </div>
            )}
          </div>
        </Row>
        <Row>
          <Paragraph className="note-text">
            متن زیر را به طور واضح همراه با یک مدرک هویتی، هنگام ضبط ویدیو
            نهایتا .در ۶۰ ثانیه بخوانید
          </Paragraph>
          <Paragraph className="auth-sample-text mb-4 mt-2">
            اینجانب بهزاد بابائی به کد ملی 002043434 متعهد می&zwnj;شوم که حساب
            کاربری و مدارک خود را جهت خرید و فروش ارزهای دیجیتال در اختیار
            دیگران قرار ندهم و به کلیه&zwnj;ی قوانین و مقررات درج شده در قوانین
            سایت متعهد و پایبند باشم و در صورت هر گونه تخلف، کلیه&zwnj;ی
            مسئولیت&zwnj;های حقوقی و کیفری آن را در قبال آرسونیکس و اشخاص ثالث،
            به عهده می گیرم.
          </Paragraph>
        </Row>
        <Row className="justify-content-center">
          {status !== "recording" && (
            <Button
              type="default"
              danger
              size="large"
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
              type="primary"
              danger
              size="large"
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
        </Row>
      </>
    );
  }

  function renderConfirmVideo(): React.JSX.Element {
    return (
      <>
        <Row className="justify-content-between my-3">
          <Title level={5}> تایید احراز هویت ویدیویی</Title>
          <Button
            type="text"
            onClick={() => {
              clearBlobUrl();
              setIsRecorded(false);
            }}
            className="title-help"
          >
            ضبط مجدد ویدیو
          </Button>
        </Row>
        <Row>
          <div className="video-container mb-4">
            {mediaBlobUrl && (
              <>
                <video ref={videoPlayRef} onEnded={() => setIsPlayVideo(false)}>
                  <source src={mediaBlobUrl} type="video/webm" />
                </video>
                <div
                  className="video-cover"
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
        </Row>
        <Row>
          <Paragraph className="auth-sample-text mb-4 mt-2">
            ارسال ویدیو به معنای تایید احراز هویت شما و مطالعه قوانین و مقررات
            آرسونیکس می&zwnj;باشد.
          </Paragraph>
        </Row>
        <Row className="justify-content-center">
          <Button
            type="primary"
            ghost
            size="large"
            onClick={uploadVideo}
            disabled={isLoading}
          >
            {isLoading ? <Spin /> : "تایید و ارسال ویدیو"}
          </Button>
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
