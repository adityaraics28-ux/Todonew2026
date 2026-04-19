const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Todo = require('./models/Todo');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ Could not connect to MongoDB:', err));

// Routes

// @desc Home route for health check
app.get('/', (req, res) => {
  res.send(' Aditya rai TaskFlow Backend is running...');
});

// @desc Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc Add a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// @desc Update a todo (toggle status or change text)
app.put('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    todo.text = req.body.text || todo.text;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    await todo.deleteOne();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
