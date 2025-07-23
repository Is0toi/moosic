import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions';
import {
  BsSkipBackward,
  BsSkipForward,
  BsFillStopFill,
  BsFillPlayFill,
  BsTrash,
  BsArrowRepeat
} from 'react-icons/bs';

export default function FileUpload({ audioUrl }) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const regionsRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    if (!audioUrl && !selectedFile) return;

    const urlToUse = audioUrl || URL.createObjectURL(selectedFile);

    // Initialize WaveSurfer with Regions plugin
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'rgba(100, 100, 255, 0.5)',
      progressColor: 'rgba(70, 70, 255, 0.8)',
      url: urlToUse,
      dragToSeek: true,
      height: 100,
      barWidth: 2,
      plugins: [
        RegionsPlugin.create({
          dragSelection: true, // Enable drag-to-create regions
        })
      ]
    });

    regionsRef.current = wavesurferRef.current.registerPlugin(RegionsPlugin.create());

    // Handle region events
    wavesurferRef.current.on('ready', () => {
      console.log('WaveSurfer ready!');

      // Example: Add a default region (optional)
      regionsRef.current.addRegion({
        start: 0,
        end: 5,
        color: 'rgba(0, 123, 255, 0.3)',
        drag: true,
        resize: true,
      });
    });

    wavesurferRef.current.on('region-created', (region) => {
      console.log('Region created:', region);
      setCurrentRegion(region);
    });

    wavesurferRef.current.on('region-clicked', (region, e) => {
      e.stopPropagation();
      region.play();
    });

    wavesurferRef.current.on('play', () => setIsPlaying(true));
    wavesurferRef.current.on('pause', () => setIsPlaying(false));
    wavesurferRef.current.on('finish', () => setIsPlaying(false));

    return () => wavesurferRef.current?.destroy();
  }, [audioUrl, selectedFile]);

  // Play/Pause toggle
  const handlePlayPause = () => {
    wavesurferRef.current?.playPause();
  };

  // Play the selected region
  const playRegion = () => {
    if (currentRegion) {
      currentRegion.play();
    } else {
      wavesurferRef.current?.play();
    }
  };



  // Loop the selected region
  const toggleLoop = () => {
    if (currentRegion) {
      currentRegion.setOptions({ loop: !currentRegion.loop });
    }
  };

  return (
    <div className="container">
      <div className="upload">
        <h1>Upload a music file of a song playing in your head today!</h1>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          accept="audio/*"
        />
      </div>

      <div ref={waveformRef} />

      <div className="controls">
        <button onClick={() => wavesurferRef.current?.skip(-5)}>
          <BsSkipBackward /> -5s
        </button>
        <button onClick={playRegion}>
          <BsFillPlayFill /> {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={() => wavesurferRef.current?.stop()}>
          <BsFillStopFill /> Stop
        </button>
        <button onClick={() => wavesurferRef.current?.skip(5)}>
          <BsSkipForward /> +5s
        </button>
      </div>

      <div className="region-controls">
        <button onClick={toggleLoop} disabled={!currentRegion}>
          <BsArrowRepeat /> {currentRegion?.loop ? 'Disable Loop' : 'Loop Region'}
        </button>
      </div>
    </div>
  );
}