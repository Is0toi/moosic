import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';

function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('');
    const [loop, setLoop] = useState(true);
    const waveformRef = useRef(null);
    const wavesurferRef = useRef(null);
    const regionsRef = useRef(null);
    const activeRegionRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files?.[0]) {
            setSelectedFile(e.target.files[0]);
            setUploadStatus('');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('Select a music file');
            return;
        }
    };

    useEffect(() => {
        if (!selectedFile || !waveformRef.current) {
            return;
        }

        if (wavesurferRef.current) {
            wavesurferRef.current.destroy();
            regionsRef.current = null;
        }

        //This is the waveee
        const ws = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: '#ff3b3f',
            progressColor: 'rgb(100, 0, 100)',
            url: URL.createObjectURL(selectedFile),
        });

        // Plugin for region sections
        const regions = RegionsPlugin.create();
        ws.registerPlugin(regions);
        regionsRef.current = regions;
        wavesurferRef.current = ws;

        ws.on('ready', () => {
            regions.addRegion({
                start: 0,
                end: Math.min(8, ws.getDuration()),
                content: 'Resize me',
                color: '#caebf2',
                drag: false,
                resize: true,
            });

            //drag
            regions.enableDragSelection({
                color: 'rgba(255, 0, 0, 0.1)',
            });
        });

        let activeRegion = null;
        regions.on('region-in', (region) => {
            activeRegionRef.current = region;
        });

        regions.on('region-out', (region) => {
            if (activeRegionRef.current === region && loop) {
                region.play();
            }
        });

        regions.on('region-clicked', (region, e) => {
            e.stopPropagation();
            activeRegionRef.current = region;
            region.play();
            region.setOptions({ color: '#caebf2' });
        });

        return () => {
            ws.destroy();
            URL.revokeObjectURL(ws.getUrl());
        };
    }, [selectedFile]);

    useEffect(() => {
        if (!regionsRef.current) return;

        
        const regions = regionsRef.current;
        const originalOutHandler = regions.handlers['region-out'];

        regions.un('region-out', originalOutHandler);

        regions.on('region-out', (region) => {
            if (activeRegionRef.current === region && loop) {
                region.play();
            }
        });

    }, [loop]);

    return (
        <>
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

            {/* Waveform container */}
            <div ref={waveformRef} style={{ margin: '20px 0' }}></div>

            <div style={{ margin: '10px 0' }}>
                <label>
                    <input
                        type="checkbox"
                        checked={loop}
                        onChange={(e) => setLoop(e.target.checked)}
                    />
                    Loop regions
                </label>
            </div>

            <button onClick={handleUpload} className="upload-button">
                Upload File
            </button>

            {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
            )}

            {uploadStatus && <p>{uploadStatus}</p>}
        </>
    );
}

export default Upload;
