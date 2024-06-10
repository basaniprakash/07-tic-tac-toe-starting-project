import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState, useEffect } from "react";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import WINNING_COMBINATIONS from "./winning-combinations";

const initalPlayers = [
  { name: "Player 1", symbol: "X" },
  { name: "Player 2", symbol: "O" },
];

const checkCombination = (gameBoard, combination) => {
  console.log(`combination : ${combination}`);
  const [{ row: firstRow, column: firstColumn }] = combination;
  console.log(`row:${firstRow} column:${firstColumn}`);
  const firstValue = gameBoard[firstRow][firstColumn];

  console.log("checkCombination", firstValue);
  if (firstValue === null) {
    console.log("firstValue null");
    return false;
  }

  console.log("check every combination");
  return combination.every(({ row, column }) => {
    console.log(`checking gameBoard[${row}][${column}] === ${firstValue}`);
    return gameBoard[row][column] === firstValue;
  });
};

function checkGameCompletion(gameBoard) {
  console.log("Checking game completion");
  for (const combination of WINNING_COMBINATIONS) {
    console.log(`checkGameCompletion=> combination:${combination}`);
    if (checkCombination(gameBoard, combination)) {
      console.log("game completed!");
      return true;
    }
  }

  console.log("game NOT complete!");
  return false;
}
const INIT_GAMEBAORD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [players, setPlayers] = useState(initalPlayers);
  const [activePlayer, setActivePlayer] = useState(players[0]);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameBoard, setGameBoard] = useState(INIT_GAMEBAORD);
  
  // Check for game completion whenever gameBoard updates
  useEffect(() => {
    if (checkGameCompletion(gameBoard)) {
      setGameOver(true);
    }
  }, [gameBoard]);

  function resetBoard() {
    setGameBoard(INIT_GAMEBAORD);
    setActivePlayer(players[0]);
    setLogs([]);
    setGameOver(false);
  }
  
  function handleSelectSquare(square) {
    const { row: rowIndex, col: colIndex } = square;
    console.log(`handleSelectSquare (${rowIndex}, ${colIndex})`);

    setGameBoard((prevGameBoard) => {
      if (prevGameBoard[rowIndex][colIndex] !== null) {
        // Avoid React render if no changes or cell already occupied
        console.log("avoiding rendering");
        return prevGameBoard;
      }

      // Create a copy of the game board and update the specific cell
      const updatedGameBoard = prevGameBoard.map((row, rIdx) =>
        rIdx === rowIndex
          ? row.map((cell, cIdx) =>
              cIdx === colIndex ? activePlayer.symbol : cell
            )
          : row
      );
      // Log the current player's move
      addLog(activePlayer.name, square);
      console.log("updating player logs", activePlayer);

      // Check for game completion using the updated game board state
      if (checkGameCompletion(updatedGameBoard)) {
        setGameOver(true);
      } else {
        // Update the active player only if the game is not over
        console.log("switching the player");
        setActivePlayer((curActivePlayer) =>
          curActivePlayer.name === players[0].name ? players[1] : players[0]
        );
      }
      console.log("React needs render");
      return updatedGameBoard; // return new state for React to render
    });
  }

  const addLog = (playerName, square) => {
    const newLog = {
      playerName,
      square,
    };

    console.log("oldLog:", logs);
    console.log("newItem:", newLog);
    setLogs((logs) => [newLog, ...logs]); // Add the new log to the top of the list
  };

  function updateName(oldName, newName) {
    // avoid duplicate name
    console.log("Enter updateName", oldName, newName);
    if (players.some((player) => player.name === newName)) {
      setError(`The name "${newName}" is already taken.`);
    }
    console.log("App clearing the error");
    setError(null); // Clear any previous error

    console.log("App updating the players");
    const updatedPlayers = players.map((player) =>
      player.name === oldName ? { ...player, name: newName } : player
    );

    console.log("App setPlayers");
    setPlayers(updatedPlayers);

    if (activePlayer.name === oldName) {
      setActivePlayer((prevPlayer) => ({ ...prevPlayer, name: newName }));
    }
    console.log("App updateName End!");
  }

  console.log("App rendering ", activePlayer);
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {players.map((player, index) => (
            <Player
              key={index}
              name={player.name}
              symbol={player.symbol}
              updateName={updateName}
              isActive={player.name === activePlayer.name}
            />
          ))}
        </ol>

        <GameBoard
          handleSelectSquare={handleSelectSquare}
          gameBoard={gameBoard}
        />

        {gameOver && <GameOver playerName={activePlayer.name} resetBoard={resetBoard} />}
      </div>
      <Log logs={logs} />
    </main>
  );
}

export default App;
