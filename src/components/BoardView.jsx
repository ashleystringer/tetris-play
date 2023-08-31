import React, { useEffect } from 'react'
import "./Board.css";

export default function BoardView({board}) { //board, rows, columns
    /*
        What this component does - 
        - attaches a canvas element to the Board instance
        - draws the board onto the canvas element
        - draws the piece onto the canvas element
        - renders the canvas element for the board
    */
    
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
            <canvas id="canvas" width="600" height="750"></canvas>
        </>
    )
}
