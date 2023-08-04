import React from 'react'

export default function Menu({ onCallback }) {
    return (
        <div>
            <button onClick={onCallback}>Play Game</button>
        </div>
    )
}
