import React, { useState } from "react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2));

  const [studyEvents, setStudyEvents] = useState([]);
  const [assignmentEvents, setAssignmentEvents] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("study");

  const today = new Date();

  const isPastDate = (dateStr) => {
    const date = new Date(dateStr);
    return date < new Date(today.toDateString());
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const formatDate = (day) => {
    return `${year}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const addEvent = () => {
    if (!newTitle || !selectedDate) return;

    if (newType === "study") {
      setStudyEvents([
        ...studyEvents,
        { title: newTitle, date: selectedDate },
      ]);
    } else {
      setAssignmentEvents([
        ...assignmentEvents,
        { title: newTitle, date: selectedDate },
      ]);
    }

    setNewTitle("");
    setNewType("study");
    setShowModal(false);
  };

  // Disable going to past months
  const isCurrentMonth =
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();

  return (
    <>
      {/* HEADER */}
      <div className="calendar-header">
        <div>
          <h1>Calendar</h1>
          <p className="subtitle">View and manage your study schedule</p>
        </div>

        <button
            className="primary add-btn"
            onClick={() => {
                const todayStr = new Date().toISOString().split("T")[0];
                setSelectedDate(todayStr);
                setShowModal(true);
            }}
            >
            + Add Study Session
        </button>
      </div>

      {/* CARD */}
      <div className="calendar-card">

        {/* MONTH NAV */}
        <div className="calendar-nav">
          <button
            className="nav-btn"
            disabled={isCurrentMonth}
            onClick={() =>
              setCurrentDate(new Date(year, currentDate.getMonth() - 1))
            }
          >
            &#8249;
          </button>

          <h2>{month} {year}</h2>

          <button
            className="nav-btn"
            onClick={() =>
              setCurrentDate(new Date(year, currentDate.getMonth() + 1))
            }
          >
            &#8250;
          </button>
        </div>

        {/* WEEKDAYS */}
        <div className="calendar-grid weekday-row">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
        </div>

        {/* GRID */}
        <div className="calendar-grid">
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dateStr = formatDate(day);

            const isPast = isPastDate(dateStr);

            const studies = studyEvents.filter(e => e.date === dateStr);
            const assignments = assignmentEvents.filter(e => e.date === dateStr);

            return (
              <div
                key={day}
                className={`calendar-cell ${isPast ? "disabled" : ""}`}
                onClick={() => {
                  if (isPast) return;
                  setSelectedDate(dateStr);
                  setShowModal(true);
                }}
              >
                <div className="date">{day}</div>

                {studies.map((e, i) => (
                  <div key={i} className="event study">
                    {e.title}
                  </div>
                ))}

                {assignments.map((e, i) => (
                  <div key={i} className="event assignment">
                    {e.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Event</h3>

            <p>{selectedDate}</p>

            <input
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <select value={newType} onChange={(e) => setNewType(e.target.value)}>
              <option value="study">Study Session</option>
              <option value="assignment">Assignment</option>
            </select>

            <div className="modal-actions">
              <button className="primary" onClick={addEvent}>
                Add
              </button>
              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}