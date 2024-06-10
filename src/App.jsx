import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";

const initalPlayers = [
  { name: "Player 1", symbol: "X" },
  { name: "Player 2", symbol: "O" },
];

function App() {
  const [players, setPlayers] = useState(initalPlayers);
  const [activePlayer, setActivePlayer] = useState(players[0]);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  const addLog = (playerName, square) => {
    const newLog = {
     playerName, square
    };

    console.log('oldLog:' , logs);
    console.log('newItem:', newLog);
    setLogs((logs) => [newLog, ...logs]); // Add the new log to the top of the list
  };

  function updateName(oldName, newName) {
    // avoid duplicate name
    console.log('Enter updateName', oldName, newName);
    if (players.some((player) => player.name === newName)) {
      setError(`The name "${newName}" is already taken.`);
    }
    console.log('App clearing the error');
    setError(null); // Clear any previous error

    console.log('App updating the players')
    const updatedPlayers = players.map((player) =>
      player.name === oldName ? { ...player, name: newName } : player
    );

    console.log('App setPlayers');
    setPlayers(updatedPlayers);

    if (activePlayer.name === oldName) {
      setActivePlayer((prevPlayer) => ({ ...prevPlayer, name: newName }));
    }
    console.log('App updateName End!')
  }

  function handleSelectSquare(square) {
    setActivePlayer((curActivePlayer) => (curActivePlayer.name == players[0].name ? players[1] : players[0]));
    console.log("updating player logs", activePlayer);
    addLog(activePlayer.name, square);
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
          onSelectSquare={handleSelectSquare}
          playerSymbol={activePlayer.symbol}
        />
      </div>
      <Log logs={logs} />
    </main>
  );
}

export default App;
