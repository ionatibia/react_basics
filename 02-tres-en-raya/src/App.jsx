import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWinner, checkEndGame, setLocalStorage } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";

function App() {
    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem("board");
        return boardFromStorage
            ? JSON.parse(boardFromStorage)
            : Array(9).fill(null);
    });
    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem("turn");
        return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X;
    });
    const [winner, setWinner] = useState(() => {
        const winnerFromStorage = window.localStorage.getItem("winner");
        const winnerData =
            winnerFromStorage === "null" || winnerFromStorage === "false"
                ? JSON.parse(winnerFromStorage)
                : winnerFromStorage;
        return winnerFromStorage ? winnerData : null;
    });
    const [counter, setCounter] = useState(() => {
        const counterFromStorage = window.localStorage.getItem("counter");
        return counterFromStorage ? JSON.parse(counterFromStorage) : [0, 0];
    });

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setTurn(TURNS.X);
        setWinner(null);
        setLocalStorage(Array(9).fill(null), null, TURNS.X, null);
    };
    const resetGameAll = () => {
        setBoard(Array(9).fill(null));
        window.localStorage.setItem(
            "board",
            JSON.stringify(Array(9).fill(null))
        );
        setTurn(TURNS.X);
        setWinner(null);
        setCounter([0, 0]);
        setLocalStorage(Array(9).fill(null), null, TURNS.X, [0, 0]);
    };

    const updateBoard = (index) => {
        if (board[index] || winner) return;
        const newBoard = [...board];
        newBoard[index] = turn;
        setBoard(newBoard);

        const newWinner = checkWinner(newBoard);
        const newCounter = [...counter];
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
        if (newWinner) {
            newWinner === "X" ? newCounter[0]++ : newCounter[1]++;
            setCounter(newCounter);
            confetti({
                particleCount: 500,
                angle: 90,
                spread: 180,
                shapes: ["circle", "circle", "square"],
            });
            setWinner(newWinner);
            setLocalStorage(newBoard, newWinner, newTurn, newCounter);
            return;
        } else if (checkEndGame(newBoard)) {
            setWinner(false);
            setLocalStorage(newBoard, false, newTurn, newCounter);
            return;
        }
        setTurn(newTurn);
        setLocalStorage(newBoard, newWinner, newTurn, newCounter);
    };

    return (
        <main className="board">
            <h1>Tres En Raya</h1>
            <button onClick={resetGameAll}>Partida desde 0</button>
            <button onClick={resetGame}>Limpiar tablero</button>
            <section className="game">
                {board.map((square, index) => {
                    return (
                        <Square
                            key={index}
                            index={index}
                            updateBoard={updateBoard}
                        >
                            {square}
                        </Square>
                    );
                })}
            </section>
            <section className="turn">
                <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
                <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
            </section>
            <h2>Contador</h2>
            <section className="counter">
                <div>{counter[0]}</div>
                <div>{counter[1]}</div>
            </section>
            <WinnerModal
                winner={winner}
                resetGame={resetGame}
                resetGameAll={resetGameAll}
                counter={counter}
            />
        </main>
    );
}

export default App;
