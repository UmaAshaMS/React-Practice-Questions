import { useEffect, useState } from "react";

export default function WordleGame() {
  const WORD_LENGTH = 5;
  const MAX_ATTEMPTS = 6;

  const WORDS = ["APPLE", "GRAPE", "MANGO", "PLANT"];
  const ANSWER =
    WORDS[Math.floor(Math.random() * WORDS.length)];

  const [board, setBoard] = useState(
    Array(MAX_ATTEMPTS)
      .fill("")
      .map(() => Array(WORD_LENGTH).fill(""))
  );

  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [status, setStatus] = useState([]);

  /* ---------------- Update Cell ---------------- */
  const updateCell = (r, c, value) => {
    setBoard((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[r][c] = value;
      return copy;
    });
  };

  /* ---------------- Word Validation ---------------- */
  const checkGuess = () => {
    const guess = board[row].join("");
    let answerArr = ANSWER.split("");

    const rowStatus = Array(WORD_LENGTH).fill("absent");

    // correct letters
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guess[i] === ANSWER[i]) {
        rowStatus[i] = "correct";
        answerArr[i] = null;
      }
    }

    // present letters
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (rowStatus[i] === "correct") continue;

      const index = answerArr.indexOf(guess[i]);
      if (index !== -1) {
        rowStatus[i] = "present";
        answerArr[index] = null;
      }
    }

    setStatus((prev) => {
      const copy = [...prev];
      copy[row] = rowStatus;
      return copy;
    });

    if (guess === ANSWER) {
      setTimeout(() => alert("🎉 You Win!"), 200);
      return;
    }

    if (row === MAX_ATTEMPTS - 1) {
      setTimeout(
        () => alert(`Game Over! Answer: ${ANSWER}`),
        200
      );
      return;
    }

    setRow((r) => r + 1);
    setCol(0);
  };

  /* ---------------- Keyboard Support ---------------- */
  useEffect(() => {
    const handleKey = (e) => {
      if (row >= MAX_ATTEMPTS) return;

      if (e.key === "Backspace") {
        if (col === 0) return;
        updateCell(row, col - 1, "");
        setCol((c) => c - 1);
        return;
      }

      if (e.key === "Enter") {
        if (col === WORD_LENGTH) checkGuess();
        return;
      }

      if (/^[a-zA-Z]$/.test(e.key)) {
        if (col < WORD_LENGTH) {
          updateCell(
            row,
            col,
            e.key.toUpperCase()
          );
          setCol((c) => c + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () =>
      window.removeEventListener("keydown", handleKey);
  }, [row, col, board]);

  /* ---------------- Styles ---------------- */
  const styles = {
    container: {
      textAlign: "center",
      fontFamily: "Arial",
    },
    board: {
      display: "grid",
      gap: "8px",
      justifyContent: "center",
    },
    row: {
      display: "grid",
      gridTemplateColumns: "repeat(5, 60px)",
      gap: "8px",
    },
    cell: {
      width: "60px",
      height: "60px",
      border: "2px solid #ccc",
      fontSize: "28px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  const getColor = (state) => {
    if (state === "correct") return "#538d4e";
    if (state === "present") return "#b59f3b";
    if (state === "absent") return "#3a3a3c";
    return "transparent";
  };

  /* ---------------- UI ---------------- */
  return (
    <div style={styles.container}>
      <h2>Wordle Game</h2>

      <div style={styles.board}>
        {board.map((r, rIndex) => (
          <div key={rIndex} style={styles.row}>
            {r.map((cell, cIndex) => (
              <div
                key={cIndex}
                style={{
                  ...styles.cell,
                  background:
                    getColor(
                      status[rIndex]?.[cIndex]
                    ),
                  color:
                    status[rIndex]?.[cIndex]
                      ? "white"
                      : "black",
                }}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}