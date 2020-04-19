import TodoList from './todoList.js';

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  const todoList = new TodoList();
  todoList.init();
});
