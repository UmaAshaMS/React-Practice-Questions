import React, { useState } from "react";

export default function LimitedButton() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <p>Clicked: {count} times</p>

      <button 
        onClick={handleClick} 
        disabled={count >= 3}
        style={{ padding: "10px 20px" }}
      >
        Click Me
      </button>

      {count >= 3 && (
        <p style={{ color: "red" }}>
          Button disabled after 3 clicks!
        </p>
      )}
    </div>
  );
}