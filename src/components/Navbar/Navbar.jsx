import React from "react";
import "./Navbar.css";
import image from "../../assets/images/nav_logo.svg";


const Navbar = () => (
    <nav className='app__navbar'>
        <div className='app__navbar-logo'>
            <img src={image} alt='logo' />
        </div>

        <ul className='app__navbar-links'>
            <li className=''><a href="#projects">Projects</a><span className="app__navbar-line"></span></li>
            <li className=''><a href="#program">Program</a><span className="app__navbar-line"></span></li>
            <li className=''><a href="#resume">Resume</a></li>
        </ul>

    </nav>
);

export default Navbar;
