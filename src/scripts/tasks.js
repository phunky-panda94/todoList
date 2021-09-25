// TODO: implement local storage for tasks and projects
let tasks = [];

class Task {

    constructor(project, name, dueDate, notes) {
        this._project = project;
        this._name = name;
        this._dueDate = dueDate;
        this._notes = notes;
    }

    get project () {
        return this._project;
    }

    get name () {
        return this._name;
    }

    get dueDate() {
        return this._dueDate;
    }

    get notes() {
        return this._notes;
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

btn.addEventListener('click', () => {

    modal.classList.toggle('hidden');

});

cross.addEventListener('click', () => {

    modal.classList.toggle('hidden');
    form.reset();

});

cancel.addEventListener('click', () => {

    modal.classList.toggle('hidden');
    form.reset();

})

deleteBtn.addEventListener('click', deleteTask);

cards.forEach(card => {

    card.addEventListener('click', editTask);

});

form.addEventListener('submit', (e) => {

    e.preventDefault();

    // create task object
    let task = new FormData(form);
    let newTask = new Task(task.get('project'), task.get('name'), task.get('date'), task.get('notes'));

    // add task
    addTask(newTask);
    console.log('Adding ' + task.get('name'))
    
    // close and reset form
    modal.classList.toggle('hidden');
    form.reset();

    // update display
    updateTasks();
    
})

function updateTasks() {

    let taskIndex = tasks.length -1
    let task = tasks[taskIndex];

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
    clickArea.classList.add('click-area', 'border');
    clickArea.taskId = taskIndex;
    clickArea.addEventListener('click', editTask);

    taskCard.append(heading);
    taskCard.append(taskItem);
    taskCard.append(clickArea);
    taskCard.setAttribute('id', `task-${taskIndex}`)
    container.appendChild(taskCard);

}

function editTask(e) {

    let taskIndex = e.currentTarget.taskId;

    // populate with task details
    let task = tasks[taskIndex];
    project.value = task.project;
    name.value = task.name;
    date.value = task.dueDate;
    notes.value = task.notes;

    // change buttons
    add.textContent = 'Save changes'
    cancel.textContent = 'Cancel'

    deleteBtn.taskId = taskIndex;
    deleteBtn.style.display = 'block';
    modal.classList.toggle('hidden');

}

function deleteTask(e) {
    
    let taskIndex = e.currentTarget.taskId;

    // close and clear form
    modal.classList.toggle('hidden');
    form.reset();

    // remove task from tasks
    console.log(`taskId: ${taskIndex}`)
    tasks.splice(taskIndex,1);
    console.log(tasks);

    // remove card
    let taskToRemove = document.querySelector(`#task-${taskIndex}`);

    taskToRemove.remove();

}