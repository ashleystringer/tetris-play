import React from 'react'
import "./Block.css";

export default function Block({block}) {

    /*
        <div className={{block.isOccupied ? "occupied-block" : "standard-block"}}>
        
        </div>
    */


    return (
        <div className="standardBlock">
            {block}
        </div>
    )
}
