import type React from 'react';
import type { useState, useEffect, useRef, FormEvent } from 'react';

import "../styles/ContactForm.css"



export default function Navbar() {


    let onFormSubmit = (e: FormEvent) => {
        e.preventDefault()

        const flavorDiv = document.getElementById("flavor-alert")!;

        // show a hidden div
        flavorDiv.style.visibility = "unset";

        let cb = flavorDiv.animate([
            { opacity: "0" },
            { opacity: "1" }
        ], {
            duration: 350,
            easing: 'ease-out',
            fill: 'both'
        });

        cb.addEventListener("finish", () => {
            setTimeout(() => {
                let cbo = flavorDiv.animate([
                    { opacity: "1" },
                    { opacity: "0" }
                ], {
                    duration: 250,
                    easing: 'ease-in',
                    fill: 'both'
                });

                cbo.addEventListener("finish", () => { flavorDiv.style.visibility = "hidden"; })
            }, 1000);
        })

        return false;
    }

    return <form action="#" onSubmit={onFormSubmit}>
        <label htmlFor="name">Name</label>
        <input
            type="text"
            name="name"
            id="name"
            placeholder="Your name.."
        />

        <label htmlFor="subject">Subject</label>
        <textarea
            id="subject"
            name="subject"
            placeholder="Write something.."></textarea>

        <input id="js-submit" type="submit" />
    </form>
}