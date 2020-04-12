export default class TodoList {
  newTodoText = document.querySelector('.new-todo');
  list = document.querySelector('.todo-list');
  addNewButton = document.querySelector('.add-new');
  todoList = [];

  constructor() {
    // creates new todo
    this.addNewButton.addEventListener('click', this.createTodo);
  }

  createTodo = () => {
    //create new todo
    let newTodo = document.createElement('li');
    newTodo.innerText = this.newTodoText.value;

    // add new todo to todoList
    this.todoList.push(this.newTodoText.value);

    // determine whre in array the todo index is stored
    let index = this.todoList.length - 1;

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

  // NOTE TO SELF: todoElement is arbitrary argument
  deleteTodo = (todoElement, index) => {
    // delete from array
    this.todoList.splice(index, 1);
    console.log(this.todoList);
    // delete from DOM
    todoElement.remove();
  };
}
