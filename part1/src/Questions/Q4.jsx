import React, { useState } from "react";

export default function BackgroundToggle() {
  const [isBlue, setIsBlue] = useState(false);

  const toggleColor = () => {
    setIsBlue(prev => !prev);
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: isBlue ? "steelblue" : "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <button onClick={toggleColor} style={{ padding: "10px 20px" }}>
        Change Background
      </button>
    </div>
  );
}