import React, { useState, useEffect, useRef, BaseSyntheticEvent } from 'react';
import PortfolioCard from './PortfolioCard';

import "../styles/portfolio.css"

// gets the repos raw data
import backupRepoData from "../resources/data.json"
const liveRepoData = await fetch("https://api.github.com/users/ejzeronimo/repos", {
    method: "GET",
    headers: {
        'content-type': 'application/json',
    }
}).then(response => {
    return response.json();
}).then(result => {
    return result;
});

const repoData = liveRepoData.message ? backupRepoData : liveRepoData;

export default function Portfolio() {
    const [filter, setFilter] = useState("");

    function filterRawResults() {
        return repoData.filter((repo: any) => {
            return repo.name.includes(filter) ||
                (repo.description ? repo.description.toLowerCase().includes(filter) : false) ||
                repo.language.toLowerCase().includes(filter) ||
                (repo.homepage ? repo.homepage.toLowerCase().includes(filter) : false) ||
                (repo.topics.filter((topic: string) => { return topic.toLowerCase().includes(filter) }).length > 0)
        });
    }

    return <div>
        <div className="portfolio-search">
            <input type="text" placeholder="Search..." onChange={(e: BaseSyntheticEvent) => { setFilter(((e.nativeEvent as InputEvent).target as HTMLInputElement).value.toLowerCase()) }}></input>
        </div>
        <div className="portfolio-grid">
            {
                // for each repo I have map it to a component
                filterRawResults().map((repo: any, i: number) => {
                    return <PortfolioCard
                        title={repo.name}
                        summary={repo.description}
                        language={repo.language}
                        topics={repo.topics}
                        homepage={repo.homepage === "" ? null : repo.homepage}
                        key={i} />
                })
            }
        </div>
    </div>
}