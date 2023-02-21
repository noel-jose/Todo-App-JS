const getTodos = () => {
  let todosfromLS = JSON.parse(localStorage.getItem("todos"));
  console.log(todosfromLS);
  return todosfromLS;
};

let todos = getTodos() || [];

const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const setTodos = (todo) => {
  todos.unshift(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const saveToUI = (todos) => {
  const todosContainer = document.querySelector(".todos");
  if (todos.length != 0) {
    const todosInUI = todos.map(
      (todo) => `<div class="todo">
          <input type="checkbox" ${
            todo.completed ? "checked" : ""
          } class="todo__checkbox" onclick=markComplete(${todo.id}) />
          <div class="todo__data">
            <h4 class="todo__data__heading">${todo.name}</h4>
            <p class="todo__data__desc">${todo.desc}</p>
            <p></p>
          </div>

          <div class="todo__delete" onclick=deleteTodo(${todo.id})>
            <i class="fa fa-trash" aria-hidden="true"></i>
          </div>
        </div>`
    );
    todosContainer.innerHTML = todosInUI.join(" ");
  } else todosContainer.innerHTML = "<p>Enter a Todo </p>";
};

saveToUI(todos);

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
  // added the todo to the local storage
  setTodos(todo);
  createTodoForm.reset();
  // we are going to hide the CreateTodoForm modal
  createTodoModal.classList.toggle("showcreateTodoForm");
  // now we are going to show the updated todo list to the user
  saveToUI(todos);
});

// function to delete a todo
const deleteTodo = (id) => {
  newTodosList = todos.filter((todo) => todo.id != id);
  saveTodos(newTodosList);
  todos = getTodos();
  saveToUI(todos);
};

// function to mark an item as complete
const markComplete = (id) => {
  todos.forEach((todo) => {
    if (todo.id == id) {
      todo.completed = !todo.completed;
    }
  });
  saveTodos(todos);
  saveToUI(todos);
};
