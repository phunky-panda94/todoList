const btn = document.querySelector('#add-task');
const form = document.querySelector('#task-form');
const cross = document.querySelector('#close');

btn.addEventListener('click', () => {

    form.classList.toggle('hidden');

});

cross.addEventListener('click', () => {

    form.classList.toggle('hidden');

});

