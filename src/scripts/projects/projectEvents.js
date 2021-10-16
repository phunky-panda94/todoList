import { deleteBtn } from "../tasks/tasksDOM.js";
import { addProject, displayProject } from "./projectFunctions.js";
import { menu, openForm, closeForm, form, modal, actionBtn, cancelBtn, tasks } from "./projectsDOM.js";

export const toggleMenu = menu.addEventListener('click', () => {

    sidebar.classList.toggle("hidden");

});

export const openFormEvent = openForm.addEventListener('click', () => {

    modal.classList.toggle('hidden');
    deleteBtn.classList.add('none');
    actionBtn.textContent = 'Add';
    cancelBtn.textContent = 'Discard';
    tasks.classList.add('none');

});

export const closeFormEvent = closeForm.addEventListener('click', () => {

    modal.classList.toggle('hidden');
    form.reset();

});

export const formEvent = form.addEventListener('submit', (e) => {

    e.preventDefault();

    let project = e.target.elements['project'].value

    addProject(project);

    modal.classList.toggle('hidden');
    form.reset();

    displayProject(project);

});

