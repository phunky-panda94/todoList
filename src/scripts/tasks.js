// TODO: implement local storage for tasks and projects
let tasks = [];

class Task {

    constructor(id, project, name, dueDate, notes) {
        this._id = id;
        this._project = project;
        this._name = name;
        this._dueDate = dueDate;
        this._notes = notes;
    }

    get id() {
        return this._id;
    }
    
    get project() {
        return this._project;
    }

    set project(project) {
        this._project = project;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(date) {
        this._dueDate = date;
    }

    get notes() {
        return this._notes;
    }

    set notes(notes) {
        this._notes = notes;
    }

}

function addTask(task) {
    tasks.push(task);
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

// event listeners

btn.addEventListener('click', () => {

    let taskId = tasks.length
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
    if (form.taskId in tasks) {

        let task = new FormData(form);
        let existingTask = tasks[form.taskId]

        existingTask.project = task.get('project');
        existingTask.name = task.get('name');
        existingTask.dueDate = task.get('date');
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

function displayNewTask(taskId) {

    let task = tasks[taskId];

    taskCard = document.createElement('div');
    taskCard.classList.add('card');

    // project
    let heading = document.createElement('div');
    heading.classList.add('card-heading', 'flex', 'flex-ai-c', 'flex-jc-sb');

    let project = document.createElement('span');
    project.textContent = task.project;
    heading.append(project);

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
    taskCard.setAttribute('id', `task-${taskId}`)
    container.appendChild(taskCard);

}

function editTask(e) {

    let taskId = e.currentTarget.taskId;

    // populate with task details
    let task = tasks[taskId];
    project.value = task.project;
    name.value = task.name;
    date.value = task.dueDate;
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

    // remove task from tasks
    console.log(`taskId: ${form.taskId}`)
    tasks.splice(form.taskId,1);
    console.log(`Tasks: ${tasks}`);

    // remove card
    let taskToRemove = document.querySelector(`#task-${form.taskId}`);

    taskToRemove.remove();

}

function updateTask(taskId) {

    // get task
    let updatedTask = tasks[taskId];
    console.log(updatedTask);

    // update details
    let project = document.querySelectorAll(`#task-${taskId} span`)[0];
    console.log(project);
    project.textContent = updatedTask.project;

    let taskName = document.querySelectorAll(`#task-${taskId} span`)[1];
    taskName.textContent = updatedTask.name;

    modal.classList.toggle('hidden');
    form.reset();

}