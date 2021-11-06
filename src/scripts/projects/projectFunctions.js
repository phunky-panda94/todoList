import Project from "./project.js";
import { deleteBtn, modal } from "../tasks/tasksDOM.js";
import { actionBtn, cancelBtn, myProjects, tasks, tasksList, form } from "./projectsDOM.js";
import { projectsList } from "../tasks/tasksDOM.js";

export function displayProjects() {

    if (localStorage.getItem('projects') != null) {

        let projects = new Map(Object.entries(JSON.parse(localStorage.getItem('projects'))));

        for (let project of projects.values()) {
            displayProject(project);
        }

    }

}

export function addProject(projectName) {

    // create Project object
    let project = new Project(projectName);
    let projects;

    // if no projects, create new map
    if (localStorage.getItem('projects') == null) {
        projects = new Map();
    } else {
        // Else, retrieve projects map
        projects = new Map(Object.entries(JSON.parse(localStorage.getItem('projects'))));
    }

    projects.set(project.id, project);

    // Store updated project array in local storage
    localStorage.setItem('projects', JSON.stringify(Object.fromEntries(projects)));

    // display task
    displayProject(project);

}

export function removeProject(projectId) {
    
    let projects = new Map(Object.entries(JSON.parse(localStorage.getItem('projects'))));
    let project = projects.get(projectId);
    let tasks = new Map(Object.entries(JSON.parse(localStorage.getItem('tasks'))));

    for (let task of project.tasks) {
        tasks.delete(task);
    }

    localStorage.setItem('tasks', JSON.stringify(Object.fromEntries(tasks)));

    // remove project
    projects.delete(projectId);
    localStorage.setItem('projects', JSON.stringify(Object.fromEntries(projects)));

    // remove project card
    if (myProjects != null) {
        let projectCard = document.querySelector(`#project-${projectId}`);
        projectCard.remove();
    }

}

export function displayProject(project) {

    // create card
    let card = document.createElement('div');
    card.project = project;
    card.classList.add('card', 'flex', 'flex-jc-c', 'flex-ai-c');
    card.setAttribute('id',`project-${project.id}`);
    card.addEventListener('click', displayProjectDetails);
    
    let name = document.createElement('h2');
    name.textContent = project.name;

    card.append(name);

    // add card
    myProjects.append(card);

}

function displayProjectDetails(e) {

    let project = e.currentTarget.project;
    
    // toggle modal
    modal.classList.toggle('hidden');

    // change buttons
    deleteBtn.projectId = project.id;
    deleteBtn.classList.remove('none');
    actionBtn.classList.add('hidden');
    cancelBtn.textContent = 'Cancel';

    // display tasks
    tasks.classList.remove('none');
    displayProjectTasks(project);

    // add details
    form.elements['project'].value = project.name;

}

function displayProjectTasks(project) {

    // get project tasks
    let tasks = new Map(Object.entries(JSON.parse(localStorage.getItem('tasks'))));
    let task;

    tasksList.replaceChildren();

    project.tasks.map(taskId => {

        task = tasks.get(taskId);

        let card = document.createElement('div');
        card.task = task;
        card.classList.add('card', 'flex', 'flex-jc-sb');
        
        let taskName = document.createElement('p');
        taskName.textContent = task.name;

        let doneIcon = document.createElement('span');
        doneIcon.classList.add('material-icons-outlined');
        doneIcon.taskId = taskId;
        if (task.complete) {
            doneIcon.textContent = 'task_alt'
            doneIcon.style.color = '#2c2c2c';
        } else {
            doneIcon.textContent = 'circle';
        } 
        doneIcon.addEventListener('click', toggleDone);

        let deleteIcon = document.createElement('span');
        deleteIcon.taskId = taskId;
        deleteIcon.classList.add('material-icons-outlined');
        deleteIcon.textContent = 'delete_outline';
        deleteIcon.addEventListener('click', deleteTask);

        let buttons = document.createElement('div');
        buttons.append(doneIcon);
        buttons.append(deleteIcon);

        card.append(taskName);
        card.append(buttons);

        // add to tasksList
        tasksList.append(card);

    });

}

export function populateProjectsList() {

    if (localStorage.getItem('projects') != null) {

        let projects = new Map(Object.entries(JSON.parse(localStorage.getItem('projects'))));
        let option;

        for (let project of projects.values()) {

            // create option
            option = document.createElement('option');
            option.value = project.name;
            option.textContent = project.name;
            
            // add to select 
            projectsList.append(option);

        }

    }

}

function toggleDone(event) {

    // set task to complete
    let tasks = new Map(Object.entries(JSON.parse(localStorage.getItem('tasks'))));
    let task = tasks.get(event.target.taskId);

    task.complete ? task.complete = false : task.complete = true;
    tasks.set(task.id, task);
    
    localStorage.setItem('tasks',JSON.stringify(Object.fromEntries(tasks)));

    if (event.target.textContent === 'circle') {
        event.target.textContent = 'task_alt'
        event.target.style.color = '#2c2c2c';
    } else {
        event.target.textContent = 'circle';
        event.target.style.color = '#ffffff';
    }

}

function deleteTask(event) {

    if (window.confirm('Are you sure?')) {

        // remove task
        let tasks = new Map(Object.entries(JSON.parse(localStorage.getItem('tasks'))));

        tasks.delete(event.target.taskId);
        localStorage.setItem('tasks',JSON.stringify(Object.fromEntries(tasks)));

        // remove card
        event.target.parentElement.parentElement.remove();

    }
}
