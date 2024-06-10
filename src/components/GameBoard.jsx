import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];
export default function GameBoard({onSelectSquare, playerSymbol}) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSqaure(rowIndex, colIndex, playerSymbol) {
        console.log(rowIndex, colIndex);
        setGameBoard((prevGameBoard) => {

            if ( prevGameBoard[rowIndex][colIndex] === playerSymbol) { // Avoid React render if no changes
                console.log('avoiding rendering')
                return prevGameBoard;
            }

            const updatedGameBoard = [...prevGameBoard]// shalow copy of the board
            const updatedRow = [...updatedGameBoard[rowIndex]]; // shalow copy of the row
            
            console.log('PlayerSymbol ', playerSymbol);
            updatedRow[colIndex] = playerSymbol;

            updatedGameBoard[rowIndex] = updatedRow;
            console.log('React needs render');
            return updatedGameBoard; // return new state for React to render
            }
        );
        // switch the player
        onSelectSquare({row: rowIndex, col:colIndex});
    }
    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((col, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => handleSelectSqaure(rowIndex, colIndex, playerSymbol)}>
                                    {gameBoard[rowIndex][colIndex]}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}