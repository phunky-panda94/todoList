let tasks = [];

class Task {

    constructor(task, dueDate, notes) {
        this._task = task;
        this._dueDate = dueDate;
        this._notes = notes;
    }

    get task () {
        return this._task;
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
const cancel = document.querySelector(".cancel");
const modal = document.querySelector('.modal');
const form = document.querySelector('#task-form');
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

form.addEventListener('submit', (e) => {

    e.preventDefault();

    // create task object
    let task = new FormData(form);
    let newTask = new Task(task.get('task'), task.get('date'), task.get('notes'));

    // add task
    addTask(newTask);
    console.log('Adding ' + task.get('task'))
    
    // close and reset form
    modal.classList.toggle('hidden');
    form.reset();

    // update display
    updateTasks();
    
})

function updateTasks() {

    let task = tasks[tasks.length - 1];

    taskCard = document.createElement('div');
    taskCard.classList.add('card');

    let heading = document.createElement('label');
    heading.classList.add('card-heading', 'flex', 'flex-ai-c', 'flex-jc-sb');

    let taskName = document.createElement('span');
    taskName.textContent = task.task;
    heading.append(taskName);

    taskCard.append(heading);
    container.appendChild(taskCard);

}