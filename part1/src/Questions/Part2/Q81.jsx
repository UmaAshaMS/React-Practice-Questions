import React, { useState, useMemo } from "react";

export default function FlatFileExplorer() {
  const treeData = [
    {
      id: 1,
      name: "src",
      type: "folder",
      children: [
        { id: 2, name: "App.js", type: "file" },
        { id: 3, name: "index.js", type: "file" },
        {
          id: 4,
          name: "components",
          type: "folder",
          children: [
            { id: 5, name: "Header.js", type: "file" },
            { id: 6, name: "Sidebar.js", type: "file" }
          ]
        }
      ]
    },
    { id: 7, name: "package.json", type: "file" }
  ];

  const [expanded, setExpanded] = useState(new Set());

  /* ---------- FLATTEN TREE ---------- */
  const flattenTree = (nodes, depth = 0, parentVisible = true) => {
    let result = [];

    nodes.forEach(node => {
      const isVisible = parentVisible;

      result.push({
        ...node,
        depth,
        visible: isVisible
      });

      if (
        node.type === "folder" &&
        expanded.has(node.id)
      ) {
        result = result.concat(
          flattenTree(
            node.children || [],
            depth + 1,
            isVisible
          )
        );
      }
    });

    return result;
  };

  const flatNodes = useMemo(
    () => flattenTree(treeData),
    [expanded]
  );


  const toggleFolder = (id) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id)
        ? next.delete(id)
        : next.add(id);
      return next;
    });
  };

  return (
    <div style={{ width: 300 }}>
      <h3>Flat File Explorer</h3>

      <div role="tree">
        {flatNodes.map(node => (
          <div
            key={node.id}
            role="treeitem"
            aria-expanded={
              node.type === "folder"
                ? expanded.has(node.id)
                : undefined
            }
            style={{
              paddingLeft: node.depth * 20,
              cursor:
                node.type === "folder"
                  ? "pointer"
                  : "default",
              userSelect: "none"
            }}
            onClick={() =>
              node.type === "folder" &&
              toggleFolder(node.id)
            }
          >
            {node.type === "folder"
              ? expanded.has(node.id)
                ? "📂"
                : "📁"
              : "📄"}{" "}
            {node.name}
          </div>
        ))}
      </div>
    </div>
  );
}