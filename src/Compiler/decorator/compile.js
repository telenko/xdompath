import { PerformerStore } from "../PerformerStore";

export function compile({ type, value }) {
    return function(target, prop) {
        const Construct = prop ? target[prop] : target;
        PerformerStore.save({type, value}, () => new Construct());
    }
}