import React, { useState, useEffect, useRef } from 'react';
import Topic from './Topic';

import "../styles/portfolioCard.css"


export default function PortfolioCard(props: {
    title: string,
    summary: string,
    language?: string,
    topics?: string[],
    homepage?: string,
}) {


    return <div className="portfolio-card">
        <div className="portfolio-title">
            <h3>
                {
                    props.homepage ? <a href={props.homepage}> {props.title} </a> : props.title
                }
            </h3>
            <p>{props.summary}</p>
        </div>
        <div className="portfolio-topic-holder">
            <Topic title={props.language!} color={[219, 226, 239]} />
            {
                props.topics?.map((obj: any, i: any) => { return <Topic title={obj} color={[63, 114, 175]} key={i} /> })
            }
        </div>
    </div>
}