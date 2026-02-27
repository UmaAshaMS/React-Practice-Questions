import React, { useState } from "react";

export default function UsersTable() {
  const usersData = [
    { id: 1, name: "Anu", age: 24, city: "Kochi" },
    { id: 2, name: "Rahul", age: 30, city: "Trivandrum" },
    { id: 3, name: "Meera", age: 27, city: "Calicut" },
    { id: 4, name: "Arjun", age: 22, city: "Kollam" }
  ];

  const [users, setUsers] = useState(usersData);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc"
  });

  const handleSort = (key) => {
    let direction = "asc";

    if (
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key])
        return direction === "asc" ? -1 : 1;
      if (a[key] > b[key])
        return direction === "asc" ? 1 : -1;
      return 0;
    });

    setUsers(sortedUsers);
    setSortConfig({ key, direction });
  };

  const getArrow = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc"
      ? " 🔼"
      : " 🔽";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Users Table</h2>

      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              ID{getArrow("id")}
            </th>
            <th onClick={() => handleSort("name")}>
              Name{getArrow("name")}
            </th>
            <th onClick={() => handleSort("age")}>
              Age{getArrow("age")}
            </th>
            <th onClick={() => handleSort("city")}>
              City{getArrow("city")}
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}