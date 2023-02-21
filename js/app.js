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
          <div class="todo__data" onclick=openEditForm(${todo.id})>
            <h4 class="todo__data__heading ${
              todo.completed ? " strike" : ""
            }" > ${todo.name} </h4>

            <p class="todo__data__desc ${todo.completed ? " erase" : ""}" > ${
        todo.desc
      }</p>
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
  todos = sortTodos(todos);
  saveTodos(todos);
  saveToUI(todos);
};

// funtion to sort the todos based on the completed status
const sortTodos = (todos) => {
  todos.sort((a, b) => a.completed - b.completed);
  return todos;
};

modal1 = document.querySelector(".modal1");
editForm = modal1.firstElementChild;


// function to open the modal to edit the selected item
const openEditForm = (id) => {
  console.log("Open Edit form function called for " + id);
  
  console.log(modal1);
  const todotoEdit = todos.find((todo) => todo.id == id);
  console.log(todotoEdit);
  // shows the edit form 
  modal1.classList.toggle("showEditForm");
  //injects the current value of the selected todo
  editForm.elements[0].value = todotoEdit.name;
  editForm.elements[1].value = todotoEdit.desc;
  editForm.elements[2].value = todotoEdit.id
};

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // reading values from the user submitted form
  let newname = editForm.elements[0].value;
  let newdesc = editForm.elements[1].value;
  let idtoEdit = editForm.elements[2].value;
  // creating a new todo list with the updated values 
  let newTodos = todos.map((todo) =>
    todo.id == idtoEdit ? { ...todo, name: newname, desc: newdesc } : todo
  );
  // saving the new todos to the local storage
  saveTodos(newTodos);
  // fetching the new todos
  todos = getTodos();
  // saving the newly fetched todos to the UI
  saveToUI(todos);
  // resetting the editForm
  editForm.reset();
  // closing the editform
  modal1.classList.toggle("showEditForm");
});
