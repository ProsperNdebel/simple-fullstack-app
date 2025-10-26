import React, { useEffect, useState } from "react";
import { getTasks, addTask, updateTask } from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleAdd = async () => {
    if (!newTask.trim()) return;
    await addTask(newTask);
    setNewTask("");
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.task);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleUpdate = async (id) => {
    if (!editText.trim()) return;
    try {
      await updateTask(id, editText);
      setEditingId(null);
      setEditText("");
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ margin: "2rem" }}>
      <h2>Simple Fullstack App</h2>
      <input
        type="text"
        placeholder="Enter a task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {tasks.map((t) => (
          <li key={t.id} style={{ marginBottom: "10px" }}>
            {editingId === t.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ marginRight: "5px" }}
                />
                <button onClick={() => handleUpdate(t.id)}>Save</button>
                <button onClick={cancelEdit} style={{ marginLeft: "5px" }}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{t.task}</span>
                <button
                  onClick={() => startEdit(t)}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
