import React, { useCallback, useState} from 'react'
import Menu from "./Menu";
import Tetris from "./Tetris";

export default function Game() {

    const [isGameOn, setIsGameOn] = useState(false);

    const playGame = useCallback(() => {
        setIsGameOn(true);
    }, []);

    return (
        <>
            {isGameOn ? <Tetris isGameOn={isGameOn} setIsGameOn={setIsGameOn}/> : <Menu onCallback={playGame}/>}   
        </>
    )
}
