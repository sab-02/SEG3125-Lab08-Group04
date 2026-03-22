import React from "react";

export default function Tasks() {
  return (
    <>
      <h1>Task Manager</h1>

      <div className="tabs">
        <button className="active">All Tasks</button>
        <button>Upcoming</button>
        <button>Completed</button>
      </div>

      <div className="task-card">
        <strong>Data Structures Final Project</strong>
        <p>Course: CS 101</p>
        <span className="high">High</span>
      </div>

      <div className="task-card">
        <strong>Literature Essay</strong>
        <p>Course: ENG 201</p>
        <span className="medium">Medium</span>
      </div>

      <div className="task-card">
        <strong>Physics Problem Set 5</strong>
        <p>Course: PHY 301</p>
        <span className="high">High</span>
      </div>
    </>
  );
}
