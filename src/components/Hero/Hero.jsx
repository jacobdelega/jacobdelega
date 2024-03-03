import React from "react";
import "./Hero.css";
import { PiLinkedinLogo } from "react-icons/pi";
import { BsGithub } from "react-icons/bs";
import { SiFiverr } from "react-icons/si";
import { SiUpwork } from "react-icons/si";




const Hero = () => (
    <section className="app__hero flex justify-center h-screen">
        <div className="hero__container container shadow-lg overflow-hidden bg-myWhite w-3/4 md:w-1/2 lg:h-3/4 h-2/3 pt-16">

            <div className="hero__header bg-myWhite sm:p-16 pt-16 m-8">
                <p className="bg-myWhite lg:text-2xl pb-4">Hello, I am</p>
                <h1 className="bg-myWhite lg:text-5xl text-3xl font-bold pb-4">Jacob Delega</h1>
                <p className="bg-myWhite  lg:text-2xl">A Software Engineer.</p>
            </div>

            <div className="hero__footer sm:p-16 pt-16 m-8 bg-myWhite">
                <div className="footer__links bg-myWhite flex gap-7 sm:pt-16">
                    <a href="https://www.linkedin.com/in/jacob-delega-56b506247/"><PiLinkedinLogo className="bg-myWhite footer__icon size-8 cursor-pointer"/></a>
                    <a href="https://github.com/jacobdelega"><BsGithub className="bg-myWhite footer__icon size-8 cursor-pointer"/></a>
                    <SiFiverr className="bg-myWhite footer__icon size-8 cursor-pointer shrink-0" />
                    <SiUpwork className="bg-myWhite footer__icon size-8 cursor-pointer shrink-0"/>
                </div>

                <div className="footer_calltoaction bg-myWhite py-2 pt-4">
                <button class="bg-mySky hover:bg-myTertiary text-myWhite font-bold py-2 px-4 rounded ">
                    Lets work.
                </button>
                </div>
            </div>
        </div>
    </section>
);

export default Hero;
