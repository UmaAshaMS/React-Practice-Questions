import React from "react";

export default function CardApp() {
  return (
    <div style={{ padding: "40px", display: "flex", gap: "20px" }}>
      
      <Card>
        <Card.Header>Details</Card.Header>
        <Card.Body>
          <p>Name: Wynxio Technologies</p>
          <p>Courses: Frontend, Backend, Full Stack</p>
        </Card.Body>
        <Card.Footer>Last updated today</Card.Footer>
      </Card>

      <Card>
        <Card.Body>
          <h3>Greetings</h3>
          <p>Hey! from Wynxio Technologies!!</p>
        </Card.Body>
      </Card>

    </div>
  );
}

function Card({ children, style }) {
  const cardStyle = {
    width: "280px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    background: "#fff",
    overflow: "hidden",
    ...style
  };

  return <div style={cardStyle}>{children}</div>;
}

//Subcomponents
Card.Header = function CardHeader({ children }) {
  return (
    <div style={{ padding: "16px", borderBottom: "1px solid #eee", fontWeight: "600" }}>
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children }) {
  return (
    <div style={{ padding: "16px" }}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ children }) {
  return (
    <div style={{ padding: "12px 16px", borderTop: "1px solid #eee", fontSize: "14px", color: "#555" }}>
      {children}
    </div>
  );
};