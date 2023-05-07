import React, { useState, useEffect, useRef } from 'react';

import style from "../styles/topic.css"

export default function Topic(props: {
    title: string,
    color: [number, number, number]
}) {

    
    return <span className="topic" style={
        {
            borderColor: `rgb(${props.color[0]},${props.color[1]},${props.color[2]})`
        }
    }>{props.title}</span>
}