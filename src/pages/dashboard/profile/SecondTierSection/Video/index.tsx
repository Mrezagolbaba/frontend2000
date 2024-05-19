import React, { useEffect, useRef, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { Container } from "reactstrap";

//third-party
import PreviewStream from "./PreviewStream";
import FinalView from "./ FinalView";
import { AuthenticationLevel2Props } from "../types";

export default function VideoRecorder({
  onClick,
}: AuthenticationLevel2Props): React.JSX.Element {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaChunks, setMediaChunks] = useState<Blob[]>([]);
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const liveVideoRef = useRef<HTMLVideoElement | null>(null);
  const recordedVideoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Start the live stream when the component mounts
    const startLiveStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        streamRef.current = stream;

        if (liveVideoRef.current) {
          liveVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };

    startLiveStream();

    // Cleanup stream when component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = () => {
    if (streamRef.current) {
      mediaRecorderRef.current = new MediaRecorder(streamRef.current);

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        setMediaChunks((prev) => [...prev, event.data]);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(mediaChunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setMediaBlobUrl(url);

        if (recordedVideoRef.current) {
          recordedVideoRef.current.src = url;
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  //render
  return (
    <Container>
      <PreviewStream
        previewStream={liveVideoRef}
        startRecording={startRecording}
        stopRecording={() => {
          stopRecording();
        }}
        handleNextStep={() => onClick(1)}
        key="video"
      />
      <div>
        <button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        <div>
          <h3>Live Video</h3>
          <video
            ref={liveVideoRef}
            autoPlay
            playsInline
            muted
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        {mediaBlobUrl && (
          <div>
            <h3>Recorded Video</h3>
            <video
              ref={recordedVideoRef}
              controls
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        )}
      </div>
      {/* <ReactMediaRecorder

        video={{
          width: { exact: 480, ideal: 480 },
          height: { exact: 640, ideal: 640 },
          aspectRatio: 0.75,
        }}
        render={({
          previewStream,
          status,
          startRecording,
          stopRecording,
          mediaBlobUrl,
          clearBlobUrl,
        }) => {
          return status === "stopped" && mediaBlobUrl ? (
            <FinalView
              previewStream={previewStream}
              mediaBlobUrl={mediaBlobUrl}
              clearBlobUrl={clearBlobUrl}
              handleNextStep={onClick}
            />
          ) : (
            // <PreviewStream handleNextStep={onClick} />
            <PreviewStream
              handleNextStep={onClick}
              stopRecording={stopRecording}
              startRecording={startRecording}
              previewStream={previewStream}
            />
          );
        }}
      /> */}
    </Container>
  );
}
