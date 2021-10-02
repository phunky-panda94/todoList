class Task {

    #id;
    #project;
    #name;
    #date;
    #notes;

    constructor(id, project, name, date, notes) {
        this.#id = id;
        this.#project = project;
        this.#name = name;
        this.#date = date;
        this.#notes = notes;
    }

    get id() {
        return this.#id;
    }
    
    get project() {
        return this.#project;
    }

    set project(project) {
        this.#project = project;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get date() {
        return this.#date;
    }

    set date(date) {
        this.#date = date;
    }

    get notes() {
        return this.#notes;
    }

    set notes(notes) {
        this.#notes = notes;
    }

    toJSON() {
        return {
            id: this.id,
            project: this.project,
            name: this.name,
            date: this.date,
            notes: this.notes
        }
    }

}

/* DOM */
const btn = document.querySelector('#add-task');
const add = document.querySelector('.action');
const cancel = document.querySelector('.cancel');
const deleteBtn = document.querySelector('.delete');
const cards = document.querySelectorAll('.click-area');
const modal = document.querySelector('.modal');
const form = document.querySelector('#task-form');
const project = document.querySelector('#project');
const name = document.querySelector('#name');
const date = document.querySelector('#date');
const notes = document.querySelector('#notes-text');
const cross = document.querySelector('#close');
const container = document.querySelector('#tasks-container');

/* event listeners */
btn.addEventListener('click', () => {

    let taskId = crypto.randomUUID();
    form.taskId = taskId;
    console.log(taskId);
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

cards.forEach(card => {

    card.addEventListener('click', editTask);

});

form.addEventListener('submit', (e) => {

    e.preventDefault();

    // if task exists, update task
    if (form.taskId in localStorage) {

        let task = new FormData(form);
        let existingTask = tasks[form.taskId]

        existingTask.project = task.get('project');
        existingTask.name = task.get('name');
        existingTask.date = task.get('date');
        existingTask.notes = task.get('notes');

        updateTask(form.taskId);

    // else add new task
    } else {

        // create task object
        let task = new FormData(form);
        let newTask = new Task(form.taskId, task.get('project'), task.get('name'), task.get('date'), task.get('notes'));

        // add task
        addTask(newTask);
        console.log(`Adding: taskId-${form.taskId} name-${task.get('name')}`);
        
        // close and reset form
        modal.classList.toggle('hidden');
        form.reset();

        // update display
        displayNewTask(form.taskId);

    }

})

// functions
function addTask(task) {
   
    let taskId = task.id;

    localStorage.setItem(taskId,JSON.stringify(task));

}

function displayTasks() {

    let tasks = Object.keys(localStorage);

    for (let taskId of tasks) {
        displayNewTask(taskId);
    }

}

function displayNewTask(taskId) {

    let task = JSON.parse(localStorage.getItem(taskId));
    console.log(task);

    taskCard = document.createElement('div');
    taskCard.classList.add('card');

    // project
    let heading = document.createElement('div');
    heading.classList.add('card-heading', 'flex', 'flex-ai-c', 'flex-jc-sb');

    let project = document.createElement('span');
    project.textContent = task.project;
    heading.append(project);

    let date = document.createElement('span');
    let daysLeft = calculateDaysLeft(task.date);
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
    taskItem.append(checkbox);

    let taskName = document.createElement('span');
    taskName.textContent = task.name;
    taskItem.append(taskName);

    let clickArea = document.createElement('div');
    clickArea.classList.add('click-area');
    clickArea.taskId = taskId;
    clickArea.addEventListener('click', editTask);

    taskCard.append(heading);
    taskCard.append(taskItem);
    taskCard.append(clickArea);
    taskCard.setAttribute('id', `${taskId}`)
    container.appendChild(taskCard);

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
    let taskToRemove = document.querySelector(`#${form.taskId}`);

    taskToRemove.remove();

}

function updateTask(taskId) {

    // get task
    let updatedTask = tasks[taskId];
    console.log(updatedTask);

    // update details
    let project = document.querySelectorAll(`#${taskId} span`)[0];
    console.log(project);
    project.textContent = updatedTask.project;

    let taskName = document.querySelectorAll(`#${taskId} span`)[1];
    taskName.textContent = updatedTask.name;

    modal.classList.toggle('hidden');
    form.reset();

}

function calculateDaysLeft(taskDate) {

    let dateComponents = taskDate.split('-');
    let dueDate = new Date(dateComponents[0], dateComponents[1] - 1, dateComponents[2]);
    let today = new Date();

    // calculate days left / overdue
    let daysLeft = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) {
        return `${daysLeft} days overdue`;
    } else {
        return `${Math.abs(daysLeft)} days left`;
    }

}

displayTasks();