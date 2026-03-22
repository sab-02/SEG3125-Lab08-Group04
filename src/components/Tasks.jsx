import React, { useState } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { text: "Data Structures Final Project", course: "CS 101", priority: "high", done: false },
    { text: "Literature Essay", course: "ENG 201", priority: "medium", done: true },
    { text: "Physics Problem Set 5", course: "PHY 301", priority: "high", done: false },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const [newTask, setNewTask] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [newPriority, setNewPriority] = useState("medium");

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const addTask = () => {
    if (!newTask) return;

    setTasks([
      ...tasks,
      {
        text: newTask,
        course: newCourse,
        priority: newPriority,
        done: false,
      },
    ]);

    setNewTask("");
    setNewCourse("");
    setNewPriority("medium");
    setShowModal(false);
  };

  // FILTER LOGIC
  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "completed") return task.done;
    if (activeTab === "upcoming") return !task.done;
    return true;
  });

  return (
    <>
      {/* HEADER */}
      <div className="tasks-header">
        <h1>Task Manager</h1>
        <button className="primary add-btn" onClick={() => setShowModal(true)}>
          + Add Task
        </button>
      </div>

      {/* TABS */}
      <div className="tabs">
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          All Tasks
        </button>

        <button
          className={activeTab === "upcoming" ? "active" : ""}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>

        <button
          className={activeTab === "completed" ? "active" : ""}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
      </div>

      {/* TASK LIST */}
      <div className="task-list">
        {filteredTasks.map((task, index) => (
          <div className={`task-card ${task.done ? "done" : ""}`} key={index}>
            
            <div className="task-top">
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(index)}
                />
                <strong>{task.text}</strong>
              </div>

              <span className={task.priority}>{task.priority}</span>
            </div>

            <p>Course: {task.course}</p>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Task</h3>

            <input
              placeholder="Task name"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />

            <input
              placeholder="Course"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
            />

            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <div className="modal-actions">
              <button className="primary" onClick={addTask}>
                Add Task
              </button>
              <button className="cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
