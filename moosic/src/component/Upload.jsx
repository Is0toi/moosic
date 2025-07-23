import React, { useState } from 'react';
import axios from 'axios';
import WaveSurfer from 'wavesurfer.js'

function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    // For progress bar
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setUploadStatus('');
    };

    function AudioURL() {
        const urlObj = URL.createObjectURL(selectedFile);
        var audio = new Audio(urlObj);
        return (urlObj);
    }
    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('Select a music file');
            return;
        }
        const wavesurfer = WaveSurfer.create({
            container: document.body,
            waveColor: 'rgb(200, 0, 200)',
            progressColor: 'rgb(100, 0, 100)',
            url: AudioURL(),
        })

        wavesurfer.on('click', () => {
            wavesurfer.play()
        })


    }


    return (
        <>
            <div>
                <h1> File Uploaded</h1>
                <label className="file-label"> Choose File</label>
                <input type="file" onChange={handleFileChange} className="file-input" />

                {selectedFile && (
                    <p>Selected: {selectedFile.name}</p>
                )}
            </div>

            <button onClick={handleUpload} className="upload-button">
                Upload File
            </button>

            {uploadProgress > 0 && uploadProgress < 100 && (
                <div>
                    <div className="progress" style={{ width: `${uploadProgress}%` }}>
                        {/* This is the bar */}

                    </div>
                </div>
            )}

            {uploadStatus && <p> {uploadStatus}</p>
            }
        </>
    );
}

export default Upload
