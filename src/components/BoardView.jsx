import React, { useEffect } from 'react'
import "./Board.css";

export default function BoardView({board}) { //board, rows, columns
    
    useEffect(() => {
        if(board){
            const canvas = document.getElementById("canvas");
            board.setBoardContext(canvas.getContext("2d")); 
            board.drawBoard(); 
            board.drawPiece();
        }
    }, [board]);

    return (
        <>
            <div>Board</div>
            <canvas id="canvas" width="600" height="750"></canvas>
        </>
    )
}
