import { populateProjectsList } from '../projects/projectFunctions.js';
import { addTask, deleteTask, updateTask, resetForm } from './taskFunctions.js';
import { openForm, closeForm, deleteBtn, form, modal, cancel } from './tasksDOM.js';

/* event listeners */
export const openFormEvent = openForm.addEventListener('click', () => {

    let taskId = String(Date.now());
    form.taskId = taskId;

    populateProjectsList();

    modal.classList.toggle('hidden');

});

export const closeFormEvent = closeForm.addEventListener('click', resetForm);

export const cancelEvent = cancel.addEventListener('click', resetForm);

export const deleteEvent = deleteBtn.addEventListener('click', deleteTask);

export const submitFormEvent = form.addEventListener('submit', (e) => {

    e.preventDefault();

    if (localStorage.getItem('tasks') != null) {

        let tasks = new Map(Object.entries(JSON.parse(localStorage.getItem('tasks'))));

        // if task exists, update task
        if (tasks.get(form.taskId) != null) {
            updateTask();
        // else add new task
        } else {
            addTask();
        }
       
    } else {
        addTask();
    }

    // close and reset form
    resetForm();

});