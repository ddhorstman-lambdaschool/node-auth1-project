import React from "react";
import "./App.css";
import UserList from "./components/UserList";
import LoginLogout from "./components/LoginLogout";

function App() {
  return (
    <>
      <LoginLogout />
      <UserList />
    </>
  );
}

export default App;
