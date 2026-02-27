import React from "react";

export default function NestedList() {
  const data = [
    {
      id: 1,
      name: "Frontend",
      children: [
        { id: 11, name: "React" },
        { id: 12, name: "Vue" }
      ]
    },
    {
      id: 2,
      name: "Backend",
      children: [
        { id: 21, name: "Node" },
        { id: 22, name: "Django" }
      ]
    }
  ];

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Nested List</h2>

      <ul>
        {data.map(parent => (
          <li key={parent.id}>
            <strong>{parent.name}</strong>

            <ul>
              {parent.children.map(child => (
                <li key={child.id}>{child.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}