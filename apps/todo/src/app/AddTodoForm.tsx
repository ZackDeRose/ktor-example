import { createTodo } from '@ktor-example/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

function useAddTodoMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onSettled: () => {
      client.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export function AddTodoForm() {
  const [title, setNewTodoName] = useState('');
  const { mutate } = useAddTodoMutation();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    mutate(title);
    setNewTodoName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(event) => {
          setNewTodoName(event.target.value);
        }}
        value={title}
      />

      <button type="submit">Add</button>
    </form>
  );
}
