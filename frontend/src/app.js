import React, { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "./api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTask.trim()) {
      try {
        await addTask(newTask);
        setNewTask("");
        fetchTasks();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const toggleTaskCompletion = async (task) => {
    try {
      await updateTask(task.id, !task.completed);
      fetchTasks();
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.task);
  };

  const handleSaveEdit = async (id) => {
    if (editText.trim()) {
      try {
        await updateTask(id, editText);
        setEditingId(null);
        setEditText("");
        fetchTasks();
      } catch (error) {
        console.error("Error updating task:", error);
      }
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

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="app-container">
      <h1 className="app-title">📝 Task Manager</h1>

      <div className="add-task-form">
        <input
          type="text"
          className="task-input"
          placeholder="What needs to be done? ✨"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary" onClick={handleAddTask}>
          ➕ Add Task
        </button>
      </div>

      <div className="tasks-header">
        <span>Your Tasks</span>
        {totalCount > 0 && (
          <span className="task-count">
            {completedCount}/{totalCount}
          </span>
        )}
      </div>

      {loading ? (
        <div className="loading">Loading tasks... ⏳</div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🎯</div>
          <div className="empty-state-text">No tasks yet!</div>
          <div className="empty-state-subtext">
            Add your first task to get started
          </div>
        </div>
      ) : (
        <ul className="tasks-list">
          {tasks.map((t) => (
            <li key={t.id} className="task-item">
              <input
                type="checkbox"
                className="task-checkbox"
                checked={t.completed}
                onChange={() => toggleTaskCompletion(t)}
              />

              {editingId === t.id ? (
                <div className="task-content">
                  <input
                    type="text"
                    className="task-edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => handleEditKeyPress(e, t.id)}
                    autoFocus
                  />
                  <div className="task-actions">
                    <button
                      className="btn btn-success btn-small"
                      onClick={() => handleSaveEdit(t.id)}
                    >
                      ✓ Save
                    </button>
                    <button
                      className="btn btn-cancel btn-small"
                      onClick={handleCancelEdit}
                    >
                      ✕ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span className={`task-text ${t.completed ? "completed" : ""}`}>
                    {t.task}
                  </span>
                  <div className="task-actions">
                    <button
                      className="btn btn-secondary btn-small"
                      onClick={() => startEdit(t)}
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
