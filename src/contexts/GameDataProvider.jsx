import React, { useContext, useReducer } from 'react'
import { levelSpeed, scoreReducer, initialPointState, POINTS_ACTIONS } from "../logic/Score";


const GameDataContext = React.createContext();

export function useGameData(){
    return useContext(GameDataContext);
}

export function GameDataProvider({ children }) {

    const [scoreState, scoreDispatch] = useReducer(scoreReducer, initialPointState);

    function incrementLevel(){
        scoreDispatch({ type: POINTS_ACTIONS.INCR_LEVEL });
    }

    function levelSpeed(){
        return 1000 - (scoreData.level * 150);
    }

    function hardDrop(){
        scoreDispatch({ type: POINTS_ACTIONS.HARD_DROP });
    }

    function softDrop(){
        scoreDispatch({ type: POINTS_ACTIONS.SOFT_DROP });
    }

    function updateLines(lineNum){
        const linePoints =
        lineNum === 1
          ? POINTS_ACTIONS.SINGLE
          : lineNum === 2
          ? POINTS_ACTIONS.DOUBLE
          : lineNum === 3
          ? POINTS_ACTIONS.TRIPLE
          : lineNum === 4
          ? POINTS_ACTIONS.TETRIS
          : 0;
  
      if (lineNum > 0) scoreDispatch({ type: linePoints }); 
    }

    const value = {
        level: scoreState.level,
        lines: scoreState.lines,
        score: scoreState.score,
        incrementLevel,
        levelSpeed,
        hardDrop,
        softDrop,
        updateLines
    };
    return (
        <GameDataContext.Provider value={value}>
            {children}
        </GameDataContext.Provider>
    )
}
