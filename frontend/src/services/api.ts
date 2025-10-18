import type { ITodo } from '../types/data';

const API_URL = "http://localhost:5000";

// 📝 Функции для работы с задачами (Todo)
export async function fetchTodos(): Promise<ITodo[]> {
  try {
    const response = await fetch(`${API_URL}/api/todos`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const todos: ITodo[] = await response.json();
    return todos;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

export async function createTodo(todoData: { title: string; description?: string }): Promise<ITodo> {
  try {
    const response = await fetch(`${API_URL}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const newTodo: ITodo = await response.json();
    return newTodo;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
}

export async function updateTodo(id: number, todoData: Partial<ITodo>): Promise<ITodo> {
  try {
    const response = await fetch(`${API_URL}/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const updatedTodo: ITodo = await response.json();
    return updatedTodo;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
}

export async function deleteTodo(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/todos/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}
