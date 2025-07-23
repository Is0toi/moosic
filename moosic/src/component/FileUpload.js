import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions';
import {
  BsSkipBackward,
  BsSkipForward,
  BsFillStopFill,
  BsFillPlayFill
} from 'react-icons/bs';

export default function FileUpload({ audioUrl }) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (!audioUrl && !audio) return;

    const urlToUse = audioUrl || audio;

    // Create WaveSurfer instance
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'black',
      progressColor: 'white',
      url: urlToUse,
      dragToSeek: true,
      height: 100,
      hideScrollBar: true,
      normalize: true,
      barWidth: 3,
      splitChannels: false,
      plugins: [
        RegionsPlugin.create({
          dragSelection: true,
        })
      ]
    });

    // Add region when waveform is ready
   wavesurferRef.current.on('ready', () => {
  console.log('WaveSurfer is ready');
  console.log('Duration:', wavesurferRef.current.getDuration());
  wavesurferRef.current.addRegion({
    start: 2,
    end: 6,
    color: 'rgba(0, 123, 255, 0.3)',
  });
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
        <p>-5s</p>
      </button>
      <button onClick={handlePlayPause}>
        <BsFillPlayFill />
      </button>
      <button onClick={handleStop}>
        <BsFillStopFill />
      </button>
      <button onClick={handleSkipForward}>
        <BsSkipForward />
        <p>+5s</p>
      </button>
    </div>
  );
}