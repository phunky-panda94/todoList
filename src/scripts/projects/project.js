export default class Project {

    #id;
    #name;
    #tasks;

    constructor(name) {
        this.#id = String(Date.now());
        this.#name = name;
        this.#tasks = [];
    }

    get id() {
        return this.#id;
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

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            tasks: this.tasks
        }
    }

}