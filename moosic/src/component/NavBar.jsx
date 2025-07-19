import React, { useState } from 'react';
import { FaBars } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import './NavBar.css';


function NavBar({ isDark, setIsDark }) {

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return <>
        <header className="header">
            <nav className = "navbar">
                <ul className={isOpen ? "nav-link active" : "nav-link"}>
                    <li><Link to="/"> Home</Link></li>
                    <li><Link to="/music"> Music</Link></li>
                </ul>
                <div className="hamburger" onClick={toggleMenu}>
                    <FaBars />
                </div>
            </nav>

        </header>

    </>

}

export default NavBar;
