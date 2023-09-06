import React from 'react'
import "./Board.css";

export default function GameOver({ board }) {

    function handleClick(e){
        board.resetBoard();
    }

    return (
        <div className="GameOver">
            Game Over
            <br/>
            <button onClick={handleClick}>Will you click the button?</button>
        </div>
    )
}
