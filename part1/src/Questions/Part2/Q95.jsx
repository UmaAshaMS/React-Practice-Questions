import React, { useState, useMemo } from "react";

export default function DataTableWidget() {
  // -------- Sample Data ----------
  const data = [
    
    { id: 2, name: "Arjun", age: 32, city: "Kochi" },
    { id: 3, name: "Meera", age: 25, city: "Chennai" },
    { id: 4, name: "Rahul", age: 30, city: "Delhi" },
    { id: 5, name: "Anu", age: 27, city: "Mumbai" },
    { id: 6, name: "Kiran", age: 35, city: "Bangalore" },
    { id: 7, name: "Dev", age: 29, city: "Pune" },
    { id: 8, name: "Neha", age: 24, city: "Hyderabad" }
  ];

  // -------- Column Config ----------
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "city", label: "City" }
  ];

  const PAGE_SIZE = 3;

  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);

  // -------- Sorting ----------
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    const { key, direction } = sortConfig;

    return [...data].sort((a, b) => {
      if (a[key] < b[key])
        return direction === "asc" ? -1 : 1;
      if (a[key] > b[key])
        return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // -------- Pagination ----------
  const totalPages = Math.ceil(
    sortedData.length / PAGE_SIZE
  );

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedData.slice(
      start,
      start + PAGE_SIZE
    );
  }, [sortedData, page]);

  // -------- Sort Handler ----------
  const handleSort = (key) => {
    setPage(1);

    setSortConfig(prev => {
      if (prev?.key === key) {
        return {
          key,
          direction:
            prev.direction === "asc"
              ? "desc"
              : "asc"
        };
      }

      return { key, direction: "asc" };
    });
  };

  return (
    <div style={styles.container}>
      <h2>Generalized Data Table</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() =>
                  handleSort(col.key)
                }
                style={styles.header}
              >
                {col.label}
                {sortConfig?.key === col.key &&
                  (sortConfig.direction === "asc"
                    ? " ▲"
                    : " ▼")}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map(row => (
            <tr key={row.id}>
              {columns.map(col => (
                <td key={col.key} style={styles.cell}>
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() =>
            setPage(p => p - 1)
          }
        >
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() =>
            setPage(p => p + 1)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "600px",
    margin: "40px auto",
    fontFamily: "sans-serif"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  header: {
    cursor: "pointer",
    borderBottom: "2px solid black",
    padding: "10px"
  },

  cell: {
    padding: "8px",
    borderBottom: "1px solid #ddd"
  },

  pagination: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "space-between"
  }
};