import React, { useEffect, useState } from 'react'

export default function ScoreView({scoreData}) {

    const [score, setScore] = useState(0);
    const [lines, setLines] = useState(0);
    const [level, setLevel] = useState(0);

    useEffect(() => {
        setScore(() => {
            if (scoreData) return scoreData.score; // !!!!!! score !!!!!!
            return 0;
        });

        setLines(() => {
            if (scoreData) return scoreData.lines; // !!!!!! lines !!!!!!
            return 0;
        });

        setLevel(() => {
            if (scoreData) return scoreData.level; // !!!!!! level !!!!!!
            return 0;
        });
        
    }, [scoreData]);

    return (
        <div>
            Score: {score}
            <br/>
            Lines: {lines}
            <br/>
            Level: {level}
        </div>
    )
}
