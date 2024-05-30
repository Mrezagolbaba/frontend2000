import { useEffect, useRef, useState } from "react";
import { BsCameraVideo } from "react-icons/bs";
import { Button, Col, Row } from "reactstrap";
import CircleProgressBar from "./CircleProgressBar";

//third-party
import { useAppSelector } from "store/hooks";
import { AlertDanger, AlertInfo, AlertSuccess } from "components/AlertWidget";

//style
import profile from "assets/scss/dashboard/profile.module.scss";

type Props = {
  previewStream: MediaStream | null;
  startRecording: () => void;
  stopRecording: () => void;
  handleNextStep: (number) => void;
};

const RecorderStatus = {
  IDLE: "IDLE",
  CAMERA_ON: "CAMERA_ON",
  RECORDING: "RECORDING",
  STOP_RECORDING: "STOP_RECORDING",
};

const PreviewStream = ({
  previewStream,
  startRecording,
  stopRecording,
  handleNextStep,
}: Props) => {
  //hooks
  const { firstName, lastName, nationalId } = useAppSelector(
    (state) => state.user,
  );
  const recordingTimerRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  //states
  const [hasCameraAccess, setHasCameraAccess] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [recordStatus, setRecordStatus] = useState(RecorderStatus.IDLE);

  //constants
  const maxRecordingDuration = 60; // Maximum recording duration in seconds (1 minutes)
  const remainingTime = maxRecordingDuration - recordingTime;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  //handlers
  const checkCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      stream.getTracks().forEach((track) => track.stop());
      setHasCameraAccess(true);
      setRecordStatus(RecorderStatus.CAMERA_ON);
      startRecording();
    } catch (error) {
      setHasCameraAccess(false);
      setRecordStatus(RecorderStatus.IDLE);
    }
  };

  const handleStartRecording = async () => {
    setRecordStatus(RecorderStatus.RECORDING);
    startRecording();
  };

  const handleStopRecording = async () => {
    setRecordStatus(RecorderStatus.STOP_RECORDING);
    if (recordingTimerRef.current !== null) {
      clearInterval(recordingTimerRef.current);
    }
    stopRecording();
  };

  useEffect(() => {
    if (recordStatus === RecorderStatus.RECORDING) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);

        if (recordingTime === 60) {
          stopRecording();
          setRecordingTime(0);
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
  }, [recordStatus, recordingTime, stopRecording]);

  useEffect(() => {
    if (recordStatus === RecorderStatus.IDLE) checkCameraAccess();
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream;
      videoRef.current.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewStream]);

  //render
  return (
    <>
      <Row className="mb-3">
        <Col className={profile["modal-title"]}>
          <h5> احراز هویت ویدیویی</h5>
          <Button
            color="link"
            onClick={() => {
              handleNextStep(1);
            }}
          >
            تغییر روش احراز هویت
          </Button>
        </Col>
      </Row>
      {!hasCameraAccess && (
        <Row>
          <AlertDanger
            hasIcon
            text={
              <Col className="d-flex flex-row justify-content-between">
                <p style={{ alignSelf: "center", marginBottom: "0" }}>
                  برای ضبط ویدیو، اجازه دسترسی مرورگر به دوربین و میکروفون
                  موبایل یا رایانه خود را تایید کنید. (اگر برای دسترسی تصویر و
                  صدا به مشکل خورده اید لطفا تنظیمات مرورگر خود را جک کنید.)
                </p>
              </Col>
            }
          />
        </Row>
      )}

      <Row>
        <Col>
          <AlertInfo
            hasIcon
            text="لطفا توجه داشته باشید که حجم فایل ضبط شده باید بین 10MB تا 60MB باشد."
          />
          <AlertSuccess
            text="متن زیر را به طور واضح همراه با یک مدرک هویتی، هنگام ضبط ویدیو
          بخوانید."
            hasIcon
          />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <div className="timer">
            {minutes}:{seconds < 10 ? "0" : ""}
            {seconds}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={profile["video-container"]}>
            {recordStatus === RecorderStatus.IDLE ? (
              <div className={profile["empty-video"]}>
                <BsCameraVideo />
              </div>
            ) : (
              <>
                <div className={profile["video-warper"]}>
                  <video
                    id="video-view"
                    width="100%"
                    playsInline
                    ref={videoRef}
                    autoPlay
                  />
                </div>
                {recordStatus === RecorderStatus.RECORDING && (
                  <CircleProgressBar counter={recordingTime} />
                )}
              </>
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className={profile["video-summary-text"]}>
            اینجانب
            {` ${firstName} ${lastName} `}
            به کد ملی
            {` ${nationalId} `}
            متعهد می&zwnj;شوم که حساب کاربری و مدارک خود را جهت خرید و فروش
            ارزهای دیجیتال در اختیار دیگران قرار ندهم و به کلیه&zwnj;ی قوانین و
            مقررات درج شده در قوانین سایت متعهد و پایبند باشم و در صورت هر گونه
            تخلف، کلیه&zwnj;ی مسئولیت&zwnj;های حقوقی و کیفری آن را در قبال
            آرسونیکس و اشخاص ثالث، به عهده می گیرم.
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-row justify-content-center my-3">
          <Button
            color="primary"
            className="px-5 py-3 mx-2"
            disabled={recordStatus === RecorderStatus.RECORDING}
            onClick={handleStartRecording}
          >
            شروع
          </Button>
          <Button
            color="danger"
            className="px-5 py-3 mx-2"
            disabled={recordStatus !== RecorderStatus.RECORDING}
            onClick={handleStopRecording}
          >
            توقف
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default PreviewStream;
