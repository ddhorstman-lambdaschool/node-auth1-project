import Login from "./Login";

import React from "react";
import axios from "axios";

export default function LoginLogout(props) {
  console.log(document.cookie.includes("node-auth1-session"));
  function logout() {
    axios.get("http://localhost:5000/api/logout", { withCredentials: true });
  }
  return (
    <>
      <Login /><br />
      <button onClick={logout}>Logout</button>
    </>
  );
}
