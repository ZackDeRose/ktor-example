export function getTodos(): Promise<ToDo[]> {
  return fetch('/api').then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Failed to fetch todos');
  });
}

export function createTodo(title: string): Promise<ToDo> {
  return fetch('/api/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  }).then((res) => res.json());
}

export function toggleTodo(id: string): Promise<ToDo> {
  return fetch('/api/toggle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  }).then((res) => res.json());
}

export function deleteTodo(id: string): Promise<ToDo> {
  return fetch('/api', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  }).then((res) => res.json());
}

export interface ToDo {
  id: string;
  title: string;
  completed: boolean;
}

export interface CreateTodoRequestBody {
  title: string;
}

export type CreateTodoResponseBody = ToDo;

export interface ToggleTodoRequestBody {
  id: string;
}

export type ToggleTodoResponseBody = ToDo;

export type DeleteTodoRequestBody = ToggleTodoRequestBody;

export type DeleteTodoResponseBody = ToDo;
