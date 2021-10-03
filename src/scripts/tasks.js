import Task from './task.js'

/* DOM */
const btn = document.querySelector('#add-task');
const add = document.querySelector('.action');
const cancel = document.querySelector('.cancel');
const deleteBtn = document.querySelector('.delete');
const modal = document.querySelector('.modal');
const form = document.querySelector('#task-form');
const project = document.querySelector('#project');
const name = document.querySelector('#name');
const date = document.querySelector('#date');
const notes = document.querySelector('#notes-text');
const cross = document.querySelector('#close');
const todo = document.querySelector('#todo');
const completed = document.querySelector('#completed');

/* event listeners */
btn.addEventListener('click', () => {

    let taskId = crypto.randomUUID();
    form.taskId = taskId;
    modal.classList.toggle('hidden');

});

cross.addEventListener('click', () => {

    modal.classList.toggle('hidden');
    
    // change buttons
    deleteBtn.style.display = 'none';
    add.textContent = 'Add';

    form.reset();

});

cancel.addEventListener('click', () => {

    modal.classList.toggle('hidden');

    // change buttons
    deleteBtn.style.display = 'none';
    add.textContent = 'Add';

    form.reset();

})

deleteBtn.addEventListener('click', deleteTask);

form.addEventListener('submit', (e) => {

    e.preventDefault();

    // if task exists, update task
    if (localStorage.getItem(form.taskId) != null) {

        let task = new FormData(form);
        let existingTask = JSON.parse(localStorage.getItem(form.taskId));

        existingTask.project = task.get('project');
        existingTask.name = task.get('name');
        existingTask.date = task.get('date');
        existingTask.notes = task.get('notes');

        localStorage.setItem(form.taskId, JSON.stringify(existingTask));

        updateTaskCard(existingTask);

    // else add new task
    } else {

        // create task object
        let task = new FormData(form);
        let newTask = new Task(form.taskId, task.get('project'), task.get('name'), task.get('date'), task.get('notes'), false);

        // add task
        addTask(newTask);
        console.log(`Adding: taskId-${form.taskId} name-${task.get('name')}`);
        
        // close and reset form
        modal.classList.toggle('hidden');
        form.reset();

        // update display
        displayTask(newTask, todo);

    }

});

// functions
function addTask(task) {
    localStorage.setItem(task.id,JSON.stringify(task));
}

function displayTasks() {

    let tasks = Object.keys(localStorage);
    let task;

    for (let taskId of tasks) {

        task = JSON.parse(localStorage.getItem(taskId));

        if (task.complete) {
            displayTask(task, completed);
        } else {
            displayTask(task, todo);
        }

    }

}

function displayTask(task, container) {

    let taskCard = document.createElement('div');
    taskCard.classList.add('card');

    // project
    let heading = document.createElement('div');
    heading.classList.add('card-heading', 'flex', 'flex-ai-c', 'flex-jc-sb');

    let project = document.createElement('span');
    project.textContent = task.project;
    heading.append(project);

    let date = document.createElement('span');
    let daysLeft = calculateDaysLeft(task.date);

    if (daysLeft.includes('overdue')) {
        date.style.color = 'red';
    }

    date.textContent = daysLeft;
    heading.append(date);

    let star = document.createElement('input');
    star.type = 'checkbox';
    star.classList.add('flex', 'flex-ai-c', 'flex-jc-c');
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

function editTask(e) {

    let taskId = e.currentTarget.taskId;

    // populate with task details
    let task = JSON.parse(localStorage.getItem(taskId));
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

}

function deleteTask() {
    
    // close and clear form
    modal.classList.toggle('hidden');
    form.reset();

    // remove task from local storage
    localStorage.removeItem(form.taskId);

    // remove card
    let taskToRemove = document.querySelector(`#task-${form.taskId}`);

    taskToRemove.remove();

}

function updateTaskCard(task) {

    // update details
    let project = document.querySelectorAll(`#task-${task.id} span`)[0];
    project.textContent = task.project;

    let taskName = document.querySelectorAll(`#task-${task.id} span`)[2];
    taskName.textContent = task.name;

    modal.classList.toggle('hidden');
    form.reset();

}

function calculateDaysLeft(taskDate) {

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

function changeStatus(e) {

    let taskId = e.currentTarget.taskId;
    let taskCard = document.querySelector(`#task-${taskId}`);
    let task = JSON.parse(localStorage.getItem(taskId));

    taskCard.remove();

    // if complete, change to false and move to todo
    if (task.complete) {
        task.complete = false;
        localStorage.setItem(task.id,JSON.stringify(task));
        todo.append(taskCard);
    // if not complete, change to true and move to completed
    } else {
        task.complete = true;
        localStorage.setItem(task.id,JSON.stringify(task));
        completed.prepend(taskCard);
    }

}

displayTasks();