import { add, cancel, deleteBtn, form, modal, project, name, date, notes } from './tasksDOM.js'

export function addTask(task) {
    localStorage.setItem(task.id,JSON.stringify(task));
}

export function displayTasks() {

    let tasks = Object.keys(localStorage);
    let task;

    for (let taskId of tasks) {

        if (taskId != 'today') {

            task = JSON.parse(localStorage.getItem(taskId));

            if (task.complete) {
                displayTask(task, completed);
            } else {
                displayTask(task, todo);
            }

        }

    }

}

export function displayTodayTasks() {

    // retrieve today array
    if (localStorage.getItem('today') != null) {

        let today = JSON.parse(localStorage.getItem('today'));
        let task;

        // loop through today and display tasks only if not complete
        for (let taskId of today) {

            task = JSON.parse(localStorage.getItem(taskId));

            if (task.complete == false) {
                displayTask(task, myDay);
            }

        }

    }

}

export function displayTask(task, container) {

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
    let daysLeft = calculateDaysLeft(task.date);

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

    // if in today, make checked
    if (localStorage.getItem('today') != null) {

        let today = JSON.parse(localStorage.getItem('today'));
        
        if (today.includes(task.id)) {
            star.checked = true;
        }    

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

export function deleteTask() {
    
    // close and clear form
    modal.classList.toggle('hidden');
    form.reset();

    // remove task from local storage
    localStorage.removeItem(form.taskId);

    // remove card
    let taskToRemove = document.querySelector(`#task-${form.taskId}`);

    taskToRemove.remove();

}

export function updateTaskCard(task) {

    // update details
    let project = document.querySelectorAll(`#task-${task.id} span`)[0];
    project.textContent = task.project;

    let taskName = document.querySelectorAll(`#task-${task.id} span`)[2];
    taskName.textContent = task.name;

    modal.classList.toggle('hidden');
    form.reset();

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
    let task = JSON.parse(localStorage.getItem(taskId));

    // if complete, change to false and move to todo / myday
    if (task.complete) {

        task.complete = false;
        localStorage.setItem(task.id,JSON.stringify(task));
        
        if (todo != null) {
            todo.append(taskCard);
        } 

        if (myDay != null) {
            myDay.append(taskCard);
        }

    // if not complete, change to true and move to completed
    } else {

        task.complete = true;
        localStorage.setItem(task.id,JSON.stringify(task));
        completed.prepend(taskCard);

    }


}

export function toggleToday(e) {

    let taskId = e.target.taskId
    
    // if today exists, check if taskId in today
    if (localStorage.getItem('today') != null) {

        let today = JSON.parse(localStorage.getItem('today'));

        // if in today, remove
        if (today.includes(taskId)) {
            removeFromToday(taskId);
        // else, add
        } else {
            addToToday(taskId);
        }

    // else create new today array and store in local storage
    } else {
        let today = [taskId];
        localStorage.setItem('today', JSON.stringify(today));
    }

}

export function addToToday(taskId) {

    // Add task id to today array
    let today = JSON.parse(localStorage.getItem('today'));
    today.push(taskId);
    
    // Store updated today array in local storage
    localStorage.setItem('today', JSON.stringify(today));

}

export function removeFromToday(taskId) {

    // Remove task id from today array
    let today = JSON.parse(localStorage.getItem('today'));
    let index = today.indexOf(taskId);
    today.splice(index,1);

    // Store updated today array in local storage
    localStorage.setItem('today', JSON.stringify(today));

    if (myDay != null) {
        let taskCard = document.querySelector(`#task-${taskId}`);
        taskCard.remove();
    }

}