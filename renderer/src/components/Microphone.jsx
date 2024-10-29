// renderer/src/components/Microphone.jsx
import React from 'react';
import { ReactMediaRecorder } from "react-media-recorder";

const Microphone = ({ onTranscribe }) => (
  <div className="microphone">
    <ReactMediaRecorder
      audio
      onStop={async (blobUrl, blob) => {
        // Use blob URL directly or convert Blob to file if needed
        const response = await window.api.transcribeAudio(blob);
        if (response.success) {
          onTranscribe(response.text); // Transcription text
        } else {
          alert(response.message);
        }
      }}
      render={({ startRecording, stopRecording }) => (
        <>
          <button onClick={startRecording}>Start Recording</button>
          <button onClick={stopRecording}>Stop Recording</button>
        </>
      )}
    />
  </div>
);

export default Microphone;