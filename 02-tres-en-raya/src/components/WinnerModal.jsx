import { Square } from "./Square";
export function WinnerModal({ winner, resetGame, resetGameAll, counter }) {
    if (winner === null) return null;
    const winnerText = winner === false ? "Empate" : "Ganó: ";
    return (
        <section className="winner">
            <div className="text">
                <h2>{winnerText}</h2>
                <header className="win">
                    {winner && <Square>{winner}</Square>}
                </header>
                <section className="counter">
                    <div>{counter[0]}</div>
                    <div>{counter[1]}</div>
                </section>
                <footer>
                    <button onClick={resetGame}>Limpiar tablero</button>
                    <button onClick={resetGameAll}>Partida desde 0</button>
                </footer>
            </div>
        </section>
    );
}
