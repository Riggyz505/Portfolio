import React, { useState, useEffect, useRef } from 'react';

import "../styles/viewer.css"

export default function Viewer(props: { src: string }) {
    return <div>
        <iframe src={props.src + "#toolbar=0&view=fitH"}></iframe>
    </div>
}