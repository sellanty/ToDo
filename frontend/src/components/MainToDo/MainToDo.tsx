import { useState, useEffect, useRef } from "react";
import styles from './MainToDo.module.css';
import type { ITodo } from "../../types/data";
import TodoList from "../ToDoList/TodoList";
import TodoInput from "../TodoInput/TodoInput";
import TodoActions from "../TodoActions/TodoActions";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../../services/api";

const MainToDo = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔄 Загружаем задачи с бэкенда при запуске
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async (): Promise<void> => {
    try {
      setLoading(true);
      const todosData = await fetchTodos();
      setTodos(todosData);
    } catch (error) {
      console.error('Ошибка загрузки задач:', error);
      alert('Ошибка загрузки задач');
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Удаляем задачу через бэкенд
  const removeTodo = async (id: number): Promise<void> => {
    try {
      await deleteTodo(id);
      // После успешного удаления обновляем список
      await loadTodos();
    } catch (error) {
      console.error('Ошибка удаления задачи:', error);
      alert('Ошибка удаления задачи');
    }
  };

  // ✅ Отмечаем задачу выполненной через бэкенд
  const toggleTodo = async (id: number): Promise<void> => {
    try {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        await updateTodo(id, {
          completed: !todo.completed
        });
        // После успешного обновления обновляем список
        await loadTodos();
      }
    } catch (error) {
      console.error('Ошибка обновления задачи:', error);
      alert('Ошибка обновления задачи');
    }
  };

  // ➕ Добавляем задачу через бэкенд
  const addTodos = async (): Promise<void> => {
    if (value.trim()) {
      try {
        await createTodo({
          title: value,
          description: ""
        });
        setValue("");
        // После успешного добавления обновляем список
        await loadTodos();
      } catch (error) {
        console.error('Ошибка добавления задачи:', error);
        alert('Ошибка добавления задачи');
      }
    }
  };

  return (
    <div className={styles.main}>
      <h1>Todo App</h1>
      <div>
        <TodoInput 
          value={value} 
          onChange={setValue} 
          addTodos={addTodos} 
          autoFocus={true}
        />
        <TodoActions 
          onClick={addTodos} 
          disabled={!value.trim() || loading}
        />
        
        {loading && <div>Загрузка...</div>}
        
        <TodoList 
          items={todos}
          removeTodo={removeTodo}
          toggleTodo={toggleTodo}
        />
      </div>
    </div>
  );
};

export default MainToDo;