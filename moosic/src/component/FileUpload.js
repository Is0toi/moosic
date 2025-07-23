import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from "wavesurfer.js"
import { BsSkipBackward, BsSkipForward, BsFillStopFill, BsFillPlayFill } from "react-icons/bs";

export default function FileUpload({ audioUrl }) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (!audioUrl && !audio) return;

    const urlToUse = audioUrl || audio;

    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "black",
      progressColor: "white",
      url: urlToUse,
      dragToSeek: true,
      height: 60,
      hideScrollBar: true,
      normalize: true,
      barGap: 1,
      barHeight: 20,
      barRadius: 20,
      barWidth: 5
    });

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, [audioUrl, audio]);

  const handleStop = () => {
    wavesurferRef.current?.stop();
  };

  const handlePlayPause = () => {
    wavesurferRef.current?.playPause();
  };

  const handleSkipForward = () => {
    wavesurferRef.current?.skip(5);
  };

  const handleSkipBack = () => {
    wavesurferRef.current?.skip(-5);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAudio(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container">
      <div className="upload">
        <h1>Upload a music file of a song playing in your head today!</h1>
        <label className="file-label">Choose File: </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          accept="audio/*"
        />

        {selectedFile && <p>Selected: {selectedFile.name}</p>}
      </div>

      <div ref={waveformRef} />

      <button onClick={handleSkipBack}>
        <BsSkipBackward />
      </button>
      <button onClick={handlePlayPause}>
        <BsFillPlayFill />
      </button>
      <button onClick={handleStop}>
        <BsFillStopFill />
      </button>
      <button onClick={handleSkipForward}>
        <BsSkipForward />
      </button>
    </div>
  );
}