import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions';
import {
  BsSkipBackward,
  BsSkipForward,
  BsFillStopFill,
  BsFillPlayFill,
  BsArrowRepeat,
} from 'react-icons/bs';

export default function FileUpload({ audioUrl, onSubmit }) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const regionsPluginRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [isLooping, setIsLooping] = useState(false);
  const [submittedRegion, setSubmittedRegion] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");



  const handleSubmitRegion = () => {
    if (!currentRegion) {
      alert("Please create or select a region first");
      return;
    }

    const regionData = {
      start: currentRegion.start,
      end: currentRegion.end,
      duration: currentRegion.end - currentRegion.start
    };

    setSubmittedRegion(regionData);
    setHasSubmitted(true);
    onSubmit({
      song: songName,
      artist: artistName,
      region: regionData,
    });
  };
  // const handleSubmitSong = () => {
  //   if (songName.trim()) {
  //     onSubmit(songName);
  //   }
  // };

  // const handleChange = (e) => {
  //   setSongName(e.target.value);
  // }

  // const handleSubmitArtists = () => {
  //   if (artistName.trim()) {
  //     onSubmit(artistName);
  //   }
  // };

  // const handleChangeArtists = (e) => {
  //   setArtistName(e.target.value);
  // }

  useEffect(() => {
    if (!audioUrl && !selectedFile) return;

    const urlToUse = audioUrl || URL.createObjectURL(selectedFile);

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'rgba(100, 100, 255, 0.5)',
      progressColor: 'rgba(70, 70, 255, 0.8)',
      height: 100,
      barWidth: 2,
      dragToSeek: true,
    });

    wavesurferRef.current = wavesurfer;

    const regions = wavesurfer.registerPlugin(
      RegionsPlugin.create({
        dragSelection: {
          slop: 5,
        },
      })
    );
    regionsPluginRef.current = regions;

    wavesurfer.on('ready', () => {
      console.log('WaveSurfer ready!');
      const defaultRegion = regions.addRegion({
        start: 0,
        end: 5,
        color: 'rgba(255, 0, 0, 0.3)',
        drag: true,
        resize: true,
      });
      setCurrentRegion(defaultRegion);
    });

    regions.on('region-created', (region) => {
      console.log('Region created:', region);
      setCurrentRegion(region);
    });

    regions.on('region-clicked', (region, e) => {
      e.stopPropagation();
      setCurrentRegion(region);
      region.play();
    });

    regions.on('region-updated', (region) => {
      setCurrentRegion(region);
    });

    wavesurfer.on('timeupdate', (time) => {
      if (currentRegion && isLooping && time >= currentRegion.end) {
        wavesurfer.setTime(currentRegion.start);
        wavesurfer.play();
      }
    });

    wavesurfer.on('play', () => setIsPlaying(true));
    wavesurfer.on('pause', () => setIsPlaying(false));
    wavesurfer.on('finish', () => setIsPlaying(false));

    wavesurfer.load(urlToUse);

    return () => {
      wavesurfer.destroy();
    };
  }, [audioUrl, selectedFile]);

  const handlePlayPause = () => {
    if (!wavesurferRef.current) return;

    if (wavesurferRef.current.isPlaying()) {
      wavesurferRef.current.pause();
    } else {
      playRegion();
    }
  };

  const playRegion = () => {
    if (!wavesurferRef.current || !currentRegion) return;

    wavesurferRef.current.stop();
    wavesurferRef.current.setTime(currentRegion.start);
    wavesurferRef.current.play();
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  return (
    <div className="container">
      {!hasSubmitted ? (
        <>
          <div className="upload">
            <h1>Upload a music file of a song playing in your head today!</h1>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              accept="audio/*"
            />
          </div>

          <div ref={waveformRef} style={{ width: '100%', height: '100px' }} />

          <div className="controls">
            <button onClick={() => wavesurferRef.current?.skip(-5)}>
              <BsSkipBackward /> -5s
            </button>
            <button onClick={handlePlayPause}>
              <BsFillPlayFill /> {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button onClick={() => wavesurferRef.current?.stop()}>
              <BsFillStopFill /> Stop
            </button>
            <button onClick={() => wavesurferRef.current?.skip(5)}>
              <BsSkipForward /> +5s
            </button>
            <button onClick={toggleLoop}>
              <BsArrowRepeat /> {isLooping ? 'Looping' : 'Loop'}
            </button>

            <div className="text-inputs">
              <p>What's the song name?</p>
              <input
                className="song-name"
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
              />

              <p>What's the artist's name?</p>
              <input
                className="artist-name"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
              />
            </div>

            {currentRegion && (
              <div className="region-info">
                Current Region: {currentRegion.start.toFixed(1)}s - {currentRegion.end.toFixed(1)}s
                <button onClick={handleSubmitRegion}>Submit</button>
              </div>
            )}
          </div>
        </>
      ) : (
        submittedRegion && (
          <div
            className="submitted-card"
            style={{
              border: '2px solid #444',
              borderRadius: '12px',
              padding: '1rem 1.5rem',
              backgroundColor: '#f4f4f4',
              maxWidth: '400px',
              margin: '2rem auto',
              textAlign: 'center',
            }}
          >
            <h2>{songName} by {artistName}</h2>
            <p><strong>Start:</strong> {submittedRegion.start.toFixed(2)} seconds</p>
            <p><strong>End:</strong> {submittedRegion.end.toFixed(2)} seconds</p>
            <p><strong>Duration:</strong> {submittedRegion.duration.toFixed(2)} seconds</p>
          </div>
        )
      )}
    </div>
  );

}