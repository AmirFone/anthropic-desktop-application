// renderer/src/components/Microphone.jsx
import React, { useState } from 'react';
import { ReactMic } from 'react-mic';

const Microphone = ({ onTranscribe }) => {
  const [record, setRecord] = useState(false);

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onStop = async (recordedData) => {
    // Save the audio file and send to Main Process for transcription
    const audioPath = recordedData.blobURL; // Or handle file saving
    const response = await window.api.transcribeAudio(audioPath);
    if (response.success) {
      onTranscribe(response.text);
    } else {
      alert(response.message);
    }
  };

  return (
    <div>
      <button onClick={record ? stopRecording : startRecording}>
        <img src="/images/microphone-icon.png" alt="Microphone" />
      </button>
      <ReactMic
        record={record}
        className="sound-wave"
        onStop={onStop}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
    </div>
  );
};

export default Microphone;