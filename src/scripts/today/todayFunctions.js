import { sidebarProjects, unassigned } from "./todayDOM.js";

export function populateSidebarProjects() {

    // get all projects

    // add projects to sidebarProjects

    // add tasks to projects

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

            taskEntry.append(taskName, checkbox);
            unassigned.append(taskEntry);

        }

    }
    
}