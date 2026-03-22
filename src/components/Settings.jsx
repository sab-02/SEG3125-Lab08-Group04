import React, { useState } from "react";

export default function Settings() {
  const [name, setName] = useState("Jane Student");
  const [email, setEmail] = useState("student@uni.edu");

  const [studyGoal, setStudyGoal] = useState(25);

  const [notifications, setNotifications] = useState({
    deadlines: true,
    summary: true,
    reminders: false,
  });

  const [theme, setTheme] = useState("light");

  const toggleNotification = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  const saveSettings = () => {
    alert("Settings saved!");
  };

  return (
    <>
      {/* HEADER */}
      <h1>Settings</h1>
      <p className="subtitle">Manage your profile and preferences</p>

      {/* PROFILE */}
      <div className="settings-card">
        <h3>Profile Information</h3>

        <label>Full Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email Address</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <div className="avatar-row">
          <div className="avatar">JS</div>
          <button className="secondary">Change Avatar</button>
        </div>
      </div>

      {/* STUDY GOAL */}
      <div className="settings-card">
        <h3>Study Goal Settings</h3>

        <label>Weekly Study Hours Goal</label>

        <div className="slider-row">
          <input
            type="range"
            min="5"
            max="50"
            value={studyGoal}
            onChange={(e) => setStudyGoal(e.target.value)}
          />
          <span className="goal-value">{studyGoal}h</span>
        </div>

        <p className="helper">
          Set a realistic weekly study goal to stay motivated
        </p>

        <div className="info-box">
          Recommended: 20–30 hours per week for full-time students
        </div>
      </div>

      {/* NOTIFICATIONS */}
      <div className="settings-card">
        <h3>Notification Settings</h3>

        <div className="toggle-row">
          <div>
            <strong>Deadline Reminders</strong>
            <p>Get notified about upcoming deadlines</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications.deadlines}
              onChange={() => toggleNotification("deadlines")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-row">
          <div>
            <strong>Daily Summary</strong>
            <p>Receive a summary of your daily progress</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications.summary}
              onChange={() => toggleNotification("summary")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-row">
          <div>
            <strong>Study Reminders</strong>
            <p>Get reminded to start your study sessions</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications.reminders}
              onChange={() => toggleNotification("reminders")}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* APPEARANCE */}
      <div className="settings-card">
        <h3>Appearance</h3>

        <div className="theme-options">
          <button
            className={`theme-btn ${theme === "light" ? "active" : ""}`}
            onClick={() => setTheme("light")}
          >
            <span className="icon">☀️</span>
            <span className="label">Light Mode</span>
          </button>

          <button
            className={`theme-btn ${theme === "dark" ? "active" : ""}`}
            onClick={() => setTheme("dark")}
          >
            <span className="icon">🌙</span>
            <span className="label">Dark Mode</span>
          </button>
        </div>
      </div>

      {/* SAVE */}
      <div className="settings-card">
        <button className="primary save-btn" onClick={saveSettings}>
          Save Settings
        </button>
      </div>
    </>
  );
}