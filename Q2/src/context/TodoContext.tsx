import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import type { Todo } from '../types/todo';

const API_URL = 'http://localhost:5024/api/todos';

interface TodoContextType {
  todos: Todo[];
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<boolean>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<boolean>;
  deleteTodo: (id: string) => Promise<boolean>;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setTodos(data);
      }
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (title: string) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false }),
      });
      if (res.ok) {
        const newTodo = await res.json();
        setTodos((prev) => [...prev, newTodo]);
        return true;
      }
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
    return false;
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      const targetTodo = todos.find(t => t.id === id);
      if (!targetTodo) return false;

      const updatedTodoData = { ...targetTodo, ...updates };
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodoData),
      });

      if (res.ok || res.status === 204) {
        // Bug Fix 2: Used map instead of filter for updates
        setTodos((prev) => prev.map(t => t.id === id ? { ...t, ...updates } : t));
        return true;
      }
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
    return false;
  };

  const deleteTodo = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok || res.status === 204) {
        // Bug Fix 1: Defective filter logic fixed (ID vs Title mismatch)
        setTodos((prev) => prev.filter(t => t.id !== id));
        return true;
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
    return false;
  };

  return (
    <TodoContext.Provider value={{ todos, fetchTodos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
