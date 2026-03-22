import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function StudyTimerPage() {
  const FOCUS_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);

      if (mode === "focus") {
        setSessionsCompleted((prev) => prev + 1);
        setMode("break");
        setTimeLeft(BREAK_TIME);
      } else {
        setMode("focus");
        setTimeLeft(FOCUS_TIME);
      }
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft, mode]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === "focus" ? FOCUS_TIME : BREAK_TIME);
  };

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(mode === "focus" ? FOCUS_TIME : BREAK_TIME);
  };

  const totalTime = mode === "focus" ? FOCUS_TIME : BREAK_TIME;
  const progress = (totalTime - timeLeft) / totalTime;
  const visibleProgress = progress === 0 ? 0.02 : progress;

  const radius = 92;
  const stroke = 14;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - visibleProgress);

  return (
    <div className="timer-page">
      <style>{`
        .timer-page {
          min-height: 100vh;
          background: #f7f8fb;
          padding: 20px;
        }

        .timer-shell {
          max-width: 1100px;
          margin: 0 auto;
        }

        .timer-title {
          margin: 0 0 8px 0;
          line-height: 1.1;
          font-weight: 700;
          color: #111827;
        }

        .timer-subtitle {
          margin: 0 0 24px 0;
          font-size: 1.125rem;
          color: #4b5563;
        }

        .timer-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 24px;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
          padding: 24px;
        }

        .timer-page button {
          width: auto;
          margin-top: 0;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }

        .timer-mode-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 28px;
        }

        .mode-btn {
          width: 100%;
          border-radius: 16px;
          padding: 14px 18px;
          font-size: 1.125rem;
          font-weight: 600;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
        }

        .mode-btn.active {
          background: linear-gradient(90deg, #4f6df5, #9b3df5);
          color: #ffffff;
        }

        .mode-btn.inactive {
          background: #f3f4f6;
          color: #374151;
        }

        .timer-circle-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 28px;
        }

        .timer-circle-box {
          position: relative;
          width: 300px;
          height: 300px;
          flex-shrink: 0;
        }

        .timer-svg {
          width: 100%;
          height: 100%;
          display: block;
          transform: rotate(-90deg);
        }

        .timer-center {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .timer-time {
          margin: 0;
          font-size: 4.25rem;
          line-height: 1;
          font-weight: 700;
          color: #111827;
        }

        .timer-session {
          margin-top: 12px;
          font-size: 1.125rem;
          font-weight: 500;
          color: #4b5563;
        }

        .timer-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .action-btn {
          min-width: 170px;
          border-radius: 16px;
          padding: 14px 22px;
          font-size: 1.125rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .action-btn.primary {
          background: linear-gradient(90deg, #4f6df5, #9b3df5);
          color: white;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
        }

        .action-btn.secondary {
          background: white;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .progress-card {
          border-radius: 20px;
          border: 1px solid #dbe7ff;
          background: #f8fbff;
          padding: 22px 24px;
          margin-bottom: 24px;
        }

        .progress-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }

        .progress-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #374151;
        }

        .progress-count {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
        }

        .progress-bars {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 12px;
        }

        .progress-pill {
          height: 12px;
          border-radius: 999px;
          background: #e5e7eb;
        }

        .progress-pill.done {
          background: linear-gradient(90deg, #4f6df5, #9b3df5);
        }

        .tips-card {
          border-radius: 20px;
          background: #f3f4f6;
          padding: 24px;
        }

        .tips-title {
          margin: 0 0 16px 0;
          font-size: 2rem;
          line-height: 1.2;
          font-weight: 700;
          color: #111827;
        }

        .tips-list {
          margin: 0;
          padding-left: 24px;
          color: #4b5563;
          font-size: 1.125rem;
          line-height: 1.6;
        }

        .tips-list li + li {
          margin-top: 8px;
        }

        @media (max-width: 768px) {
          .timer-page {
            padding: 16px;
          }

          .timer-title {
            font-size: 2.25rem;
          }

          .timer-subtitle {
            font-size: 1rem;
          }

          .timer-card {
          }

          .timer-mode-row {
            grid-template-columns: 1fr;
          }

          .timer-circle-box {
            width: 240px;
            height: 240px;
          }

          .timer-time {
            font-size: 3rem;
          }

          .timer-session {
            font-size: 1rem;
          }

          .action-btn {
            width: 100%;
            min-width: 0;
          }

          .progress-top {
            flex-direction: column;
            align-items: flex-start;
          }

          .progress-title,
          .progress-count {
            font-size: 1.25rem;
          }

          .progress-bars {
            gap: 8px;
          }

          .tips-title {
            font-size: 1.5rem;
          }

          .tips-list {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="timer-shell">
        <h1 className="timer-title">Study Timer</h1>
        <p className="timer-subtitle">
          Use the Pomodoro technique to stay focused
        </p>

        <div className="timer-card">
          <div className="timer-mode-row">
            <button
              type="button"
              onClick={() => switchMode("focus")}
              className={`mode-btn ${mode === "focus" ? "active" : "inactive"}`}
            >
              25 min Focus
            </button>

            <button
              type="button"
              onClick={() => switchMode("break")}
              className={`mode-btn ${mode === "break" ? "active" : "inactive"}`}
            >
              5 min Break
            </button>
          </div>

          <div className="timer-circle-wrap">
            <div className="timer-circle-box">
              <svg viewBox="0 0 220 220" className="timer-svg">
                <defs>
                  <linearGradient
                    id="timerGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#4f6df5" />
                    <stop offset="100%" stopColor="#9b3df5" />
                  </linearGradient>
                </defs>

                <circle
                  cx="110"
                  cy="110"
                  r={radius}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth={stroke}
                />

                <circle
                  cx="110"
                  cy="110"
                  r={radius}
                  fill="none"
                  stroke="url(#timerGradient)"
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                />
              </svg>

              <div className="timer-center">
                <div className="timer-time">{formatTime(timeLeft)}</div>
                <div className="timer-session">
                  Current Session: {mode === "focus" ? "Focus" : "Break"}
                </div>
              </div>
            </div>
          </div>

          <div className="timer-actions">
            <button
              type="button"
              onClick={handleStartPause}
              className="action-btn primary"
            >
              {isRunning ? <Pause size={22} /> : <Play size={22} />}
              {isRunning ? "Pause" : "Start"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="action-btn secondary"
            >
              <RotateCcw size={22} />
              Reset
            </button>
          </div>

          <div className="progress-card">
            <div className="progress-top">
              <div className="progress-title">Session Progress</div>
              <div className="progress-count">
                {sessionsCompleted} completed today
              </div>
            </div>

            <div className="progress-bars">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`progress-pill ${i < sessionsCompleted ? "done" : ""}`}
                />
              ))}
            </div>
          </div>

          <div className="tips-card">
            <h3 className="tips-title">Pomodoro Tips</h3>
            <ul className="tips-list">
              <li>Work for 25 minutes with full focus</li>
              <li>Take a 5-minute break after each session</li>
              <li>After 4 sessions, take a longer 15-30 minute break</li>
              <li>Eliminate all distractions during focus time</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}