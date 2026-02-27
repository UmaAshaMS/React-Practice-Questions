import React, { useState, useEffect } from "react";

export default function AutoRefresh() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); 

    const interval = setInterval(() => {
      fetchUsers();
    }, 10000); // 10 seconds

    return () => clearInterval(interval); 
  }, []);

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Auto Refresh (10s)</h2>
      {loading && <p>Refreshing...</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}