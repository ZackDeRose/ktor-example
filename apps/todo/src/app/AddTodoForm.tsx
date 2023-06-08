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
        className="shadow appearance-none border rounded ml-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        onChange={(event) => {
          setNewTodoName(event.target.value);
        }}
        value={title}
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
      >
        Add
      </button>
    </form>
  );
}
