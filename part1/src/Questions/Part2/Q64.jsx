import { useState } from "react";

// Sample File Structure
const fileSystem = [
  {
    name: "src",
    isFolder: true,
    children: [
      {
        name: "components",
        isFolder: true,
        children: [
          { name: "Header.jsx", isFolder: false },
          { name: "Footer.jsx", isFolder: false }
        ]
      },
      {
        name: "App.jsx",
        isFolder: false
      }
    ]
  },
  {
    name: "package.json",
    isFolder: false
  }
];

// Recursive Item Component
function FileItem({ item }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ marginLeft: "20px" }}>
      <div
        style={styles.item}
        onClick={() =>
          item.isFolder && setExpanded(!expanded)
        }
      >
        {item.isFolder ? (
          <>
            {expanded ? "📂" : "📁"} {item.name}
          </>
        ) : (
          <>📄 {item.name}</>
        )}
      </div>

      {expanded &&
        item.children?.map((child, index) => (
          <FileItem key={index} item={child} />
        ))}
    </div>
  );
}

export default function FileExplorer() {
  return (
    <div style={styles.container}>
      <h2>📁File Explorer</h2>

      {fileSystem.map((item, index) => (
        <FileItem key={index} item={item} />
      ))}
    </div>
  );
}

const styles = {
  container: {
    width: "300px",
    margin: "40px auto",
    fontFamily: "Arial"
  },
  item: {
    cursor: "pointer",
    padding: "4px"
  }
};