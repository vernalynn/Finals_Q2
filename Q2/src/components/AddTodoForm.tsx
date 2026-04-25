import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTodos } from '../hooks/useTodos';
import { PlusCircle } from 'lucide-react';

interface FormData {
  title: string;
}

export const AddTodoForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const { addTodo, todos } = useTodos();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const activeCount = todos.filter(t => !t.completed).length;
  const isAtCapacity = activeCount >= 5;

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const success = await addTodo(data.title);
    setIsSubmitting(false);
    if (success) {
      reset();
    }
  };

  return (
    <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <input
            {...register('title', { 
              required: 'Task title is required',
              minLength: { value: 3, message: 'Title must be at least 3 characters' }
            })}
            placeholder={isAtCapacity ? "Capacity reached" : "What needs to be done?"}
            className="input"
            disabled={isSubmitting || isAtCapacity}
          />
          {errors.title && <div className="error-text">{errors.title.message}</div>}
          {isAtCapacity && <div className="error-text" style={{ marginTop: '0.5rem', color: 'var(--danger)' }}>Max 5 active tasks allowed. Please complete a task first.</div>}
        </div>
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={isSubmitting || isAtCapacity}
          style={{ height: '3.1rem' }}
        >
          <PlusCircle size={20} />
          <span>Add</span>
        </button>
      </form>
    </div>
  );
};
