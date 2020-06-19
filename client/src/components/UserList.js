import React from "react";
import axios from "axios";

export default function UserList(props) {
  const [users, setUsers] = React.useState([]);
  function getUsers() {
    axios
      .get("http://localhost:5000/api/users", { withCredentials: true })
      .then(r => setUsers(r.data));
  }

  return users.length === 0 ? (
    <button onClick={getUsers}>Get Users</button>
  ) : (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ul>
  );
}
