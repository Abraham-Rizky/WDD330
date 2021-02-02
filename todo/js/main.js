import Tasks from './todo.js';

//on load, grab the array and insert it into the page
const myTask = new Tasks('tasks');
window.addEventListener('load', () => {
  myHike.showTaskList();
});
