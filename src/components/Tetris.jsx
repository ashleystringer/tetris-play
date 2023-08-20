import React, { useState, useEffect, useReducer } from 'react';
import ScoreView from "./ScoreView";
import BoardView from "./BoardView";
import GameController from "./GameController";
import { keyReducer } from "../logic/Keys";
import { scoreReducer, initialPointState } from "../logic/Score";
import Board from "../logic/Board";
import Piece from "../logic/Piece";


export default function Tetris({ isGameOn }) {

    const rows = 20;
    const columns = 10; 

    const [key, keyDispatch] = useReducer(keyReducer, {});
    const [scoreState, scoreDispatch] = useReducer(scoreReducer, initialPointState);
    const [board, setBoard] = useState(null);

    useEffect(() => {
        document.addEventListener("keydown", keyDispatch);
        
        return () => document.removeEventListener("keydown", keyDispatch);
    }, []);

    useEffect(() => {
        const piece = new Piece();
        setBoard(new Board(rows, columns, piece, scoreDispatch)); 
    }, []);

    return (
        <div>
            <ScoreView scoreData={scoreState} board={board}/>
            <BoardView board={board}/>
            <GameController board={board} playerKey={key} isGameOn={isGameOn} scoreDispatch={scoreDispatch}/>
        </div>
    )
}
