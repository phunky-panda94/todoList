import Project from "./project.js";
import { deleteBtn, modal, project } from "../tasks/tasksDOM.js";
import { actionBtn, cancelBtn, myProjects, tasks, tasksList, form } from "./projectsDOM.js";

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
    let projectId = Date.now();
    let project = new Project(projectId, projectName);
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

export function removeProject(project) {

    // Remove project from project array
    let projects = new Map(Object.entries(JSON.parse(localStorage.getItem('projects'))));
    projects.delete(project.id);

    // Store updated project array in local storage
    localStorage.setItem('projects', JSON.stringify(Object.fromEntries(projects)));

    // TODO: remove related tasks

    if (myProjects != null) {
        let projectCard = document.querySelector(`#project-${project.id}`);
        projectCard.remove();
    }

}

export function displayProject(project) {

    // create card
    let card = document.createElement('div');
    card.project = project.name;
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

    let project = e.target.project;
    
    // toggle modal
    modal.classList.toggle('hidden');

    // change buttons
    deleteBtn.classList.toggle('none');
    actionBtn.textContent = 'Save changes';
    cancelBtn.textContent = 'Cancel';

    // display tasks
    tasks.classList.remove('none');
    displayProjectTasks(project);

    // add details
    form.elements['project'].value = project;

}

function displayProjectTasks(project) {

    // get project tasks


    // create cards 


    // add to tasksList

}

