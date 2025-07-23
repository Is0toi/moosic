import React, { useEffect, useRef } from 'react'
import WaveSurfer from "wavesurfer.js"
import { BsSkipBackward, BsSkipForward, BsFillStopFill, BsFillPlayFill } from "react-icons/bs";

export default function FileUpload({ audioUrl }) {
  const waveformRef = useRef(null);
  let wavesurfer;

  useEffect(() => {
    wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "black",
      progressColor: "white",
      url: audioUrl,
      dragToSeek: true,
      width: "35vw",
      height: 60,
      hideScrollBar: true,
      normalize: true,
      barGap: 1,
      barHeight: 20,
      barRadius: 20,
      barWidth: 5
    })
    return () => {
      wavesurfer.destroy();
    }
  }, [])

  const handleStop = () => {
    if (wavesurfer) {
      wavesurfer.stop()
    }
  }
  const handlePlayPause = () => {
    if (wavesurfer) {
      wavesurfer.playPause()
    }
  }
  const handleSkipForward = () => {
    if (wavesurfer) {
      wavesurfer.skip(5)
    }
  }
  const handleSkipBack = () => {
    if (wavesurfer) {
      wavesurfer.skip(-5)
    }
  }

  return (
    <div className="container">
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
  )
}