export default class Project {

    #name;
    #tasks;

    constructor(name) {
        this.#name = name;
        this.#tasks = [];
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get tasks() {
        return this.#tasks;
    }

    addTask(task) {
        this.#tasks.push(task);
    }

    removeTask(taskIndex) {
        this.#tasks.splice(taskIndex,1);
    }

    toJSON() {
        return {
            name: this.name,
            tasks: this.tasks
        }
    }

}