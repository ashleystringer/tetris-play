import React, { useEffect } from 'react'

export default function GameController({board, playerKey}) {
    
    useEffect(() => {
        //board.changePosition(playerKey);
        if(board){
            board.changePosition(playerKey);
        }
    }, [playerKey]);
    
    return (
        <div>
            Game Controller
        </div>
    )
}
