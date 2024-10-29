// renderer/src/components/Microphone.jsx
import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import { ReactMediaRecorder } from "react-media-recorder";
const Microphone = ({ onTranscribe }) => {
  const [record, setRecord] = useState(false);

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onStopRecording = async (recordedData) => {
    // Convert blob URL to a file path if necessary
    // Electron doesn't have direct access to blob URLs, so you might need to handle saving the blob
    // For simplicity, assume recordedData.blobURL is accessible via file path
    const audioPath = recordedData.blobURL.replace('file://', '');
    const response = await window.api.transcribeAudio(audioPath);
    if (response.success) {
      onTranscribe(response.text);
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="microphone">
      <button onClick={record ? stopRecording : startRecording}>
        <img src="/images/microphone-icon.png" alt="Microphone" />
      </button>
      <ReactMediaRecorder
        record={record}
        className="sound-wave"
        onStop={onStopRecording}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
    </div>
  );
};

export default Microphone;