export default function GameOver({ playerName, resetBoard }) {
  return (
    <div id="game-over">
      <h2>Game over</h2>
      <p>{playerName} Won!</p>
      <button onClick={resetBoard}>Reset</button>
    </div>
  );
}
