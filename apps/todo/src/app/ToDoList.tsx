import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteTodo, getTodos, toggleTodo } from '@ktor-example/api-client';
import type { ToDo } from '@ktor-example/api-client';

function useTodoQuery() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    staleTime: 10_000,
  });
}

export function TodoList() {
  const { data, status } = useTodoQuery();
  return status === 'pending' ? (
    <p>loading...</p>
  ) : status === 'error' ? (
    <p> you messed up</p>
  ) : (
    <ul>
      {data?.map((item) => (
        <TodoItem key={item.id} {...item} />
      ))}
    </ul>
  );
}

function TodoItem({ completed, title, id }: ToDo) {
  const client = useQueryClient();
  const { mutate: deleteTodoItem } = useMutation({
    mutationFn: deleteTodo,
    onSettled: () => {
      client.invalidateQueries({ queryKey: ['todos'] });
    },
  });
  const { mutate: toggle } = useMutation({
    mutationFn: toggleTodo,

    onSuccess: (newItem) => {
      client.setQueryData(['todos'], (old: ToDo[] | undefined) => {
        if (!old) return [newItem];
        return old.map((item) => {
          if (item.id === newItem.id) {
            return newItem;
          }
          return item;
        });
      });
    },
  });

  return (
    <li className="m-4">
      <input
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        type="checkbox"
        checked={!!completed}
        onClick={() => toggle(id)}
        id={`checkbox-${id}`}
      />
      <label
        htmlFor={`checkbox-${id}`}
        className="ml-2 text-sm font-medium pb-6"
      >
        {title}
      </label>
      <button
        className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded m-2"
        onClick={() => {
          deleteTodoItem(id);
        }}
      >
        Delete
      </button>
    </li>
  );
}
