const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');

// GET /api/todos - все задачи
router.get('/', getAllTodos);

// POST /api/todos - создать задачу
router.post('/', createTodo);

// PUT /api/todos/:id - обновить задачу
router.put('/:id', updateTodo);

// DELETE /api/todos/:id - удалить задачу
router.delete('/:id', deleteTodo);

module.exports = router;