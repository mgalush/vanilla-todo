export default class Todo {
  newTodoText = document.querySelector('.new-todo');
  list = document.querySelector('.todo-list');
  addNewButton = document.querySelector('.add-new');

  constructor() {
    // creates new todo
    this.addNewButton.addEventListener('click', () => {
      //create new todo
      let newTodo = document.createElement('li');
      newTodo.innerText = this.newTodoText.value;

      // create delete button for new todo
      let deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';

      // add delete button to new todo
      newTodo.appendChild(deleteButton);

      // shows new todo to user
      this.list.appendChild(newTodo);
    });
  }
}
