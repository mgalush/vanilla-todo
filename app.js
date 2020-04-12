window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  let newTodoText = document.querySelector('.new-todo');
  let list = document.querySelector('.todo-list');
  let addNewButton = document.querySelector('.add-new');

  // creates new todo
  addNewButton.addEventListener('click', () => {
    //create new todo
    let newTodo = document.createElement('li');
    newTodo.innerText = newTodoText.value;

    // create delete button for new todo
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';

    // add delete button to new todo
    newTodo.appendChild(deleteButton);

    // shows new todo to user
    list.appendChild(newTodo);
  });
});
