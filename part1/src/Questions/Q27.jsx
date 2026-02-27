import React, { useState, useEffect } from "react";

export default function SearchFetch() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setUsers(data);
        setResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(search.toLowerCase())
    );
    setResults(filtered);
  }, [search, users]);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Search Users</h2>
      <input
        type="text"
        placeholder="Search username..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ marginTop: "20px" }}>
        {results.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}