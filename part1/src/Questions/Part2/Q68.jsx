import { useState } from "react";

export default function TodoList() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Add Task
  const addTask = () => {
    if (task.trim() === "") return;

    setTodos([...todos, task]);
    setTask("");
  };

  // Delete Task
  const deleteTask = (index) => {
    const updatedTodos = todos.filter(
      (_, i) => i !== index
    );
    setTodos(updatedTodos);
  };

  return (
    <div style={styles.container}>
      <h2>Todo List</h2>

      {/* Input */}
      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={styles.input}
      />

      <button onClick={addTask} style={styles.addBtn}>
        Add
      </button>

      {/* Todo Items */}
      <ul style={styles.list}>
        {todos.map((todo, index) => (
          <li key={index} style={styles.item}>
            {todo}

            <button
              onClick={() => deleteTask(index)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    width: "350px",
    margin: "40px auto",
    fontFamily: "Arial",
    textAlign: "center"
  },
  input: {
    padding: "8px",
    width: "70%",
    marginRight: "5px"
  },
  addBtn: {
    padding: "8px 12px",
    cursor: "pointer"
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "20px"
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    border: "1px solid #ccc",
    padding: "8px"
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};