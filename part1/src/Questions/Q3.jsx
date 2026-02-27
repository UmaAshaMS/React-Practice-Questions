import React, { useState } from "react";

export default function LiveInput() {
  const [text, setText] = useState("");

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      />

      <p style={{ marginTop: "20px" }}>
        You typed: <strong>{text}</strong>
      </p>
    </div>
  );
}