import { useEffect, useState } from 'react';

type Todo = {
    id: number;
    title: string;
};

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export default TodoList;