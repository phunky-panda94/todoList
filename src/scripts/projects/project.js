export default class Project {

    #id;
    #name;
    #tasks;

    constructor(id, name) {
        this.#id = id;
        this.#name = name;
        this.#tasks = [];
    }

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
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