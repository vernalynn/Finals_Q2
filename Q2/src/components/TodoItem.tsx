import React, { useEffect } from 'react';
import type { Todo } from '../types/todo';
import { useTodos } from '../hooks/useTodos';
import { Edit2, Trash2, Check, Lock } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

export const TodoItem = ({ todo, onEdit }: TodoItemProps) => {
  const { todos, updateTodo, deleteTodo } = useTodos();

  const activeTodos = todos.filter(t => !t.completed);
  const isNextInLine = activeTodos.length > 0 && activeTodos[0].id === todo.id;
  const canToggle = todo.completed || isNextInLine;

  useEffect(() => {
    if (todo.completed) {
      const timer = setTimeout(() => {
        deleteTodo(todo.id);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [todo.completed, todo.id, deleteTodo]);

  const handleToggle = () => {
    if (!canToggle) {
      alert("Sequential Integrity Constraint: You must complete your oldest active task first!");
      return;
    }
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTodo(todo.id);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <div 
          className={`checkbox ${todo.completed ? 'checked' : ''}`} 
          onClick={handleToggle}
          style={{ cursor: canToggle ? 'pointer' : 'not-allowed', opacity: canToggle ? 1 : 0.5 }}
          title={!canToggle ? "Complete oldest task first" : ""}
        >
          {todo.completed && <Check size={14} strokeWidth={3} />}
          {!canToggle && !todo.completed && <Lock size={12} strokeWidth={2} style={{ color: 'var(--text-secondary)' }} />}
        </div>
        <span className="todo-title" style={{ fontSize: '1.1rem' }}>
          {todo.title}
        </span>
      </div>
      <div className="todo-actions">
        <button 
          onClick={() => onEdit(todo)} 
          className="btn-icon" 
          title="Edit Task"
        >
          <Edit2 size={18} />
        </button>
        <button 
          onClick={handleDelete} 
          className="btn-icon btn-danger" 
          title="Delete Task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
};
