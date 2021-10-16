import { updateTaskCard, displayTask, addTask, deleteTask, updateTask, populateProjectsList, resetForm } from './taskFunctions.js';
import { openForm, closeForm, deleteBtn, form, modal, project, add, cancel } from './tasksDOM.js';

/* event listeners */
export const openFormEvent = openForm.addEventListener('click', () => {

    let taskId = crypto.randomUUID();
    form.taskId = taskId;

    populateProjectsList();

    modal.classList.toggle('hidden');

});

export const closeFormEvent = closeForm.addEventListener('click', resetForm);

export const cancelEvent = cancel.addEventListener('click', resetForm);

export const deleteEvent = deleteBtn.addEventListener('click', deleteTask);

export const submitFormEvent = form.addEventListener('submit', (e) => {

    e.preventDefault();

    let tasks = new Map(Object.entries(JSON.parse(localStorage.getItem('tasks'))));

    // if task exists, update task
    if (tasks.get(form.taskId) != null) {
        updateTask();
    // else add new task
    } else {
        addTask();
    }

    // close and reset form
    modal.classList.toggle('hidden');
    form.reset();

});