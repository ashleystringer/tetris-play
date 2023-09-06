import React, { useState, useEffect, useRef } from 'react';
import GameOver from "./GameOver";
import { POINTS_ACTIONS } from "../logic/Score";
import { levelSpeed } from "../logic/Score";

export default function GameController({
    board, 
    playerKey, 
    isGameOn, 
    isGameOver, 
    scoreDispatch, 
    scoreData,
    setStatusMsg
}) {

    /*
        What this component does - 
            - creates a timer to drop the piece to animate it
            - handles user input to move the piece
            - handles user input to rotate the piece
            - handles user input to pause the game      
            - renders the GameOver component
    */
    
    const [isGamePaused, setIsGamePaused] = useState(false);
    const animRef = useRef(0);

    useEffect(() => {
        console.log(`isGameOver: ${isGameOver}`);
    }, [isGameOver]);

    useEffect(() => {
        if(board){
            if(playerKey.action == "rotate" && !isGamePaused && !isGameOver){
                board.changePieceOrientation();
            }
            else if(playerKey.action == "move" && !isGamePaused && !isGameOver){
                board.changePiecePosition(playerKey.movement);
                if(playerKey.movement.y == 1) scoreDispatch({ type: POINTS_ACTIONS.HARD_DROP });
            }else if(playerKey.action == "pause" && !isGameOver){
                console.log("pause game");
                setIsGamePaused(prev => !prev);
                setStatusMsg(prev => {
                    const msg = prev ? null : "Paused";
                    return msg;
                });
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
                if(board) board.changePiecePosition({ x: 0, y: 1 });
                scoreDispatch({ type: POINTS_ACTIONS.SOFT_DROP });
                dropTime = Date.now();
            }

            if(!isGamePaused && !isGameOver){ 
                animRef.current = requestAnimationFrame(dropDown);
            }
        }

        dropDown();

        return () => { cancelAnimationFrame(animRef.current) };
    }, [isGameOn, isGameOver, isGamePaused, board])
    
    
    return (
        <>
            {isGameOver && (
                <>
                    <GameOver board={board}/>
                </>
            )}
        </>
    )
}
