import "./Board.css";
import React, { useState, useEffect, useReducer } from 'react';
import ScoreView from "./ScoreView";
import BoardView from "./BoardView";
import GameStatusView from "./GameStatusView";
import GameController from "./GameController";
import { keyReducer } from "../logic/Keys";
import { scoreReducer, initialPointState } from "../logic/Score";
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
    const [scoreState, scoreDispatch] = useReducer(scoreReducer, initialPointState);
    const [board, setBoard] = useState(null);
    const [statusMsg, setStatusMsg] = useState(null);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        document.addEventListener("keydown", keyDispatch);
        
        return () => document.removeEventListener("keydown", keyDispatch);
    }, []);

    useEffect(() => {
        const piece = new Piece();
        setBoard(new Board(rows, columns, piece, scoreDispatch, setIsGameOver)); 
    }, []);

    useEffect(() => {
        setStatusMsg(prev => {
            if(isGameOver) return "Game is over";
            return null;
        })
    }, [isGameOver]);

    return (
        <div>
                <ScoreView scoreData={scoreState} board={board}/>
            <div className="BoardContainer">
                <BoardView board={board}/>
                <GameStatusView statusMsg={statusMsg}/>
            </div>
            <br/>
            <GameController 
                board={board} 
                playerKey={key} 
                isGameOn={isGameOn}
                isGameOver={isGameOver} 
                scoreDispatch={scoreDispatch} 
                scoreData={scoreState}
                setStatusMsg={setStatusMsg}
            />
        </div>
    )
}
