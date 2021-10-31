import { addProject, displayProject, removeProject } from "./projectFunctions.js";
import { menu, openForm, closeForm, form, modal, actionBtn, deleteBtn, cancelBtn, tasks } from "./projectsDOM.js";

menu.addEventListener('click', () => sidebar.classList.toggle('hidden'));

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

});

export const deleteProject = deleteBtn.addEventListener('click', (e) => {

    let confirmation = confirm('Are you sure? This action cannot be reversed');

    if (confirmation) {

        let projectId = e.currentTarget.projectId;
        removeProject(projectId);
        
        modal.classList.toggle('hidden');
        form.reset();

    }

    
})

