export default function Log({ logs }) {
  console.log("Logs", logs);
  return (
    <section id="log">
      <ol>
        {logs.map((log, index) => (
          <li key={index} className={index === 0 ? "highlighted" : undefined}>
            {log.playerName} - ({log.square.row}, {log.square.col})
          </li>
        ))}
      </ol>
    </section>
  );
}
