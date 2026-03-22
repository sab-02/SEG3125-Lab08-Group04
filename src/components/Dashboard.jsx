import React, { useState } from "react";

export default function Dashboard({ setPage }) {
  const [tasks, setTasks] = useState([
    { text: "Review calculus notes", done: true },
    { text: "Read Chapter 5", done: false },
    { text: "Practice coding", done: false },
    { text: "Prepare slides", done: false },
  ]);

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const completed = tasks.filter(t => t.done).length;
  const progress = (completed / tasks.length) * 100;

  return (
    <>
      <h1>Welcome back, Jane!</h1>

      <div className="grid">
        <div className="card">
          <h3>Upcoming Deadlines</h3>

          <div className="task">
            Data Structures Final Project <span className="high">High</span>
          </div>
          <div className="task">
            Literature Essay <span className="medium">Medium</span>
          </div>
          <div className="task">
            Physics Problem Set 5 <span className="high">High</span>
          </div>
          <div className="task">
            History Reading Summary <span className="low">Low</span>
          </div>
        </div>

        <div className="card">
          <h3>Weekly Study Progress</h3>
          <div className="progress-circle">68%</div>
          <button
              className="primary"
              onClick={() => setPage("tasks")}>
              + Quick Add Task
          </button>
        </div>

        
        <div className="card full">
          <h3>Today's Study Tasks</h3>

          {tasks.map((task, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(index)}
              />
              {task.text}
            </label>
          ))}

          <div className="progress-bar">
            <div
              className="fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
