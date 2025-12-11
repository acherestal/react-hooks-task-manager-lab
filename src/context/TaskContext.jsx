import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Load tasks from backend (mocked in tests)
  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((r) => r.json())
      .then((data) => setTasks(data));
  }, []);

  // Add a task
  function addTask(title, id) {
    const newTask = { id, title, completed: false };

    // Update backend
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    // Update UI
    setTasks((prev) => [...prev, newTask]);
  }

  // Toggle completed state
  function toggleComplete(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    const changed = updatedTasks.find((task) => task.id === id);

    // Update backend
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: changed.completed }),
    });

    setTasks(updatedTasks);
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
}
