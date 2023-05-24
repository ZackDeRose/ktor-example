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
    <li>
      <input
        type="checkbox"
        checked={!!completed}
        onClick={() => toggle(id)}
        id={`checkbox-${id}`}
      />
      <label htmlFor={`checkbox-${id}`}>{title}</label>
      <button
        onClick={() => {
          deleteTodoItem(id);
        }}
      >
        Delete
      </button>
    </li>
  );
}
