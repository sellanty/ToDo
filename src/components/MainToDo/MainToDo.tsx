import { useState, useEffect, useRef } from "react";
import styles from './MainToDo.module.css';
import type { ITodo } from "../../types/data";
import TodoList from "../ToDoList/TodoList";
import TodoInput from "../TodoInput/TodoInput";
import TodoActions from "../TodoActions/TodoActions";

const MainToDo = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const removeTodo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number): void => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;

        return {
          ...todo,
          completed: !todo.completed,
        };
      })
    );
  };

  const addTodos = () => {
    if (value) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: value,
          completed: false,
        },
      ]);
      setValue("");
    }
  };

  return (
    <div className={styles.main}>
    <h1>Todo App</h1>
    <div>
    <TodoInput value={value} onChange={setValue} addTodos={addTodos} autoFocus={true}/>
    <TodoActions onClick={addTodos} disabled={!value.trim()}/>
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
