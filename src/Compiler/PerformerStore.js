const STORE = {};

export class PerformerStore {

    static save({ type, value }, performerFactory) {
        STORE[`${type}:${value}`] = performerFactory;
    }

    static get({ type, value }) {
        return STORE[`${type}:${value}`];
    }

}