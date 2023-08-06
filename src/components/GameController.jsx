import React, { useEffect, useRef } from 'react'

export default function GameController({board, playerKey}) {
    
    const animRef = useRef(0);

    useEffect(() => {
        //board.changePosition(playerKey);
        if(board){
            board.changePosition(playerKey);
        }
    }, [playerKey]);

    /*
    useEffect(() => {
        let dropTime = Date.now();

        function dropDown(){

            let now = Date.now();
            let deltaTime = now - dropTime;

            if(deltaTime > 1000){
                dropTime = Date.now();
            }
            //requestAnimationFrame(dropDown);
            if(isGameOn){
                animRef.current = requestAnimationFrame(dropDown);
            }
        }

        return () => { cancelAnimationFrame(animRef.current) }
    }, [isGameOn])
    */
    
    return (
        <div>
            Game Controller
        </div>
    )
}
