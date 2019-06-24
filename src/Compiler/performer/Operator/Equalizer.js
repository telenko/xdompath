import { PrioritizedOperator } from "./PrioritizedOperator";

export class Equalizer extends PrioritizedOperator {

    perform(...args) {
        if (this.children.length !== 2) {
            return false;
        }
        return this.children[0].perform(...args) == this.children[1].perform(...args);
    }

    static get priority() {
        return 1;
    }

    static get capacity() {
        return 2;
    }

}