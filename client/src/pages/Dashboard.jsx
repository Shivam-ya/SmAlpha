import { useState, useEffect } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const user = {
    name: "ny609301",
    role: "Frontend Intern",
    status: "Logged In",
  };

  const [assignedWork, setAssignedWork] = useState(
    JSON.parse(localStorage.getItem("assignedWork")) || [
      { id: 1, title: "Setup Project", done: false, editing: false },
      { id: 2, title: "Build Login Page", done: true, editing: false },
      { id: 3, title: "Create Dashboard UI", done: false, editing: false },
    ]
  );

  useEffect(() => {
    localStorage.setItem("assignedWork", JSON.stringify(assignedWork));
  }, [assignedWork]);

  const completedCount = assignedWork.filter((t) => t.done).length;

  // ✅ Mark Done
  const markDone = (id) => {
    setAssignedWork(
      assignedWork.map((task) =>
        task.id === id ? { ...task, done: true } : task
      )
    );
  };

  // ✏️ Enable edit
  const startEdit = (id) => {
    setAssignedWork(
      assignedWork.map((task) =>
        task.id === id ? { ...task, editing: true } : task
      )
    );
  };

  // 💾 Save edit
  const saveEdit = (id, newTitle) => {
    setAssignedWork(
      assignedWork.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, editing: false }
          : task
      )
    );
  };

  // ❌ Cancel edit
  const cancelEdit = (id) => {
    setAssignedWork(
      assignedWork.map((task) =>
        task.id === id ? { ...task, editing: false } : task
      )
    );
  };

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR (UNCHANGED) */}
      <aside className="sidebar">
        <h2 className="logo">Spacer</h2>
        <nav>
          <p>Dashboard</p>
          <p>Analytics</p>
          <p>Tasks</p>
          <p>Profile</p>
        </nav>
        <button className="logout-btn">Logout</button>
      </aside>

      {/* MAIN */}
      <main className="dashboard-content">
        <h1>Dashboard Overview</h1>

        <div className="card-grid">
          <div className="card">
            <h3>Analytics</h3>
            <p>Tasks Completed: {completedCount}</p>
            <p>Status: {user.status}</p>
          </div>

          <div className="card">
            <h3>Profile</h3>
            <p>Name: {user.name}</p>
            <p>Role: {user.role}</p>
          </div>

          <div className="card">
            <h3>Tasks</h3>
            <button className="primary-btn">Complete Task</button>
          </div>
        </div>

        {/* ✅ ASSIGNED WORK (NOW EDITABLE) */}
        <section className="assigned-work">
          <h2>Assigned Work</h2>

          {assignedWork.map((task) => (
            <div className="work-item" key={task.id}>
              {/* TITLE / INPUT */}
              {task.editing ? (
                <input
                  className="edit-input"
                  defaultValue={task.title}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveEdit(task.id, e.target.value);
                    }
                  }}
                />
              ) : (
                <span className="work-title">{task.title}</span>
              )}

              {/* STATUS */}
              <span className={`status ${task.done ? "done" : "pending"}`}>
                {task.done ? "Done ✔" : "Pending ⏳"}
              </span>

              {/* ACTIONS */}
              <div className="actions">
                {!task.done && !task.editing && (
                  <button
                    className="mark-btn"
                    onClick={() => markDone(task.id)}
                  >
                    Mark Done
                  </button>
                )}

                {!task.editing && (
                  <button
                    className="edit-btn"
                    onClick={() => startEdit(task.id)}
                  >
                    Edit
                  </button>
                )}

                {task.editing && (
                  <>
                    <button
                      className="save-btn"
                      onClick={(e) =>
                        saveEdit(
                          task.id,
                          e.target
                            .closest(".work-item")
                            .querySelector(".edit-input").value
                        )
                      }
                    >
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => cancelEdit(task.id)}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
