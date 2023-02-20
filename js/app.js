let todos = [];

const setTodos = (todo) =>{
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

const getTodos = () =>{
    todos = JSON.parse(localStorage.getItem("todos"));
}



