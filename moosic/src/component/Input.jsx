import React, { useState } from 'react'

function Input({ onSubmit }) {


    const [username, setUsername] = useState("");

    const handleChange = (e) => {
        setUsername(e.target.value);
    }

    const handleSubmit = () => {
        if (username.trim()) {
            onSubmit(username);
        }
    };
    return (
        <div className="userName">
            <p>What is your username?</p>
            <label>Username: </label>
            <input className="username-text" value={username} onChange={handleChange}></input>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Input;