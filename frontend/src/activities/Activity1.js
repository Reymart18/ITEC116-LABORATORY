import React, { useState } from "react";
import "./Activity1.css"; // custom CSS file

const colors = [
  "yellow",
  "pink",
  "green",
  "blue",
  "purple",
  "orange",
];

function Activity1() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      title: newTask,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.floor(Math.random() * 11) - 5, // -5 to 5 degrees
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEdit = (task) => {
    setEditTaskId(task.id);
    setEditTaskText(task.title);
  };

  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: editTaskText } : task
      )
    );
    setEditTaskId(null);
    setEditTaskText("");
  };

  return (
    <div className="container">
      <h1>Activity 1 - To-Do List</h1>

      <div className="input-container">
        <input
          type="text"
          value={newTask}
          placeholder="Add a new task..."
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="tasks-container">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task-note ${task.color}`}
            style={{ transform: `rotate(${task.rotation}deg)` }}
          >
            {editTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                  className="edit-input"
                />
                <button onClick={() => saveEdit(task.id)} className="save-btn">
                  Save
                </button>
              </>
            ) : (
              <>
                <p>{task.title}</p>
                <div className="task-buttons">
                  <button onClick={() => startEdit(task)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activity1;
