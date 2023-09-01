import React, { useState, useEffect, useReducer } from 'react';
import ScoreView from "./ScoreView";
import BoardView from "./BoardView";
import GameController from "./GameController";
import { keyReducer } from "../logic/Keys";
import { scoreReducer, initialPointState } from "../logic/Score";
import { useGameData } from "../contexts/GameDataProvider";
import Board from "../logic/Board";
import Piece from "../logic/Piece";

export default function Tetris({ isGameOn, setIsGameOn }) {

    /*
        What this component does - 
        - creates a reducer for the keys
        - creates a reducer for the score
        - initializes the board
        - initializes the piece
        - renders the ScoreView component 
        - renders the BoardView component 
        - renders the GameController component 
    */

    const rows = 20;
    const columns = 10; 

    const [key, keyDispatch] = useReducer(keyReducer, {});
    //const [scoreState, scoreDispatch] = useReducer(scoreReducer, initialPointState);
    const [board, setBoard] = useState(null);

    useEffect(() => {
        document.addEventListener("keydown", keyDispatch);
        
        return () => document.removeEventListener("keydown", keyDispatch);
    }, []);

    useEffect(() => {
        const piece = new Piece();
        setBoard(new Board(rows, columns, piece, scoreDispatch, setIsGameOn)); 
    }, []);

    return (
        <div>
            <ScoreView/>
            <BoardView board={board}/>
            <GameController board={board} playerKey={key} isGameOn={isGameOn}/>
        </div>
    )
}
