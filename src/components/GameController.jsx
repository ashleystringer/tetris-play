import React, { useEffect, useRef } from 'react'

export default function GameController({board, playerKey, isGameOn}) {
    
    const animRef = useRef(0);

    useEffect(() => {
        //board.changePosition(playerKey);
        if(board){
            if(playerKey.action == "rotate"){
                board.changeOrientation();
            }
            else if(playerKey.action == "move"){
                board.changePosition(playerKey.movement);
            }else if(playerKey.action == "pause"){
                console.log("pause game");
                //isGameOn = false;
            }
        }
    }, [playerKey]);

    
    useEffect(() => { 
        let dropTime = Date.now();

        function dropDown(){
            let now = Date.now();
            let deltaTime = now - dropTime;

            if(deltaTime > 1000){
                console.log("deltaTime"); 
                if(board) board.changePosition({ x: 0, y: 1 });
                dropTime = Date.now();
            }
            //requestAnimationFrame(dropDown);
            if(isGameOn){
                animRef.current = requestAnimationFrame(dropDown);
            }
        }

        dropDown();

        return () => { cancelAnimationFrame(animRef.current) };
    }, [isGameOn, board])
    
    
    return (
        <div>
            Game Controller
        </div>
    )
}
