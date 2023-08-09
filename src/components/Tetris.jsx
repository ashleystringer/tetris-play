import React, { useState, useEffect, useReducer } from 'react';
import ScoreView from "./ScoreView";
import BoardView from "./BoardView";
import GameController from "./GameController";
import Board from "../logic/Board";
import Piece from "../logic/Piece";
import Score from "../logic/Score";


const ACTIONS = {
    UP: 87,
    LEFT: 65,
    RIGHT: 68,
    DOWN: 83,
    PAUSE: 32
};

function reducer(key, action){
    switch(action.keyCode){
        case ACTIONS.UP:
            //change orientation
            console.log("UP");
            return { action: "rotate" };
        case ACTIONS.LEFT:
            console.log("LEFT");
            return { action: "move", movement: { x: -1, y: 0 } };
        case ACTIONS.RIGHT:
            console.log("RIGHT");
            return { action: "move", movement: { x: 1, y: 0 } };
        case ACTIONS.DOWN:
            console.log("DOWN");
            return { action: "move", movement: { x: 0, y: 1 } };
        case ACTIONS.PAUSE:
            console.log("PAUSE");
            return { action: "pause" };
        default:
            return { action: "default" };
    }
}

export default function Tetris({ isGameOn }) {

    const rows = 20;
    const columns = 10; 

    const [key, dispatch] = useReducer(reducer, {}); 
    const [board, setBoard] = useState(null);
    const [score, setScore] = useState(null);

    useEffect(() => {
        document.addEventListener("keydown", dispatch);
        
        return () => document.removeEventListener("keydown", dispatch);
    }, []);

    useEffect(() => {
        const piece = new Piece();
        setBoard(new Board(rows, columns, piece));
        setScore(new Score);
    }, []);

    return (
        <div>
            Tetris
            <ScoreView score={score} board={board}/>
            <BoardView board={board}/>
            <GameController board={board} playerKey={key} isGameOn={isGameOn}/>
        </div>
    )
}
