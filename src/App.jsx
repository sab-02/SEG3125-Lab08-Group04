import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import Login from "./components/Login";
import "./index.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div id="app">
      <Sidebar setPage={setPage} current={page} />

      <div className="content">
        {page === "dashboard" && <Dashboard setPage={setPage} />}
        {page === "tasks" && <Tasks />}
      </div>
    </div>
  );
}

export default App;
