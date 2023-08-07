import React, { useEffect, useRef } from 'react'

export default function GameController({board, playerKey}) {
    
    const animRef = useRef(0);

    useEffect(() => {
        //board.changePosition(playerKey);
        if(board){
            console.log(playerKey.action);
            if(playerKey.action == "rotate"){
                board.changeOrientation();
            }
            else if(playerKey.action == "move"){
                board.changePosition(playerKey.movement);
            }else if(playerKey.action == "pause"){
                console.log("pause game");
            }
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
