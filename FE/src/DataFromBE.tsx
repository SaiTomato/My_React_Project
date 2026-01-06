import { useEffect, useState } from "react";

type Todo = {
    id: number;
    title: string;
};
function RequestToBE(){
    const [Todos, setTodos] = useState<Todo[]>([])
    useEffect(() => {
        fetch('/api/todos')
            .then(res => res.json())
            .then(setTodos);
    }, []);

    return <>
        {Todos.map(todo=>(
            <div key={todo.id}>
                <h2>{todo.id}) {todo.title}</h2>
            </div>
        ))}
    </>
}

export default RequestToBE