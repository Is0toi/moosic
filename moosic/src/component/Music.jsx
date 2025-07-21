import React, { useEffect, useState } from 'react';
import UsernameInput from './Input';


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
        localStorage.setItem("username", username);

        // Will be saved now REMOVED FOR NOW 
    };

    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        if (savedUsername) {
            setSubmittedUsername(savedUsername);
            setShowInput(false);
        }
    }, []);

    return (

        <div className="music">
            {!submittedUsername ? (
                <div className="start">
                    <h1>Let's get started</h1>
                    <div className="next">
                        {showInput && <UsernameInput onSubmit={handleUsernameSubmit} />}
                    </div>
                </div>
            ) : (
                <div className="next">
                    <div className="start">
                        <h2>Welcome, {submittedUsername}</h2>
                        <p>We're glad to have you</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Music;
