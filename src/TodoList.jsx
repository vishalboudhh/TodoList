import React, { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState(["Todo List"]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState("");

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  function handleEditChange(e) {
    setEditTask(e.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks(t => [...t, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setEditIndex(null); // Reset edit index if a task is deleted
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) { // Update condition to prevent going out of bounds
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function startEditing(index) {
    setEditIndex(index);
    setEditTask(tasks[index]); // Pre-fill the edit input with the task's current value
  }

  function updateTask(index) {
    if (editTask.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[index] = editTask; // Update the task at the specified index
      setTasks(updatedTasks);
      setEditIndex(null); // Reset edit index after updating
      setEditTask(""); // Clear the edit input
    }
  }

  return (
    <div className='todo-list'>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder='Enter a task...'
          value={newTask}
          onChange={handleInputChange}
        />
        <button className='add-button' onClick={addTask}>
          Add
        </button>
      </div>
      <ol>
        {tasks.map((task, index) =>
          <li key={index}>
            {editIndex === index ? ( // Conditional rendering based on editIndex
              <>
                <input
                  type="text"
                  value={editTask}
                  onChange={handleEditChange}
                  placeholder="Edit task..."
                />
                <button className='edit-button' onClick={() => updateTask(index)}>Save</button>
              </>
            ) : (
              <>
                <span className='text'>{task} </span>
                <button className='edit-button' onClick={() => startEditing(index)}>Edit</button>
              </>
            )}
            <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>
            <button className='move-button' onClick={() => moveTaskUp(index)}>Up</button>
            <button className='move-button' onClick={() => moveTaskDown(index)}>Down</button>
          </li>
        )}
      </ol>
    </div>
  );
}

export default TodoList;
