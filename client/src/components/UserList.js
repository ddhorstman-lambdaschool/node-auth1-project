import React from "react";
import axios from "axios";

export default function UserList(props) {
  function getUsers() {
    axios
      .get("http://localhost:5000/api/users", { withCredentials: true })
      .then(console.log);
  }

  return <button onClick={getUsers}>Get Users</button>;
}
