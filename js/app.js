const getTodos = () => {
  let todosfromLS = JSON.parse(localStorage.getItem("todos"));
  console.log(todosfromLS);  
  return todosfromLS;
};

let todos = getTodos() || [];

const setTodos = (todo) => {
  todos.unshift(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

addTodoButton = document.querySelector(".header__button");
createTodoModal = document.querySelector(".modal");

// function to show the modal
addTodoButton.addEventListener("click", () => {
  console.log(createTodoModal.classList.toggle("showcreateTodoForm"));
});
//accessing the form to create todo
const createTodoForm = document.querySelector(".todo__create");

// function to perform when we submit the form
createTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let todo = {};
  todo.id = new Date().getTime();
  todo.name = createTodoForm.elements[0].value;
  todo.desc = createTodoForm.elements[1].value;
  todo.completed = false;
  console.log(todo);
  setTodos(todo);

  // added the todo to the
});

const title = document.getElementById("title");

const formSubmit = (todo, setTodo) => {};
