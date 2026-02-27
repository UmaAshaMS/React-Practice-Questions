import React, { useRef, useState } from "react";

export default function AuthCodeInput() {
  const LENGTH = 6;

  const [code, setCode] = useState(
    Array(LENGTH).fill("")
  );

  const inputsRef = useRef([]);

  // ---------- Update Value ----------
  const updateCode = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // move forward
    if (value && index < LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  // ---------- Key Handling ----------
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1].focus();
    }

    if (e.key === "ArrowRight" && index < LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  // ---------- Paste Support ----------
  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, LENGTH)
      .split("");

    const newCode = [...code];

    pasted.forEach((digit, i) => {
      newCode[i] = digit;
    });

    setCode(newCode);

    const focusIndex =
      pasted.length >= LENGTH
        ? LENGTH - 1
        : pasted.length;

    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div style={styles.container}>
      <h3>Enter Authorization Code</h3>

      <div style={styles.inputs}>
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) =>
              updateCode(e.target.value, index)
            }
            onKeyDown={(e) =>
              handleKeyDown(e, index)
            }
            onPaste={handlePaste}
            style={styles.input}
            aria-label={`Digit ${index + 1}`}
          />
        ))}
      </div>

      <p>Code: {code.join("")}</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "sans-serif",
    marginTop: "40px"
  },

  inputs: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px"
  },

  input: {
    width: "45px",
    height: "55px",
    fontSize: "22px",
    textAlign: "center",
    border: "2px solid #ccc",
    borderRadius: "6px"
  }
};