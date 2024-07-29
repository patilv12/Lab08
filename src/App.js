import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { text: inputValue, isEditing: false }]);
      setInputValue('');
    }
  };

  const handleInputChange = (e) => setInputValue(e.target.value);

  const toggleEdit = (index) => {
    setTasks(tasks.map((task, idx) => idx === index ? { ...task, isEditing: !task.isEditing } : task));
  };

  const handleEditChange = (e, index) => {
    setTasks(tasks.map((task, idx) => idx === index ? { ...task, text: e.target.value } : task));
  };

  const saveEdit = (index) => {
    setTasks(tasks.map((task, idx) => idx === index ? { ...task, isEditing: false } : task));
  };

  const deleteTask = (index) => setTasks(tasks.filter((_, idx) => idx !== index));

  return (
    <div className="container">
      <div className="App">
        <h1>To-Do List</h1>
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Add a new task" />
        <button onClick={addTask}>Add Task</button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task.isEditing ? (
                <input type="text" value={task.text} onChange={(e) => handleEditChange(e, index)} />
              ) : (
                <span>{task.text}</span>
              )}
              <button onClick={() => task.isEditing ? saveEdit(index) : toggleEdit(index)}>
                {task.isEditing ? 'Save' : 'Edit'}
              </button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;