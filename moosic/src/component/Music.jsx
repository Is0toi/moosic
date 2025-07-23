import React, { useEffect, useState } from 'react';
import Upload from './Upload';
import FileUpload from './FileUpload'

function Music() {
    console.log("Music component rendered");
    const [showInput, setShowInput] = useState(false);
    const [submittedUsername, setSubmittedUsername] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        });

        const hiddenElements = document.querySelectorAll('.next');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowInput(true);
        }, 3000);
        // 3 seconds of timeout

        return () => clearTimeout(timer);
    }, []);

    const handleUsernameSubmit = (username) => {
        setSubmittedUsername(username);
    };


    return (

        <div className="music">
            {!submittedUsername ? (
                <>
                    <div className="start">
                        <h1>Let's get started</h1>
                    </div>
                    <div className="next">
                        {showInput && <Upload onSubmit={handleUsernameSubmit} />}
                    </div>
                </>
            ) : (
                <div className="next">
                    <div className="start">
                        <h2>Welcome, {submittedUsername}</h2>
                        <p>We're glad to have you</p>
                    </div>
                     <FileUpload/>
                    <div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Music;
