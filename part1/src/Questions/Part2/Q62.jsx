import React, { useMemo, useState } from "react";

export default function UsersTablePagination() {
  const users = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@mail.com`
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(
    filteredUsers.length / rowsPerPage
  );

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredUsers.slice(
      start,
      start + rowsPerPage
    );
  }, [currentPage, rowsPerPage, filteredUsers]);

  return (
    <div style={styles.container}>
      <h2>User Data Table</h2>

      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        style={styles.input}
      />

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {paginatedUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.pagination}>
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          First
        </button>

        <button
          onClick={() =>
            setCurrentPage(prev => prev - 1)
          }
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage(prev => prev + 1)
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>

        <button
          onClick={() =>
            setCurrentPage(totalPages)
          }
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>

      <div style={{ marginTop: "10px" }}>
        Rows per page:
        <select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "600px",
    margin: "40px auto",
    fontFamily: "Arial"
  },
  input: {
    padding: "8px",
    marginBottom: "15px",
    width: "100%"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  pagination: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
    alignItems: "center"
  }
};