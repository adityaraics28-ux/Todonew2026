import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const API_URL = `${BASE_URL}/api/todos`;

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Fetch todos on load
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await axios.post(API_URL, { text });
      setTodos([res.data, ...todos]);
      setText('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, { completed: !completed });
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error('Error toggling complete:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.text);
  };

  const saveEdit = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, { text: editText });
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
      setEditingId(null);
    } catch (err) {
      console.error('Error saving edit:', err);
    }
  };

  return (
    <div className="container">
      <h1>Aditya rai TaskFlow</h1>
      
      <div className="card">
        <form onSubmit={addTodo} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="btn-primary">
            Add Task
          </button>
        </form>

        {loading ? (
          <div className="empty-state">Loading tasks...</div>
        ) : todos.length === 0 ? (
          <div className="empty-state">No tasks found. Add your first one!</div>
        ) : (
          <div className="todo-list">
            {todos.map((todo) => (
              <div key={todo._id} className="todo-item">
                <div className="todo-content">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo._id, todo.completed)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  
                  {editingId === todo._id ? (
                    <input
                      type="text"
                      className="edit-input"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={() => saveEdit(todo._id)}
                      onKeyDown={(e) => e.key === 'Enter' && saveEdit(todo._id)}
                      autoFocus
                      style={{ margin: 0, padding: '4px 8px' }}
                    />
                  ) : (
                    <span 
                      className={`todo-text ${todo.completed ? 'completed' : ''}`}
                      onDoubleClick={() => startEdit(todo)}
                    >
                      {todo.text}
                    </span>
                  )}
                </div>

                <div className="todo-actions">
                  <button 
                    className="btn-icon" 
                    onClick={() => startEdit(todo)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button 
                    className="btn-icon delete" 
                    onClick={() => deleteTodo(todo._id)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
