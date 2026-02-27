import React, { useState } from "react";

function ToggleComponent() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <button onClick={() => setIsVisible(prev => !prev)}>
        {isVisible ? "Hide" : "Show"} Content
      </button>

      {isVisible && (
        <div style={{ marginTop: "20px" }}>
          <h3>Hey! Greetings from Wynxio Technologies. !</h3>
        </div>
      )}
    </div>
  );
}

export default ToggleComponent;