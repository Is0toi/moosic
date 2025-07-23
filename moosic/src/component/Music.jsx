import React, { useEffect, useState } from 'react';
import FileUpload from './FileUpload';
import Input from './Input';

function Music() {
    console.log("Music component rendered");
    const [showInput, setShowInput] = useState(false);
    const [submittedUsername, setSubmittedUsername] = useState("");
    const [submittedData, setSubmittedData] = useState(null);

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
        return () => clearTimeout(timer);
    }, []);

    const handleUsernameSubmit = (username) => {
        setSubmittedUsername(username);
    };

    const handleRegionSubmit = (data) => {
        setSubmittedData(data);
    };

    return (
        <div className="music">
            {!submittedUsername ? (
                <>
                    <div className="start">
                        <h1>Let's get started</h1>
                    </div>
                    <div className="next">
                        {showInput && (
                            <Input onSubmit={handleUsernameSubmit} />
                        )}
                    </div>
                </>
            ) : (
                <div className="next">
                    <div className="start">
                        <h2>Welcome, {submittedUsername}</h2>
                        <p>We're glad to have you</p>
                    </div>
                    <FileUpload onSubmit={handleRegionSubmit} />
                </div>
            )}
        </div>
    );
}

export default Music;