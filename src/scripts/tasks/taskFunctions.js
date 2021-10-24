import Project from '../projects/project.js';
import { populateProjectsList } from '../projects/projectFunctions.js';
import Task from './task.js';
import { add, cancel, deleteBtn, form, modal, project, projectsList, name, date, notes, completed, todo, myDay } from './tasksDOM.js'

function createNewTask(today) {

    let task = new FormData(form);
    let newTask = new Task(
        form.taskId, 
        task.get('project'), 
        task.get('name'), 
        task.get('date'), 
        task.get('notes'), 
        false,
        today
    );

    return newTask;

}

export function addTask() {

    let today = false;

    if (myDay != null) {
        today = true;
    }

    let newTask = createNewTask(today);
    let tasks;

    if (localStorage.getItem('tasks') != null) {
        // JSON -> Object -> Map
        tasks = new Map(Object.entries(JSON.parse(localStorage.getItem('tasks'))));
        tasks.set(newTask.id,newTask);
    } else {
        tasks = new Map();
        tasks.set(newTask.id,newTask);
    }

    if (newTask.project != '') {
        addToProject(newTask);
    }

    // Map -> Object -> JSON
    localStorage.setItem('tasks',JSON.stringify(Object.fromEntries(tasks)));

    if (today) {
        displayTask(newTask, myDay);
    } else {
        displayTask(newTask, todo);
    }

}

function addToProject(task) {

    let project;
    let projects;
    let projectTasks;

    // create project map if does not exist
    if (localStorage.getItem('projects') == null) {

        project = new Project(task.project);
        projects = new Map();
        projects.set(project.id, project);

    } else {

        // get projects 
        projects = new Map(Object.entries(JSON.parse(localStorage.getItem('projects'))));

        // check if project exists
        for (let p of projects.values()) {

            if (p.name == task.project) {

                project = p;
                project.tasks.push(task.id);
                projects.set(project.id, project);

            } else {

                project = new Project(task.project);
                projects.set(project.id, project);

            }

        }

    }

    projects.set(task.project, projectTasks);
        
    localStorage.setItem('projects', JSON.stringify(Object.fromEntries(projects)));
    
}

function removeFromProject(task) {

    let projects = new Map(Object.entries(JSON.parse(localStorage.getItem('projects'))));
    let project;

    // check if project exists
    for (let p of projects.values()) {

        if (p.name == task.project) {

            project = p;
                
            for (let index = 0; index < project.tasks.length; index++) {
                if (project.tasks[index] == task.id) {
                    project.tasks.splice(index,1);
                }
            }
            
            projects.set(project.id, project);

            localStorage.setItem('projects', JSON.stringify(Object.fromEntries(projects)));

        }

    }

}

export function displayTasks() {

    if (localStorage.getItem('tasks') != null) {

        let tasks = new Map(Object.entries(JSON.parse(localStorage.getItem('tasks'))));
        
        for (let task of tasks.values()) {
            
            if (task.complete) {
                displayTask(task, completed);
            } else {
                displayTask(task, todo);
            }

        }

    }

}

export function displayTodayTasks() {

    if (localStorage.getItem('tasks') != null) {

        let tasks = new Map(Object.entries(JSON.parse(localStorage.getItem('tasks'))));

        for (let task of tasks.values()) {

            if (task.today) {
                if (task.complete) {
                    displayTask(task, completed);
                } else {
                    displayTask(task, myDay);
                }
            } 

        }

    }

}

// TODO: refactor
function displayTask(task, container) {

    let taskCard = document.createElement('div');
    taskCard.classList.add('card');

    // project
    let heading = document.createElement('div');
    heading.classList.add('card-heading', 'flex', 'flex-ai-c', 'flex-jc-sb');

    let project = document.createElement('span');
    project.textContent = task.project;
    heading.append(project);

    // due date
    let date = document.createElement('span');
    let daysLeft = task.date;
    if (task.date != '') {
        daysLeft = calculateDaysLeft(task.date);
    }

    if (daysLeft.includes('overdue')) {
        date.style.color = 'red';
    }

    date.textContent = daysLeft;
    heading.append(date);

    // today
    let star = document.createElement('input');
    star.type = 'checkbox';
    star.classList.add('flex', 'flex-ai-c', 'flex-jc-c');
    star.taskId = task.id;
    star.addEventListener('click', toggleToday);

    if (task.today) {
        star.checked = true;
    }  

    heading.append(star);

    // task 
    let taskItem = document.createElement('div');
    taskItem.classList.add('checkbox', 'flex', 'flex-ai-c')

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.taskId = task.id;
    checkbox.addEventListener('click', changeStatus);

    if (task.complete) {
        checkbox.checked = true;
    }

    taskItem.append(checkbox);

    let taskName = document.createElement('span');
    taskName.textContent = task.name;
    taskItem.append(taskName);

    let clickArea = document.createElement('div');
    clickArea.classList.add('click-area');
    clickArea.taskId = task.id;
    clickArea.addEventListener('click', editTask);

    taskCard.append(heading);
    taskCard.append(taskItem);
    taskCard.append(clickArea);
    taskCard.setAttribute('id', `task-${task.id}`)
    container.append(taskCard);

}

export function editTask(e) {

    let taskId = e.target.taskId;

    // populate with task details
    let tasks = new Map(Object.entries(JSON.parse(localStorage.getItem('tasks'))));
    let task = tasks.get(taskId);
    
    project.value = task.project;
    name.value = task.name;
    date.value = task.date;
    notes.value = task.notes;

    // change buttons
    add.textContent = 'Save changes'
    cancel.textContent = 'Cancel'
    deleteBtn.style.display = 'block';

    form.taskId = taskId;
    modal.classList.toggle('hidden');

    populateProjectsList();

}

export function deleteTask() {
    
    let taskId = form.taskId;
    let tasks = new Map(Object.entries(JSON.parse(localStorage.getItem('tasks'))));
    let task = tasks.get(taskId);

    // change buttons
    add.textContent = 'Add'
    cancel.textContent = 'Discard'
    deleteBtn.style.display = 'none';

    if (project.value != '') {
        removeFromProject(task);
    }

    // remove task from map and update in local storage
    tasks.delete(taskId);
    localStorage.setItem('tasks', JSON.stringify(Object.fromEntries(tasks)));

    // remove card
    let taskToRemove = document.querySelector(`#task-${taskId}`);
    taskToRemove.remove();

    // close and clear form
    modal.classList.toggle('hidden');
    form.reset();

}

export function updateTask() {

    let task = new FormData(form);
    let tasks = new Map(Object.entries(JSON.parse(localStorage.getItem('tasks'))));
    let existingTask = tasks.get(form.taskId);

    if (existingTask.project != task.get('project')) {
        
        let prevProject = existingTask.project;
        let newProject = task.get('project');

        if (prevProject != '') {
            removeFromProject(existingTask);
        }

        existingTask.project = task.get('project');

        if (newProject != '') {
            addToProject(existingTask);
        }

    }

    existingTask.name = task.get('name');
    existingTask.date = task.get('date');
    existingTask.notes = task.get('notes');

    tasks.set(form.taskId, existingTask);

    localStorage.setItem('tasks', JSON.stringify(Object.fromEntries(tasks)));

    updateTaskCard(existingTask);

}

function updateTaskCard(task) {

    // update details
    let project = document.querySelectorAll(`#task-${task.id} span`)[0];
    project.textContent = task.project;

    let taskName = document.querySelectorAll(`#task-${task.id} span`)[2];
    taskName.textContent = task.name;

}

export function calculateDaysLeft(taskDate) {

    let dateComponents = taskDate.split('-');
    let dueDate = new Date(dateComponents[0], dateComponents[1] - 1, dateComponents[2]);
    let today = new Date();

    // calculate days left / overdue
    let daysLeft = (dueDate - today) / (1000 * 60 * 60 * 24);

    if (daysLeft < 0) {
        return `${Math.floor(Math.abs(daysLeft))} days overdue`;
    } else {
        return `${Math.floor(daysLeft)} days left`;
    }

}

export function changeStatus(e) {

    let taskId = e.target.taskId;
    let taskCard = document.querySelector(`#task-${taskId}`);
    let tasks = new Map(Object.entries(JSON.parse(localStorage.getItem('tasks'))));;
    let task = tasks.get(taskId);

    // if complete, change to false and move to todo / myday
    if (task.complete) {

        task.complete = false;
        tasks.set(taskId, task);
        localStorage.setItem('tasks',JSON.stringify(Object.fromEntries(tasks)));
        
        if (todo != null) {
            todo.append(taskCard);
        } 

        if (myDay != null) {
            myDay.append(taskCard);
        }

    // if not complete, change to true and move to completed
    } else {

        task.complete = true;
        tasks.set(taskId, task);
        localStorage.setItem('tasks',JSON.stringify(Object.fromEntries(tasks)));
        completed.prepend(taskCard);

    }

}

export function toggleToday(e) {

    let taskId = e.target.taskId
    let tasks = new Map(Object.entries(JSON.parse(localStorage.getItem('tasks'))));;
    let task = tasks.get(taskId);
    
    if (task.today) {
        task.today = false;
    } else {
        task.today = true;
    }

    tasks.set(taskId, task);
    localStorage.setItem('tasks', JSON.stringify(Object.fromEntries(tasks)));

    if (myDay != null) {
        let taskCard = document.querySelector(`#task-${taskId}`);
        taskCard.remove();
    }

}

export function resetForm() {

    modal.classList.toggle('hidden');
    
    // change buttons
    deleteBtn.style.display = 'none';
    add.textContent = 'Add';

    projectsList.replaceChildren();

    form.reset();

}
