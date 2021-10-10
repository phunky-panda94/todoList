import { addProject, displayProject } from "./projectFunctions.js";

const menu = document.querySelector('#menu');
const sidebar = document.querySelector('#sidebar');
const openForm = document.querySelector('#open');
const modal = document.querySelector('.modal');
const closeForm = document.querySelector('#close');
const form = document.querySelector('form');

menu.addEventListener('click', () => {

    sidebar.classList.toggle("hidden");

});

openForm.addEventListener('click', () => {

    modal.classList.toggle('hidden');

});

closeForm.addEventListener('click', () => {

    modal.classList.toggle('hidden');

});

form.addEventListener('submit', (e) => {

    e.preventDefault();

    let project = e.target.elements['project'].value

    addProject(project);

    modal.classList.toggle('hidden');
    form.reset();

    displayProject(project);

});