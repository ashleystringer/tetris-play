import React, { useState, useEffect, useRef } from 'react'

export default function GameController({board, playerKey, isGameOn}) {
    
    const [isGamePaused, setIsGamePaused] = useState(false);
    const animRef = useRef(0);

    useEffect(() => {
        if(board){
            if(playerKey.action == "rotate" && !isGamePaused){
                board.changeOrientation();
            }
            else if(playerKey.action == "move" && !isGamePaused){
                board.changePosition(playerKey.movement);
            }else if(playerKey.action == "pause"){
                console.log("pause game");
                setIsGamePaused(prev => !prev);
            }
        }
    }, [playerKey]);

    
    useEffect(() => { 
        let dropTime = Date.now();

        function dropDown(){
            let now = Date.now();
            let deltaTime = now - dropTime;

            if(deltaTime > 1000){
                if(board) board.changePosition({ x: 0, y: 1 });
                dropTime = Date.now();
            }

            if(!isGamePaused){ //isGamePaused
                animRef.current = requestAnimationFrame(dropDown);
            }
        }

        dropDown();
        //animRef.current = requestAnimationFrame(dropDown);

        return () => { cancelAnimationFrame(animRef.current) };
    }, [isGameOn, isGamePaused, board])
    
    
    return (
        <div>
            Game Controller
        </div>
    )
}
