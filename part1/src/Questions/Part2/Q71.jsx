import { useState } from "react";

export default function TicTacToeGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <div style={styles.container}>
      <h2>Tic Tac Toe</h2>

      <h3>
        {winner
          ? `Winner: ${winner}`
          : board.every(cell => cell)
          ? "Draw!"
          : `Turn: ${isXTurn ? "X" : "O"}`}
      </h3>

      <div style={styles.grid}>
        {board.map((cell, index) => (
          <button
            key={index}
            style={styles.cell}
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      <button onClick={resetGame} style={styles.reset}>
        Restart Game
      </button>
    </div>
  );
}

// Winner Logic
function calculateWinner(board) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for (let [a, b, c] of lines) {
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }

  return null;
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
    fontFamily: "Arial"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 80px)",
    gap: "5px",
    justifyContent: "center",
    margin: "20px 0"
  },
  cell: {
    width: "80px",
    height: "80px",
    fontSize: "30px",
    cursor: "pointer"
  },
  reset: {
    padding: "10px 20px",
    cursor: "pointer"
  }
};