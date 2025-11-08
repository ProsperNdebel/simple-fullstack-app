import React, { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "./api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'
  const [showCompleted, setShowCompleted] = useState(true);
  const [error, setError] = useState("");

  const completedCount = tasks.filter(t => t.completed).length;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await addTask(newTask);
      setTasks([...tasks, res.data]);
      setNewTask("");
      setError("");
    } catch (error) {
      setError("Failed to add task. Please try again.");
      console.error("Error adding task:", error);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      const res = await updateTask(id, { completed: !completed });
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
    } catch (error) {
      setError("Failed to update task. Please try again.");
      console.error("Error toggling task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      setError("Failed to delete task. Please try again.");
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSaveEdit = async (id) => {
    if (!editText.trim()) return;
    try {
      const res = await updateTask(id, editText);
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
      setEditingId(null);
      setEditText("");
    } catch (error) {
      setError("Failed to update task. Please try again.");
      console.error("Error updating task:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleEditKeyPress = (e, id) => {
    if (e.key === "Enter") {
      handleSaveEdit(id);
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <header>
        <h1 className="app-title">
          📝 Task Manager
        </h1>
        
        {/* Task Stats */}
        {tasks.length > 0 && (
          <div className="task-stats">
            <div className="stat-item">
              <span className="stat-number">{tasks.length}</span>
              <span className="stat-label">Total Tasks</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{completedCount}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}
      </header>

      <div className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder="What needs to be done?"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary" onClick={handleAddTask}>
          ➕ Add Task
        </button>
      </div>

      <div className="filter-controls">
        <button
          className={`btn btn-small ${filter === "all" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`btn btn-small ${filter === "active" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`btn btn-small ${filter === "completed" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <div className="empty-state-title">No tasks yet!</div>
          <div className="empty-state-text">
            {filter === "all" 
              ? "Add your first task to get started"
              : `No ${filter} tasks`
            }
          </div>
        </div>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((t) => (
            <li key={t.id} className={`task-item ${t.completed ? "completed" : ""}`}>
              {editingId === t.id ? (
                <>
                  <div className="task-content">
                    <input
                      type="text"
                      className="edit-input"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => handleEditKeyPress(e, t.id)}
                      autoFocus
                    />
                  </div>
                  <div className="task-actions">
                    <button
                      className="btn btn-success btn-small"
                      onClick={() => handleSaveEdit(t.id)}
                    >
                      ✓ Save
                    </button>
                    <button
                      className="btn btn-secondary btn-small"
                      onClick={handleCancelEdit}
                    >
                      ✕ Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="task-content">
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        className="task-checkbox"
                        checked={t.completed}
                        onChange={() => handleToggleComplete(t.id, t.completed)}
                      />
                    </div>
                    <span className={`task-text ${t.completed ? "completed" : ""}`}>
                      {t.text}
                    </span>
                  </div>
                  <div className="task-actions">
                    <button
                      className="btn btn-warning btn-small"
                      onClick={() => handleEdit(t.id, t.text)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-danger btn-small"
                      onClick={() => handleDelete(t.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
