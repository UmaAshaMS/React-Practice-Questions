import React, { useState } from "react";

//Top Component
export default function StateApp() {
  return (
    <div style={{ padding: "40px" }}>
      <Parent />
    </div>
  );
}

//Parent (State Lives Here)
function Parent() {
  const [message, setMessage] = useState("Hello");

  return (
    <div>
      <h2>Parent: {message}</h2>

      <Child message={message} setMessage={setMessage} />
    </div>
  );
}

//Child
function Child({ message, setMessage }) {
  return (
    <div style={{ marginLeft: "20px" }}>
      <h3>Child</h3>
      <GrandChild message={message} setMessage={setMessage} />
    </div>
  );
}

//GrandChild (Updates State)
function GrandChild({ message, setMessage }) {
  return (
    <div style={{ marginLeft: "40px" }}>
      <h4>GrandChild</h4>
      <p>Current: {message}</p>

      <button onClick={() => setMessage("Updated from GrandChild")}>
        Update Message
      </button>
    </div>
  );
}