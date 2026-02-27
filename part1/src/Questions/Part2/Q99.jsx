import { useState } from "react";

export default function NxNTicTacToe() {
  const N = 5; // board size
  const M = 4; // marks needed to win

  const createBoard = () =>
    Array(N)
      .fill(null)
      .map(() => Array(N).fill(null));

  const [board, setBoard] = useState(createBoard);
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  /* ---------- Check Winner ---------- */
  const checkDirection = (r, c, dr, dc, symbol, grid) => {
    let count = 0;

    for (let i = 0; i < M; i++) {
      const nr = r + dr * i;
      const nc = c + dc * i;

      if (
        nr < 0 ||
        nc < 0 ||
        nr >= N ||
        nc >= N ||
        grid[nr][nc] !== symbol
      ) {
        return false;
      }

      count++;
    }

    return count === M;
  };

  const checkWin = (r, c, symbol, grid) => {
    const directions = [
      [0, 1], // horizontal
      [1, 0], // vertical
      [1, 1], // diagonal
      [1, -1], // anti-diagonal
    ];

    for (let [dr, dc] of directions) {
      for (let i = -M + 1; i <= 0; i++) {
        const startR = r + dr * i;
        const startC = c + dc * i;

        if (
          checkDirection(
            startR,
            startC,
            dr,
            dc,
            symbol,
            grid
          )
        ) {
          return true;
        }
      }
    }

    return false;
  };

  /* ---------- Handle Move ---------- */
  const handleClick = (r, c) => {
    if (board[r][c] || winner) return;

    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = player;

    if (checkWin(r, c, player, newBoard)) {
      setWinner(player);
    } else {
      setPlayer(player === "X" ? "O" : "X");
    }

    setBoard(newBoard);
  };

  /* ---------- Restart ---------- */
  const restart = () => {
    setBoard(createBoard());
    setPlayer("X");
    setWinner(null);
  };

  /* ---------- Styles ---------- */
  const styles = {
    container: {
      textAlign: "center",
      fontFamily: "Arial",
    },
    board: {
      display: "grid",
      gridTemplateColumns: `repeat(${N}, 60px)`,
      gap: "6px",
      justifyContent: "center",
      marginTop: "20px",
    },
    cell: {
      width: "60px",
      height: "60px",
      border: "2px solid black",
      fontSize: "24px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2>
        {winner
          ? `Winner: ${winner}`
          : `Player Turn: ${player}`}
      </h2>

      <div style={styles.board}>
        {board.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              style={styles.cell}
              onClick={() => handleClick(r, c)}
            >
              {cell}
            </div>
          ))
        )}
      </div>

      <button
        onClick={restart}
        style={{ marginTop: 20 }}
      >
        Restart
      </button>
    </div>
  );
}