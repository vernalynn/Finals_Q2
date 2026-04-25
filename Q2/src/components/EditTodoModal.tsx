import React, { useState, useEffect } from 'react';
import { useTodos } from '../hooks/useTodos';
import type { Todo } from '../types/todo';

interface EditTodoModalProps {
  todo: Todo | null;
  onClose: () => void;
}

export const EditTodoModal = ({ todo, onClose }: EditTodoModalProps) => {
  const [title, setTitle] = useState('');
  const { updateTodo } = useTodos();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
    }
  }, [todo]);

  if (!todo) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || title === todo.title) {
      onClose();
      return;
    }

    setIsSubmitting(true);
    const success = await updateTodo(todo.id, { title });
    setIsSubmitting(false);
    
    if (success) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content glass">
        <div className="modal-header">
          <h3 style={{ margin: 0 }}>Edit Task</h3>
          <button onClick={onClose} className="btn-icon" style={{ padding: 0 }}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              autoFocus
              disabled={isSubmitting}
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn" style={{ background: 'transparent' }} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting || !title.trim()}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
