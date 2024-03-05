import React from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { Container } from "reactstrap";

//third-party
import PreviewStream from "./PreviewStream";
import FinalView from "./ FinalView";
import { AuthenticationLevel2Props } from "../types";

export default function VideoRecorder({
  onClick,
}: AuthenticationLevel2Props): React.JSX.Element {
  //render
  return (
    <Container>
      <ReactMediaRecorder
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
      />
    </Container>
  );
}
