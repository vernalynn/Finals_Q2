import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { TodoItem } from './TodoItem';
import { EditTodoModal } from './EditTodoModal';
import type { Todo } from '../types/todo';

export const TodoList = () => {
  const { todos } = useTodos();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  if (todos.length === 0) {
    return (
      <div className="text-center mt-8 text-secondary">
        <p>You have no tasks! Add one above to get started.</p>
      </div>
    );
  }

  return (
    <>
      <ul className="todo-list">
        {todos.map((todo) => (
          // Bug Fix 3: Using todo.id as key instead of array index
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onEdit={(t) => setEditingTodo(t)} 
          />
        ))}
      </ul>

      {editingTodo && (
        <EditTodoModal 
          todo={editingTodo} 
          onClose={() => setEditingTodo(null)} 
        />
      )}
    </>
  );
};
