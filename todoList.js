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
    for (let todo of this.todoList) {
      this.renderTodo(todo.name, todo.id);
    }
  };

  renderTodo = (todoName, todoId) => {
    //create new todo
    let newTodo = document.createElement('li');
    newTodo.innerText = todoName;

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

  addNewButtonClick = async (event) => {
    // stop page refresh on form submission
    event.preventDefault();

    // add to DB
    const todo = await this.addTodoToDB(this.newTodoText.value);

    // add new todo to todoList
    this.todoList.push(todo);

    this.renderTodo(todo.name, todo.id);

    this.form.reset();
  };

  // add new todo to database
  addTodoToDB = async (todoName) => {
    const response = await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: todoName }),
    });
    const newTodo = await response.json();
    return newTodo;
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
