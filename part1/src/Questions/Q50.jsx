import React, { useState } from "react";

const Child = React.memo(function Child({ name }) {
  console.log("Child Rendered");
  return <h2>Hello {name}</h2>;
});

export default function ReactMemo() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>

      <Child name="Wynxio" />
    </div>
  );
}