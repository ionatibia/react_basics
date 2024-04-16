import { WINNER_COMBOS } from "../constants";

export const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo;
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
            return boardToCheck[a];
        }
    }
    return null;
};

export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
};

export const setLocalStorage = (newBoard,newWinner,newTurn,newCounter)=>{
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    if(newCounter) window.localStorage.setItem("counter", JSON.stringify(newCounter));
    window.localStorage.setItem("turn", JSON.stringify(newTurn));
    window.localStorage.setItem("winner", newWinner);
}