import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app">
      <h1>Simple Todo App</h1>
      
      <div className="todo-input">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      
      <ul className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-state">No tasks yet. Add a task to get started!</p>
        ) : (
          todos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                />
                <span className="todo-text">{todo.text}</span>
              </div>
              <button 
                className="delete-btn"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
      
      {todos.length > 0 && (
        <div className="todo-stats">
          <p>{todos.filter(todo => !todo.completed).length} items left</p>
        </div>
      )}
    </div>
  );
}

export default App;
