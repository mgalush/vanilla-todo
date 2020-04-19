export default class TodoList {
  newTodoText = document.querySelector('.new-todo');
  list = document.querySelector('.todo-list');
  todoList;
  form = document.getElementById('todoList-form');

  init = async () => {
    // creates new todo
    this.form.addEventListener('submit', this.addNewButtonClick);
    this.todoList = await this.loadTodos();
    // load todo from API
    for(let todo of this.todoList) {
      this.renderTodo(todo.name, todo.id);
    } 
  }

  renderTodo = (task, todoId) => {
    //create new todo
    let newTodo = document.createElement('li');
    newTodo.innerText = task;

    // create delete button for new todo
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    // add event listener to delete button of todo
    deleteButton.addEventListener('click', (event) => {
      this.deleteTodoFromDOM(newTodo);
      this.deleteTodoFromDB(todoId);
    });

    // add delete button to new todo
    newTodo.appendChild(deleteButton);

    // shows new todo to user
    this.list.appendChild(newTodo);
  };

  addNewButtonClick = (event) => {
    // stop page refresh on form submission
    event.preventDefault();

    // add new todo to todoList
    this.todoList.push(this.newTodoText.value);

    // determine where in array the todo index is stored
    let index = this.todoList.length - 1;

    this.renderTodo(this.newTodoText.value, index);

    this.saveTodos();
    this.form.reset();
  };

  // delete todo from DOM
  deleteTodoFromDOM = (todoElement) => {
    const index = [...this.list.children].indexOf(todoElement);
    // delete from array
    this.todoList.splice(index, 1);
    // delete from DOM
    todoElement.remove();
  };

  // delete todo from database
  deleteTodoFromDB = async (todoId) => {
    const response = await fetch('http://localhost:3000/' + todoId, {
      method: 'DELETE',
    });
    return;
  };

  // load todos from API
  loadTodos = async () => {
    const response = await fetch('http://localhost:3000');
    const todoList = await response.json();
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