import React from "react";

export default function Sidebar({ setPage, current }) {
  return (
    <div className="sidebar">
      <h3>StudyFlow</h3>

      <ul>
        <li
          className={current === "dashboard" ? "active" : ""}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </li>

        <li
          className={current === "tasks" ? "active" : ""}
          onClick={() => setPage("tasks")}
        >
          Tasks
        </li>
        <li
          className={current === "calendar" ? "active" : ""}
          onClick={() => setPage("calendar")}
        >
          Calendar
        </li>
        <li
        className={current === "timer" ? "active" : ""}
        onClick={() => setPage("timer")}
        >
          Study Timer
        </li>
        <li>Progress</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}
