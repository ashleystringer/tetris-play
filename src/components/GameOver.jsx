import React from 'react'
import "./Board.css";

export default function GameOver({ board }) {

    function handleClick(e){
        board.resetBoard();
    }

    return (
        <div>
            <button onClick={handleClick}>Will you click the button?</button>
        </div>
    )
}
