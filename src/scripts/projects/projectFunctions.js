import { deleteBtn, modal } from "../tasks/tasksDOM.js";
import { actionBtn, cancelBtn, myProjects, tasks, tasksList, form } from "./projectsDOM.js";

export function displayProjects() {

    // get projects
    if (localStorage.getItem('projects') != null) {

        let projects = JSON.parse(localStorage.getItem('projects'));

        for (let project of projects) {
            displayProject(project);
        }

    }

}

// TODO: refactor to use Project object 
export function addProject(project) {

    let projects;

    // if no projects, create new array
    if (localStorage.getItem('projects') == null) {
        projects = [project];
    } else {
        // Add project to project array
        projects = JSON.parse(localStorage.getItem('projects'));
        projects.push(project);
    }

    // Store updated project array in local storage
    localStorage.setItem('projects', JSON.stringify(projects));

}

export function removeProject(project) {

    // Remove project from project array
    let projects = JSON.parse(localStorage.getItem('projects'));
    let index = projects.indexOf(project);
    projects.splice(index,1);

    // Store updated project array in local storage
    localStorage.setItem('project', JSON.stringify(projects));

    if (myProjects != null) {
        let projectCard = document.querySelector(`#${project}`);
        projectCard.remove();
    }

}

export function displayProject(project) {

    // create card
    let card = document.createElement('div');
    card.project = project;
    card.style.cursor = 'pointer';
    card.classList.add('card', 'flex', 'flex-jc-c', 'flex-ai-c');
    card.addEventListener('click', displayProjectDetails);
    
    let name = document.createElement('h2');
    name.textContent = project;

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

