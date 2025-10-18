const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Импортируем модель для синхронизации
const Todo = require('./models/Todo');

// Маршруты
app.use('/api/todos', require('./routes/todoRoutes'));

// Тестовый маршрут
app.get('/', (req, res) => {
  res.json({ message: 'Todo Backend с PostgreSQL работает!' });
});

// Синхронизация с БД и запуск сервера
const startServer = async () => {
  try {
    // Синхронизируем модель с БД (создает таблицу если её нет)
    await Todo.sync();
    console.log('✅ Таблица Todos синхронизирована');
    
    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Ошибка запуска сервера:', error);
  }
};

startServer();