import Tasks from './todo.js';

//on load, grab the array and insert it into the page
const myTask = new Tasks('tasks');
window.addEventListener('load', () => {
  myTask.showTaskList();
  myTask.addTabListeners();
});

const textbox = document.getElementById('textbox');
const addTask = document.getElementById('addTask');
addTask.addEventListener('click', () => {
  myTask.addToDo();
});
textbox.addEventListener('keyup', function(event) {
  if(event.keyCode === 13) {
    event.preventDefault();
    addNew.click();
  }
});