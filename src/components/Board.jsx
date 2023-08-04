import React, { useEffect } from 'react'
import "./Board.css";

export default function Board({ctx, setCtx, board}) { //board, rows, columns
    
    useEffect(() => {
        const canvas = document.getElementById("canvas");
        //console.log(canvas.getContext("2d"));
        setCtx(canvas.getContext("2d"));
    }, []);

    /*const templates = {
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`
    }*/

    return (
        <>
            <div>Board</div>
            <canvas id="canvas" width="600" height="600"></canvas>
        </>
    )
}
