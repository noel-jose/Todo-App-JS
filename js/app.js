let todos = [];

const setTodos = (todo) => {
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => {
  todos = JSON.parse(localStorage.getItem("todos"));
};


addTodoButton = document.querySelector(".header__button");
createTodoModal = document.querySelector(".modal");

addTodoButton.addEventListener("click", () => {
    console.log(createTodoModal.classList.toggle("showcreateTodoForm"));
});



const title = document.getElementById("title");





const formSubmit = (todo, setTodo) => {

};
