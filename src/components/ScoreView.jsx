import React, { useEffect, useState } from 'react'

export default function ScoreView({scoreData, levelData}) {

    const [score, setScore] = useState(0);
    const [lines, setLines] = useState(0);
    const [level, setLevel] = useState(0);

    useEffect(() => {
        console.log("scoreData useEffect");
        setScore(() => {
            if (scoreData) return scoreData.score;
            return 0;
        });

        setLines(() => {
            if (scoreData) return scoreData.lines;
            return 0;
        });

        setLevel(() => {
            if (scoreData) return scoreData.level;
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
