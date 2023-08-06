import React, { useState, useEffect, useReducer } from 'react';
import BoardView from "./BoardView";
import GameController from "./GameController";
import Board from "../logic/Board";
import Piece from "../logic/Piece";


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
            // return { action: "rotate" };
            break;
        case ACTIONS.LEFT:
            console.log("LEFT");
            return {x: -1, y: 0};
        case ACTIONS.RIGHT:
            console.log("RIGHT");
            return {x: 1, y: 0};
        case ACTIONS.DOWN:
            console.log("DOWN");
            return {x: 0, y: 1};
        case ACTIONS.PAUSE:
            console.log("PAUSE");
            // return { action: "pause" };
            break;
        default:
            break;
    }
}

export default function Tetris() {

    const rows = 20;
    const columns = 10; 

    const [key, dispatch] = useReducer(reducer, {}); 
    const [board, setBoard] = useState(null);

    useEffect(() => {
        document.addEventListener("keydown", dispatch);
        
        return () => document.removeEventListener("keydown", dispatch);
    }, []);

    useEffect(() => {
        const piece = new Piece();
        setBoard(new Board(rows, columns, piece));
    }, []);

    return (
        <div>
            Tetris
            <BoardView board={board}/>
            <GameController board={board} playerKey={key}/>
        </div>
    )
}
