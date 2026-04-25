import React from 'react';
import { AddTodoForm } from '../components/AddTodoForm';
import { TodoList } from '../components/TodoList';

export const TodoPage = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <header className="text-center mb-6">
        <h1 className="text-accent" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Your Tasks</h1>
        <p className="text-secondary">Stay organized, focused, and get things done.</p>
      </header>
      
      <AddTodoForm />
      <TodoList />
    </div>
  );
};
