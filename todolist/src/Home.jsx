// Home.jsx
import React, { useState } from 'react';
import Create from './Create';
import './App.css'; /* Import the CSS file */

function Home() {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null); /* Track which task is being edited*/
  const [editedTask, setEditedTask] = useState(''); /* Track the edited task text*/

  const handleAdd = (task) => {
    /* Update the todo list with the new task */
    setTodos([...todos, { id: Date.now(), task, completed: false }]);
  };

  const handleDelete = (id) => {
    /* Filter out the task with the given id */
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleToggleComplete = (id) => {
    /* Toggle the completed status of the task with the given id */
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleEdit = (id, newTask) => {
    /* Update the task with the given id with the new task */
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: newTask }; /* Do not reset editing flag here*/
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleEditStart = (id, task) => {
    /* Start editing the task with the given id*/
    setEditingId(id);
    setEditedTask(task); /* Set the initial edited task value*/
  };

  const handleEditConfirm = (id) => {
    /* Confirm editing and update the task*/
    handleEdit(id, editedTask);
    setEditingId(null); /* Exit edit mode*/
  };

  const handleEditCancel = () => {
    /* Cancel editing and exit edit mode*/
    setEditingId(null);
  };

  return (
    <div className="home">
      <h2> Todo List </h2>
      <Create onAdd={handleAdd} />
      {todos.length === 0 ? (
        <div>
          <h2>No Tasks</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div key={todo.id} className={`task-container ${todo.completed ? 'completed' : ''}`}>
            <div className="task-content">
              {editingId === todo.id ? (
                <div>
                  <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                  />
                  <button onClick={() => handleEditConfirm(todo.id)}>Confirm</button>
                  <button onClick={handleEditCancel}>Cancel</button>
                </div>
              ) : (
                <span className={todo.completed ? 'completed-task' : ''}>{todo.task}</span>
              )}
            </div>
            <div className="task-buttons">
              <button onClick={() => handleToggleComplete(todo.id)} className="complete-button">✓</button>
              <button onClick={() => handleDelete(todo.id)} className="delete-button">X</button>
              <button onClick={() => handleEditStart(todo.id, todo.task)} className="edit-button">Edit</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
