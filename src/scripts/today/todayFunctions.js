import { toggleToday } from "../tasks/taskFunctions.js";
import { sidebarProjects, unassigned } from "./todayDOM.js";

export function populateSidebarProjects() {

    // get all projects
    let projects = new Map(Object.entries(JSON.parse(localStorage.getItem('projects'))));
    let tasks = new Map(Object.entries(JSON.parse(localStorage.getItem('tasks'))));

    let container;
    let dropdown;
    let projectName;
    let projectTasks;
    let task;
    let taskName;
    let taskEntry;
    let checkbox;
    let line = document.createElement('div');
    line.classList.add('line');

    for (let project of projects.values()) {

        // add projects to sidebarProjects
        container = document.createElement('div');
        container.classList.add('container','flex','flex-row','flex-wrap','flex-jc-sb');

        projectName = document.createElement('p');
        projectName.textContent = project.name;

        dropdown = document.createElement('input');
        dropdown.type = 'checkbox';
        dropdown.checked = false;
        dropdown.classList.add('dropdown','flex','flex-ai-c','flex-jc-c');

        projectTasks = document.createElement('div');
        projectTasks.classList.add('tasks','flex','flex-row','flex-wrap','flex-jc-sb');
        
        // add tasks to projects
        for (let taskId of project.tasks) {
            
            task = tasks.get(taskId);
            taskEntry = document.createElement('div');
            taskEntry.classList.add('task','flex','flex-row','flex-jc-sb');

            taskName = document.createElement('p');
            taskName.textContent = task.name;

            checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.today;
            checkbox.classList.add('flex','flex-ai-c','flex-jc-c');
            checkbox.addEventListener('click', () => toggleToday(taskId));

            taskEntry.append(taskName, checkbox);
            projectTasks.append(taskEntry);

        }

        container.append(projectName, dropdown, projectTasks)
        sidebarProjects.append(container,line);

    }

}

export function populateUnassigned() {

    // get all unassigned tasks
    let tasks = new Map(Object.entries(JSON.parse(localStorage.getItem('tasks')))); 
    let taskEntry;
    let taskName;
    let checkbox;

    for (let task of tasks.values()) {

        if (task.project == '') {

            // add tasks to unassigned
            taskEntry = document.createElement('div');
            taskEntry.classList.add('task','flex','flex-row','flex-jc-sb');

            taskName = document.createElement('p');
            taskName.textContent = task.name;

            checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.today;
            checkbox.classList.add('flex','flex-ai-c','flex-jc-c');
            checkbox.addEventListener('click', () => toggleToday(task.id));

            taskEntry.append(taskName, checkbox);
            unassigned.append(taskEntry);

        }

    }
    
}