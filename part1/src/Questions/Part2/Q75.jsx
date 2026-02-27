import { useState } from "react";

export default function TransferList() {
  const [leftList, setLeftList] = useState([
    "React",
    "JavaScript",
    "HTML",
    "CSS"
  ]);

  const [rightList, setRightList] = useState([]);

  const [selectedLeft, setSelectedLeft] = useState([]);
  const [selectedRight, setSelectedRight] = useState([]);

  // Select Item
  const toggleSelection = (item, list, setList) => {
    setList(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  // Move Right
  const moveRight = () => {
    setRightList([...rightList, ...selectedLeft]);
    setLeftList(
      leftList.filter(item => !selectedLeft.includes(item))
    );
    setSelectedLeft([]);
  };

  // Move Left
  const moveLeft = () => {
    setLeftList([...leftList, ...selectedRight]);
    setRightList(
      rightList.filter(item =>
        !selectedRight.includes(item)
      )
    );
    setSelectedRight([]);
  };

  return (
    <div style={styles.container}>
      {/* Left List */}
      <div style={styles.listBox}>
        <h3>Available</h3>
        {leftList.map(item => (
          <div
            key={item}
            style={{
              ...styles.item,
              backgroundColor:
                selectedLeft.includes(item)
                  ? "#cce5ff"
                  : ""
            }}
            onClick={() =>
              toggleSelection(
                item,
                selectedLeft,
                setSelectedLeft
              )
            }
          >
            {item}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div style={styles.buttons}>
        <button onClick={moveRight}>{">>"}</button>
        <button onClick={moveLeft}>{"<<"}</button>
      </div>

      {/* Right List */}
      <div style={styles.listBox}>
        <h3>Selected</h3>
        {rightList.map(item => (
          <div
            key={item}
            style={{
              ...styles.item,
              backgroundColor:
                selectedRight.includes(item)
                  ? "#cce5ff"
                  : ""
            }}
            onClick={() =>
              toggleSelection(
                item,
                selectedRight,
                setSelectedRight
              )
            }
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "40px",
    fontFamily: "Arial"
  },
  listBox: {
    width: "200px",
    border: "1px solid #ccc",
    padding: "10px",
    minHeight: "200px"
  },
  item: {
    padding: "8px",
    margin: "5px 0",
    cursor: "pointer",
    border: "1px solid #ddd"
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "10px"
  }
};