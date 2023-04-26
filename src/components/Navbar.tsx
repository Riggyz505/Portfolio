import React, { useState, useEffect, useRef } from 'react';

import "../styles/navbar.css"

export default function Navbar() {
    const [isFloating, setFloating] = useState(false);
    const [offset, setOffset] = useState(0);
    const selfRef = useRef(null);

    let playLanding = () => {
        const totalFadeTime = 250;
        const navbar = (selfRef.current! as HTMLElement);

        // lock the navbar in place
        navbar.animate([
            { top: "0px" },
            { top: "0px" }
        ], {
            duration: totalFadeTime,
            easing: 'linear',
            fill: 'none'
        });

        // lock opacity in place
        navbar.querySelector("#landing-nav")!.animate([
            { opacity: "0" },
            { opacity: "0" }
        ], {
            duration: totalFadeTime,
            easing: 'linear',
            fill: 'none'
        });

        // fade out the site nav
        navbar.querySelector("#site-nav")!.animate([
            {
                opacity: "1",
            },
            {
                opacity: "1",
                background: "none",
                boxShadow: "none",
            },
            {
                opacity: "0",
                background: "none",
                boxShadow: "none",
                width: "40%",
                padding: "0 30%"
            }
        ], {
            duration: totalFadeTime * .9,
            easing: 'ease-out',
            fill: 'none'
        });
    }

    let playSite = () => {
        const totalFadeTime = 250;
        const navbar = (selfRef.current! as HTMLElement);

        // lock opacity in place
        navbar.querySelector("#landing-nav")!.animate([
            { opacity: "0" },
            { opacity: "0" }
        ], {
            duration: totalFadeTime,
            easing: 'linear',
            fill: 'none'
        });

        // fade out the site nav
        navbar.querySelector("#site-nav")!.animate([
            {
                opacity: "0",
                background: "none",
                boxShadow: "none",
                width: "40%",
                padding: "0 30%"
            },
            {
                opacity: "1",
                background: "none",
                boxShadow: "none",
            },
            {
                opacity: "1",
            }
        ], {
            duration: totalFadeTime * .9,
            easing: 'ease-out',
            fill: 'none'
        });
    }

    // use this to hook into raw DOM
    useEffect(() => {
        // checks to see if the title has been scrolled offscreen
        const observeTarget = document.getElementById("landing-title")!;
        const visibleObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log("the man is saved");
                    setFloating(false);
                } else {
                    console.log("a man has fallen in lego city");
                    setFloating(true);
                }
            });
        }, { threshold: 0 });

        // passes the scrolled height to the state of the navbar
        const handleScroll = (event: Event) => {
            if (!isFloating) {
                setOffset(-1 * window.scrollY);
            }
        }

        // add and remove the listeners
        visibleObserver.observe(observeTarget);
        window.addEventListener('scroll', handleScroll);

        return () => {
            visibleObserver.unobserve(observeTarget);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // need to animate on state change
    useEffect(() => {
        if (isFloating) {
            playSite();
        }
        else if (!isFloating && offset != 0) {
            playLanding();
        }
    }, [isFloating]);

    return <nav style={!isFloating ? { top: offset + "px" } : {}} ref={selfRef}>
        {/* show this on the landing page */}
        <div id="landing-nav" style={isFloating ? { opacity: 0 } : { opacity: 1 }}>
            <button className="js-nav-button">About Me</button>
            <button className="js-nav-button">Resume</button>
            <button className="js-nav-button">Portfolio</button>
            <button className="js-nav-button">Contact</button>
        </div>

        {/* show this everywhere else */}
        <div id="site-nav" style={isFloating ? { opacity: 1 } : { opacity: 0 }}>
            <div>
                <strong>Ethan Zeronik</strong>
                <span>Software Engineer</span>
            </div>

            <button data-target="landing-page" className="js-nav-button">Home</button>
        </div>
    </nav>
}