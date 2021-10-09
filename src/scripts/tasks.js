import Task from './task.js';
import { updateTaskCard, displayTask, displayTasks, addTask, deleteTask } from './taskFunctions.js';

/* DOM */
const btn = document.querySelector('#add-task');
const add = document.querySelector('.action');
const cancel = document.querySelector('.cancel');
const deleteBtn = document.querySelector('.delete');
const modal = document.querySelector('.modal');
const form = document.querySelector('#task-form');
const cross = document.querySelector('#close');
const todo = document.querySelector('#todo');


/* event listeners */
btn.addEventListener('click', () => {

    let taskId = crypto.randomUUID();
    form.taskId = taskId;
    modal.classList.toggle('hidden');

});

cross.addEventListener('click', () => {

    modal.classList.toggle('hidden');
    
    // change buttons
    deleteBtn.style.display = 'none';
    add.textContent = 'Add';

    form.reset();

});

cancel.addEventListener('click', () => {

    modal.classList.toggle('hidden');

    // change buttons
    deleteBtn.style.display = 'none';
    add.textContent = 'Add';

    form.reset();

})

deleteBtn.addEventListener('click', deleteTask);

form.addEventListener('submit', (e) => {

    e.preventDefault();

    // if task exists, update task
    if (localStorage.getItem(form.taskId) != null) {

        let task = new FormData(form);
        let existingTask = JSON.parse(localStorage.getItem(form.taskId));

        existingTask.project = task.get('project');
        existingTask.name = task.get('name');
        existingTask.date = task.get('date');
        existingTask.notes = task.get('notes');

        localStorage.setItem(form.taskId, JSON.stringify(existingTask));

        updateTaskCard(existingTask);

    // else add new task
    } else {

        // create task object
        let task = new FormData(form);
        let newTask = new Task(form.taskId, task.get('project'), task.get('name'), task.get('date'), task.get('notes'), false);

        // add task
        addTask(newTask);
        
        // close and reset form
        modal.classList.toggle('hidden');
        form.reset();

        // update display
        displayTask(newTask, todo);

    }

});

displayTasks();