import React, { useState } from "react";

export default function TextareaCounter() {
  const [text, setText] = useState("");

  return (
    <div style={{ width: "400px", margin: "50px auto" }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        rows="5"
        style={{ width: "100%", padding: "10px" }}
      />

      <div style={{ marginTop: "8px", textAlign: "right" }}>
        {text.length} characters
      </div>
    </div>
  );
}