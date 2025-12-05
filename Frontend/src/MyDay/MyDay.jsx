import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyDay() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  // Get all tasks
  useEffect(() => {
    axios
      .get("http://localhost:2000/api")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Add new task
  const addTask = () => {
    if (!task.trim()) return;
    axios
      .post("http://localhost:2000/api", { task })
      .then((res) => {
        setTodos((prev) => [...prev, res.data]);
        setTask("");
      })
      .catch((err) => console.log(err));
  };

  // For delete task
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:2000/api/delete/${id}`)
      .then(() => {
        setTodos((prev) => prev.filter((t) => t._id !== id));
      })
      .catch((err) => console.log(err));
  };

  //For update task
  const updateTask = (id) => {
    const newTask = prompt("Enter new task:");
    if (!newTask) return;

    axios
      .put(`http://localhost:2000/api/update/${id}`, { task: newTask })
      .then((res) => {
        setTodos((prev) =>
          prev.map((t) => (t._id === id ? res.data : t))
        );
      })
      .catch((err) => console.log(err));
  };

  // for mark complete or not
  const completeTask = (id) => {
    axios
      .patch(`http://localhost:2000/api/complete/${id}`)
      .then((res) => {
        setTodos((prev) =>
          prev.map((t) => (t._id === id ? res.data : t))
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      <h1>My Todo List</h1>

      
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add task..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={addTask}>Add</button>
      </div>

     
      <ul style={{ marginTop: 20 }}>
        {todos.map((todo) => (
          <li
            key={todo._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
              textDecoration: todo.isComplete ? "line-through" : "none",
            }}
          >
            {todo.task}

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => completeTask(todo._id)}>Done</button>
              <button onClick={() => updateTask(todo._id)}>Edit</button>
              <button onClick={() => deleteTask(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
