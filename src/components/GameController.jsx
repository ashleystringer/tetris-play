import React, { useState, useEffect, useRef } from 'react';
import GameOver from "./GameOver";
import { POINTS_ACTIONS } from "../logic/Score";
import { levelSpeed } from "../logic/Score";

export default function GameController({board, playerKey, isGameOn, scoreDispatch, scoreData}) {

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
        if(board){
            if(playerKey.action == "rotate" && !isGamePaused){
                board.changePieceOrientation();
            }
            else if(playerKey.action == "move" && !isGamePaused){
                board.changePiecePosition(playerKey.movement);
                if(playerKey.movement.y == 1) scoreDispatch({ type: POINTS_ACTIONS.HARD_DROP }); // !!!!!! hardDrop() !!!!!!!
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

            const speed = levelSpeed(scoreData.level); // !!!!!! levelSpeed() !!!!!!

            if(deltaTime > speed){ //Need to change this speed by level
                if(board) board.changePiecePosition({ x: 0, y: 1 });
                scoreDispatch({ type: POINTS_ACTIONS.SOFT_DROP }); // !!!!!! softDrop() !!!!!!!
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
        <>
            {!isGameOn & (
                <>
                    <GameOver/>
                </>
            )}
        </>
    )
}
