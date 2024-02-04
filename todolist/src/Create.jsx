// Create.jsx
import React, { useState } from 'react';

function Create({ onAdd }) {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    /* Check if task is not empty */
    if (task.trim() !== '') {
      /* Call the onAdd function with the new task */
      onAdd(task);
      /* Clear the input field after adding task */
      setTask('');
    }
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter a Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add Task
      </button>
    </div>
  );
}

export default Create;
