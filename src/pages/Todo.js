import React, { useState } from "react";
import "./Todo.css";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim()) {
      const newTaskItem = {
        text: newTask,
        createdAt: new Date().toLocaleString(),
        completed: false,
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask("");
    }
  };

  // Function to delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Function to toggle task completion
  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to start editing a task
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index].text);
  };

  // Function to handle editing input change
  const handleEditChange = (e) => {
    setEditedTask(e.target.value);
  };

  // Function to save the edited task
  const saveEdit = () => {
    if (editedTask.trim()) {
      const updatedTasks = tasks.map((task, i) =>
        i === editingIndex ? { ...task, text: editedTask } : task
      );
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditedTask("");
    }
  };

  // Function to cancel editing
  const cancelEdit = () => {
    setEditingIndex(null);
    setEditedTask("");
  };

  return (
    <div className="todo">
      <h2>To-Do List</h2>
      <div className="task-input">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Table for displaying tasks */}
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className={task.completed ? "completed" : ""}>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedTask}
                    onChange={handleEditChange}
                  />
                ) : (
                  task.text
                )}
              </td>
              <td>{task.createdAt}</td>
              <td>
                <button onClick={() => toggleCompletion(index)}>
                  {task.completed ? "Undo" : "Complete"}
                </button>
              </td>
              <td>
                {editingIndex === index ? (
                  <>
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(index)}>Edit</button>
                    <button onClick={() => deleteTask(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Todo;
