// import React, { ReactNode, useEffect, useRef, useState } from "react";
// import { Button, Modal } from "antd";
// import { useReactMediaRecorder } from "react-media-recorder";
// import { BsCameraVideo, BsPause, BsPlay, BsRecord, BsStop, BsTrash } from "react-icons/bs";
// import "./style.sass";

// type Props = {
//   title: string;
//   isOpen: boolean;
//   setIsOpen: (value: boolean) => void;
//   onSubmit: (file: Blob) => void;
//   hintContainer: ReactNode;
// };

// const VideoAuth = ({ isOpen, setIsOpen, onSubmit, title, hintContainer }: Props) => {
//   const {
//     status,
//     startRecording,
//     stopRecording,
//     mediaBlobUrl,
//     previewStream,
//     clearBlobUrl,
//   } = useReactMediaRecorder({ 
//     video: { facingMode: "user" }, // Ensure correct facing mode for mobile
//     onStop: (blobUrl, blob) => console.log("Recording stopped, Blob URL:", blobUrl)
//   });

//   const [isPlayVideo, setIsPlayVideo] = useState<boolean>(false);
//   const [recordingTime, setRecordingTime] = useState(0);
//   const maxRecordingDuration = 600; // Maximum recording duration in seconds (10 minutes)
//   const recordingTimerRef = useRef<any>(null);

//   const remainingTime = maxRecordingDuration - recordingTime;
//   const minutes = Math.floor(remainingTime / 60);
//   const seconds = remainingTime % 60;

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   const handleSubmit = async () => {
//     if (mediaBlobUrl) {
//       try {
//         const response = await fetch(mediaBlobUrl);
//         const blob = await response.blob();
//         onSubmit?.(blob);
//       } catch (error) {
//         console.error("Error converting Blob URL to File:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     if (status === "recording") {
//       recordingTimerRef.current = setInterval(() => {
//         setRecordingTime((prevTime) => prevTime + 1);
//         if (recordingTime >= maxRecordingDuration) {
//           stopRecording();
//         }
//       }, 1000);
//     } else if (recordingTimerRef.current !== null) {
//       clearInterval(recordingTimerRef.current);
//     }

//     return () => {
//       if (recordingTimerRef.current !== null) {
//         clearInterval(recordingTimerRef.current);
//       }
//     };
//   }, [status, recordingTime, stopRecording]);

//   return (
//     <Modal
//       title={title}
//       open={isOpen}
//       onCancel={handleClose}
//       onOk={handleSubmit}
//       footer={[
//         <Button key="submit" type="primary" onClick={handleSubmit}>
//           ثبت
//         </Button>,
//         <Button key="back" onClick={handleClose}>
//           انصراف
//         </Button>,
//       ]}
//     >
//       <div className="video-auth">
//         <div className="timer">
//           {minutes}:{seconds < 10 ? "0" : ""}
//           {seconds}
//         </div>
//         <div className="video-container">
//           {status === "recording" ? (
//             <video
//               autoPlay
//               playsInline
//               muted
//               controls={false}
//               // @ts-ignore
//               srcObject={previewStream as MediaStream}
//             ></video>
//           ) : mediaBlobUrl ? (
//             <video id="video-recorded" controls>
//               <source src={mediaBlobUrl} type="video/webm" />
//               Your browser does not support the video tag.
//             </video>
//           ) : (
//             <div className="empty-video">
//               <BsCameraVideo />
//             </div>
//           )}
//         </div>
//         <div className="action-bar">
//           {status !== "stopped" && (
//             <>
//               <Button
//                 onClick={() => {
//                   if (recordingTimerRef.current !== null) {
//                     clearInterval(recordingTimerRef.current);
//                   }
//                   stopRecording();
//                 }}
//                 loading={status === "stopping"}
//                 disabled={status !== "recording"}
//                 danger
//               >
//                 <BsStop />
//               </Button>
//               <Button
//                 onClick={startRecording}
//                 className="record-button"
//                 disabled={status === "recording"}
//               >
//                 <BsRecord />
//               </Button>
//             </>
//           )}
//           {status === "stopped" && (
//             <>
//               <Button
//                 key="delete-video"
//                 className="delete-button"
//                 onClick={clearBlobUrl}
//               >
//                 <BsTrash />
//               </Button>
//               <Button
//                 key="play-video"
//                 onClick={() => {
//                   const video = document.getElementById(
//                     "video-recorded"
//                   ) as HTMLVideoElement;
//                   if (isPlayVideo) {
//                     video?.pause?.();
//                     setIsPlayVideo(false);
//                   } else {
//                     video?.play?.();
//                     setIsPlayVideo(true);
//                   }
//                 }}
//               >
//                 {isPlayVideo ? <BsPause /> : <BsPlay />}
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//       {hintContainer}
//     </Modal>
//   );
// };

// export default VideoAuth;
import React, { useRef, useState, useCallback } from 'react';
import { Button, Modal } from 'antd';
import Webcam from 'react-webcam';
import { BsCameraVideo, BsPause, BsPlay, BsRecord, BsStop, BsTrash } from 'react-icons/bs';
import './style.sass';

type Props = {
  title: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onSubmit: (file: Blob) => void;
  hintContainer: React.ReactNode;
};

const VideoAuth = ({ title, isOpen, setIsOpen, onSubmit, hintContainer }: Props) => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isPlayVideo, setIsPlayVideo] = useState(false);
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    if (webcamRef.current && webcamRef.current.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm',
      });
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
      mediaRecorderRef.current.start();
    }
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      const url = URL.createObjectURL(blob);
      setMediaBlobUrl(url);
      onSubmit(blob);
      setRecordedChunks([]);
    }
  }, [recordedChunks, onSubmit]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={handleClose}
      onOk={handleDownload}
      footer={[
        <Button key="submit" type="primary" onClick={handleDownload}>
          ثبت
        </Button>,
        <Button key="back" onClick={handleClose}>
          انصراف
        </Button>,
      ]}
    >
      <div className="video-auth">
        <div className="video-container">
          {capturing ? (
            <Webcam audio={true} ref={webcamRef} />
          ) : mediaBlobUrl ? (
            <video
              id="video-recorded"
              controls
              autoPlay={false}
              playsInline
              disablePictureInPicture
              src={mediaBlobUrl}
            />
          ) : (
            <div className="empty-video">
              <BsCameraVideo />
            </div>
          )}
        </div>
        <div className="action-bar">
          {capturing ? (
            <Button onClick={handleStopCaptureClick} danger>
              <BsStop />
            </Button>
          ) : (
            <Button onClick={handleStartCaptureClick}>
              <BsRecord />
            </Button>
          )}
          {mediaBlobUrl && (
            <>
              <Button
                key="delete-video"
                className="delete-button"
                onClick={() => {
                  setMediaBlobUrl(null);
                  setRecordedChunks([]);
                }}
              >
                <BsTrash />
              </Button>
              <Button
                key="play-video"
                onClick={() => {
                  const video = document.getElementById('video-recorded') as HTMLVideoElement;
                  if (isPlayVideo) {
                    video?.pause();
                    setIsPlayVideo(false);
                  } else {
                    video?.play();
                    setIsPlayVideo(true);
                  }
                }}
              >
                {isPlayVideo ? <BsPause /> : <BsPlay />}
              </Button>
            </>
          )}
        </div>
      </div>
      {hintContainer}
    </Modal>
  );
};

export default VideoAuth;

