import React, { useEffect, useState } from 'react'
import "./Board.css";

export default function ScoreView({scoreData}) {

    const [score, setScore] = useState(0);
    const [lines, setLines] = useState(0);
    const [level, setLevel] = useState(0);

    useEffect(() => {
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
        <div className="GameStats">
            Score: {score}
            <br/>
            Lines: {lines}
            <br/>
            Level: {level}
        </div>
    )
}
