import React, { useState } from "react";

const ROWS = 6;
const COLS = 7;

export default function DiscDropGame() {
  const createBoard = () =>
    Array.from({ length: ROWS }, () =>
      Array(COLS).fill(null)
    );

  const [board, setBoard] = useState(createBoard());
  const [player, setPlayer] = useState("red");
  const [winner, setWinner] = useState(null);

  // -------- Drop Disc ----------
  const dropDisc = (col) => {
    if (winner) return;

    const newBoard = board.map(row => [...row]);

    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = player;

        if (checkWinner(newBoard, row, col, player)) {
          setWinner(player);
        } else {
          setPlayer(player === "red" ? "yellow" : "red");
        }

        setBoard(newBoard);
        return;
      }
    }
  };

  // -------- Winner Check ----------
  const checkWinner = (grid, r, c, color) => {

    const directions = [
      [0, 1],   // horizontal
      [1, 0],   // vertical
      [1, 1],   // diagonal \
      [1, -1]   // diagonal /
    ];

    for (let [dr, dc] of directions) {
      let count = 1;

      count += countDirection(grid, r, c, dr, dc, color);
      count += countDirection(grid, r, c, -dr, -dc, color);

      if (count >= 4) return true;
    }

    return false;
  };

  const countDirection = (grid, r, c, dr, dc, color) => {
    let total = 0;
    let row = r + dr;
    let col = c + dc;

    while (
      row >= 0 &&
      row < ROWS &&
      col >= 0 &&
      col < COLS &&
      grid[row][col] === color
    ) {
      total++;
      row += dr;
      col += dc;
    }

    return total;
  };

  // -------- Reset ----------
  const resetGame = () => {
    setBoard(createBoard());
    setPlayer("red");
    setWinner(null);
  };

  return (
    <div style={styles.container}>
      <h2>Disc Drop Game</h2>

      <p>
        {winner
          ? `${winner.toUpperCase()} Wins 🎉`
          : `Turn: ${player.toUpperCase()}`}
      </p>

      {/* Clickable column headers */}
      <div style={styles.columns}>
        {Array.from({ length: COLS }).map((_, col) => (
          <button
            key={col}
            style={styles.dropButton}
            onClick={() => dropDisc(col)}
          >
            ↓
          </button>
        ))}
      </div>

      {/* Board */}
      <div style={styles.board}>
        {board.map((row, r) =>
          row.map((cell, c) => (
            <div key={`${r}-${c}`} style={styles.cell}>
              {cell && (
                <div
                  style={{
                    ...styles.disc,
                    background:
                      cell === "red" ? "red" : "gold"
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>

      <button onClick={resetGame} style={styles.reset}>
        Reset Game
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "sans-serif",
    marginTop: "20px"
  },

  columns: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 60px)",
    justifyContent: "center",
    marginBottom: "5px"
  },

  dropButton: {
    height: "40px",
    cursor: "pointer",
    fontSize: "18px"
  },

  board: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 60px)",
    gap: "5px",
    background: "#1e3a8a",
    padding: "10px",
    width: "fit-content",
    margin: "auto",
    borderRadius: "8px"
  },

  cell: {
    width: "60px",
    height: "60px",
    background: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  disc: {
    width: "50px",
    height: "50px",
    borderRadius: "50%"
  },

  reset: {
    marginTop: "15px",
    padding: "8px 14px",
    cursor: "pointer"
  }
};