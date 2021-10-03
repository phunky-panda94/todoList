export default class Task {

    #id;
    #project;
    #name;
    #date;
    #notes;
    #complete;

    constructor(id, project, name, date, notes, complete) {
        this.#id = id;
        this.#project = project;
        this.#name = name;
        this.#date = date;
        this.#notes = notes;
        this.#complete = complete;
    }

    get id() {
        return this.#id;
    }
    
    get project() {
        return this.#project;
    }

    set project(project) {
        this.#project = project;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get date() {
        return this.#date;
    }

    set date(date) {
        this.#date = date;
    }

    get notes() {
        return this.#notes;
    }

    set notes(notes) {
        this.#notes = notes;
    }

    get complete() {
        return this.#complete;
    }

    set complete(status) {
        this.#complete = status;
    }

    toJSON() {
        return {
            id: this.id,
            project: this.project,
            name: this.name,
            date: this.date,
            notes: this.notes,
            complete: this.complete
        }
    }

}