import React, { useState } from "react";

const ROWS = 10;
const COLS = 12;

export default function DragSelectGrid() {
  const [isDragging, setIsDragging] = useState(false);
  const [startCell, setStartCell] = useState(null);
  const [endCell, setEndCell] = useState(null);

  // ---------- Mouse Down ----------
  const handleMouseDown = (row, col) => {
    setIsDragging(true);
    setStartCell({ row, col });
    setEndCell({ row, col });
  };

  // ---------- Mouse Enter ----------
  const handleMouseEnter = (row, col) => {
    if (!isDragging) return;
    setEndCell({ row, col });
  };

  // ---------- Mouse Up ----------
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // ---------- Selection Logic ----------
  const isSelected = (row, col) => {
    if (!startCell || !endCell) return false;

    const minRow = Math.min(
      startCell.row,
      endCell.row
    );
    const maxRow = Math.max(
      startCell.row,
      endCell.row
    );

    const minCol = Math.min(
      startCell.col,
      endCell.col
    );
    const maxCol = Math.max(
      startCell.col,
      endCell.col
    );

    return (
      row >= minRow &&
      row <= maxRow &&
      col >= minCol &&
      col <= maxCol
    );
  };

  return (
    <div
      style={styles.container}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <h3>Drag to Select Cells</h3>

      <div style={styles.grid}>
        {Array.from({ length: ROWS }).map((_, r) =>
          Array.from({ length: COLS }).map((_, c) => (
            <div
              key={`${r}-${c}`}
              onMouseDown={() =>
                handleMouseDown(r, c)
              }
              onMouseEnter={() =>
                handleMouseEnter(r, c)
              }
              style={{
                ...styles.cell,
                background: isSelected(r, c)
                  ? "#4f9cff"
                  : "white"
              }}
            >
              {r},{c}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    userSelect: "none",
    fontFamily: "sans-serif",
    padding: "20px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 60px)",
    gap: "4px"
  },

  cell: {
    width: "60px",
    height: "40px",
    border: "1px solid #ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  }
};