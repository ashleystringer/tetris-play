import React, { useState, useEffect, useRef } from 'react';
import { POINTS_ACTIONS } from "../logic/Score";
import { levelSpeed } from "../logic/Score";

export default function GameController({board, playerKey, isGameOn, scoreDispatch, scoreData}) {
    
    const [isGamePaused, setIsGamePaused] = useState(false);
    const animRef = useRef(0);

    useEffect(() => {
        if(board){
            if(playerKey.action == "rotate" && !isGamePaused){
                board.changeOrientation();
            }
            else if(playerKey.action == "move" && !isGamePaused){
                board.changePosition(playerKey.movement);
                if(playerKey.movement.y == 1) scoreDispatch({ type: POINTS_ACTIONS.HARD_DROP });
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

            const speed = levelSpeed(scoreData.level);

            if(deltaTime > speed){ //Need to change this speed by level
                if(board) board.changePosition({ x: 0, y: 1 });
                scoreDispatch({ type: POINTS_ACTIONS.SOFT_DROP });
                dropTime = Date.now();
            }

            if(!isGamePaused){ 
                animRef.current = requestAnimationFrame(dropDown);
            }
        }

        dropDown();

        return () => { cancelAnimationFrame(animRef.current) };
    }, [isGameOn, isGamePaused, board])
    
    
    return (
        <div>
            Game Controller
        </div>
    )
}
