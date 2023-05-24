// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TodoList } from './ToDoList';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AddTodoForm } from './AddTodoForm';

const client = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={client}>
      <h1>My ToDo Application</h1>
      <AddTodoForm />
      <TodoList />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
