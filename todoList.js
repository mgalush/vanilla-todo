export default class TodoList {
  newTodoText = document.querySelector('.new-todo');
  list = document.querySelector('.todo-list');
  addNewButton = document.querySelector('.add-new');
  todoList;

  constructor() {
    // creates new todo
    this.addNewButton.addEventListener('click', this.addNewButtonClick);
    this.todoList = this.loadTodos();
    this.todoList.forEach( (task, index) => {
      this.renderTodo(task, index);
    });
  }

  renderTodo = (task, index) => {
    //create new todo
    let newTodo = document.createElement('li');
    newTodo.innerText = task;

    // create delete button for new todo
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    // add event listener to delete button of todo
    deleteButton.addEventListener('click', (event) => {
      this.deleteTodo(newTodo, index);
    });

    // add delete button to new todo
    newTodo.appendChild(deleteButton);

    // shows new todo to user
    this.list.appendChild(newTodo);
  };

  addNewButtonClick = () => {
    // add new todo to todoList
    this.todoList.push(this.newTodoText.value);

    // determine where in array the todo index is stored
    let index = this.todoList.length - 1;

    this.renderTodo(this.newTodoText.value, index);

    this.saveTodos();
  };

  // NOTE TO SELF: todoElement is arbitrary argument
  deleteTodo = (todoElement, index) => {
    console.log(index);
    // delete from array
    this.todoList.splice(index, 1);
    // delete from DOM
    todoElement.remove();
    this.saveTodos();
  };

  // load todos already in the array and return any arrays that exist in local storage
  loadTodos = () => {
    const todoList = JSON.parse(localStorage.getItem('todoList'));
    if (!todoList) {
      return [];
    }
    return todoList;
  };

  // save entire todo list
  saveTodos = () => {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  };
}
