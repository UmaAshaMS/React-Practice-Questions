import React, { useState, useRef } from "react";

export default function FileExplorer() {
  const data = [
    {
      name: "src",
      type: "folder",
      children: [
        { name: "App.js", type: "file" },
        { name: "index.js", type: "file" },
        {
          name: "components",
          type: "folder",
          children: [
            { name: "Header.js", type: "file" },
            { name: "Sidebar.js", type: "file" }
          ]
        }
      ]
    },
    {
      name: "package.json",
      type: "file"
    }
  ];

  return (
    <div>
      <h2>File Explorer</h2>
      <Tree nodes={data} />
    </div>
  );
}

/* ---------------- TREE ROOT ---------------- */

function Tree({ nodes }) {
  return (
    <ul role="tree" aria-label="File Explorer">
      {nodes.map((node, index) => (
        <TreeItem key={index} node={node} />
      ))}
    </ul>
  );
}

/* ---------------- TREE ITEM ---------------- */

function TreeItem({ node }) {
  const [expanded, setExpanded] = useState(false);
  const itemRef = useRef(null);

  const isFolder = node.type === "folder";

  const toggle = () => {
    if (isFolder) {
      setExpanded(prev => !prev);
    }
  };

  const handleKeyDown = (e) => {
    if (!isFolder) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        toggle();
        break;

      case "ArrowRight":
        setExpanded(true);
        break;

      case "ArrowLeft":
        setExpanded(false);
        break;

      default:
        break;
    }
  };

  return (
    <li>
      <div
        ref={itemRef}
        role="treeitem"
        tabIndex={0}
        aria-expanded={isFolder ? expanded : undefined}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        style={{
          cursor: isFolder ? "pointer" : "default",
          padding: "4px"
        }}
      >
        {isFolder
          ? expanded
            ? "📂"
            : "📁"
          : "📄"}{" "}
        {node.name}
      </div>

      {isFolder && expanded && (
        <ul role="group" style={{ paddingLeft: 20 }}>
          {node.children.map((child, i) => (
            <TreeItem key={i} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}