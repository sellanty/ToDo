const Todo = require('../models/Todo');

// Получить все задачи
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Создать новую задачу
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await Todo.create({ title, description });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Обновить задачу
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }

    await todo.update({ title, description, completed });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Удалить задачу
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }

    await todo.destroy();
    res.json({ message: 'Задача удалена' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo
};