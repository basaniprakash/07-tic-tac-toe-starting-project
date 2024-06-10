// import { useState } from "react";

export default function GameBoard({handleSelectSquare, gameBoard}) {

    console.log('GameBoard');

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((col, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => handleSelectSquare({row: rowIndex, col: colIndex})}>
                                    {gameBoard[rowIndex][colIndex]}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}