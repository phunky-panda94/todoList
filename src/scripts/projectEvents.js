
export const openFormEvent = openForm.addEventListener('click', () => {

    let taskId = crypto.randomUUID();
    form.taskId = taskId;
    modal.classList.toggle('hidden');

});