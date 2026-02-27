import { useState, useCallback } from "react";

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  return [value, toggle];
}

import React from "react";

export default function Toggle() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={toggle}>
        {isOpen ? "Hide" : "Show"}
      </button>

      {isOpen && <p>Hello from Wynxio!!</p>}
    </div>
  );
}