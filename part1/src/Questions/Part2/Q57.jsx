import { useState } from "react";

export default function NumberTable() {
  const [rows, setRows] = useState("");
  const [cols, setCols] = useState("");
  const [table, setTable] = useState([]);

  const generateTable = (e) => {
    e.preventDefault();

    const r = Number(rows);
    const c = Number(cols);

    if (!r || !c || r <= 0 || c <= 0) {
      setTable([]);
      return;
    }

    let count = 1;
    const newTable = [];

    for (let i = 0; i < r; i++) {
      const row = [];
      for (let j = 0; j < c; j++) {
        row.push(count++);
      }
      newTable.push(row);
    }

    setTable(newTable);
  };

  return (
    <div style={styles.container}>
      <h2>Generate Number Table</h2>

      <form onSubmit={generateTable} style={styles.form}>
        <input
          type="number"
          placeholder="Rows"
          value={rows}
          onChange={(e) => setRows(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Columns"
          value={cols}
          onChange={(e) => setCols(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Generate
        </button>
      </form>

      {table.length > 0 && (
        <table style={styles.table}>
          <tbody>
            {table.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((num, colIndex) => (
                  <td key={colIndex} style={styles.cell}>
                    {num}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "40px auto",
    fontFamily: "Arial"
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },
  input: {
    padding: "8px",
    width: "100px"
  },
  button: {
    padding: "8px 12px",
    background: "#333",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },
  table: {
    borderCollapse: "collapse",
    width: "100%"
  },
  cell: {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "center"
  }
};