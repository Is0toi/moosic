import React, { useState, useEffect } from 'react';
import { FaBars } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import './NavBar.css';


function NavBar({ isDark, setIsDark }) {

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const [scrollData, setScrollData] = useState({
        y: 0,
        lastY: 0
    })

    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrollData(prevState => {
                const currentY = window.scrollY;
                const goingDown = currentY > prevState.y;
                const goingUp = currentY < prevState.y;
                const scrolledEnough = currentY > 30;

                setIsHidden(goingDown && scrolledEnough);
                return {
                    y: currentY,
                    lastY: prevState.y
                }
            })
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);

    }, [])
    

    return <>
        <header className={`header ${isHidden ? 'hideNav' : ''}`}>
            <nav className="navbar">
                <ul className={isOpen ? "nav-link active" : "nav-link"}>
                    <li><Link to="/"> Home</Link></li>
                    <li><Link to="/music" style={{ color: '#ff3b3f' }}> Music</Link></li>
                </ul>
                <div className="hamburger" onClick={toggleMenu}>
                    <FaBars />
                </div>
            </nav>

        </header>

    </>

}

export default NavBar;
