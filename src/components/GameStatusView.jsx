import React, { useState, useEffect } from 'react'
import "./Board.css";

export default function GameStatusView({ statusMsg }) {

    

    return (
        <>
            {statusMsg && (
                <div className="GameStatus">{statusMsg}</div>
            )}
        </>
    )
}
