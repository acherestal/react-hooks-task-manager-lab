import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskList({ query }) {
  const { tasks, toggleComplete } = useContext(TaskContext);

  const filtered = tasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ul>
      {filtered.map((task) => (
        <li
          key={task.id}
          className={task.completed ? "completed" : ""}
        >
          {task.title}

          <button
            className="complete-btn"
            data-testid={task.id}
            onClick={() => toggleComplete(task.id)}
          >
            {task.completed ? "Undo" : "Complete"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
