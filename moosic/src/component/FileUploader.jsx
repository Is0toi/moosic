// import React, { useRef, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FileContext } from '../contexts/fileContext';

// function FileUploader() {

//     const inputFile = useRef(null);
// 	const { fileURL, setFileURL } = useContext(FileContext);
// 	const [file, setFile] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (file) {
//             setFileURL(file);
//             navigate('/edit');
//         }
//     }, [file, setFileURL, navigate]);

//     const handleUploadClick = () => inputFile.current.click();

//     const handleFileChange = (e) => {
//         const uploadedFile = e.target.files?.[0];
//         if (uploadedFile) setFile(URL.createObjectURL(uploadedFile));
//     };


//     return (
//         <div className="upload-audio">
//             <i style={{ color: '#ff3b3f' }}>
//                 library_music
//             </i>
//             <h1>Upload an audio file! </h1>
//             <button onClick={handleUploadClick}>
//                 Upload
//             </button>
//             <input
//                 type="file"
//                 ref={inputFile}
//                 style={{ display: 'none' }}
//                 accept="audio/*"
//                 onChange={handleFileChange}
//             />

//         </div>
//     )
// }

// export default FileUploader
