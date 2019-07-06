import { Expression } from "../Expression/Expression";

export class PrioritizedOperator extends Expression {

    static get priority() {
        return 1;
    }

    static get capacity() {
        return 2;
    }

    perform(...args) {
        if (this.children.length !== this.constructor.capacity) {
            return false;
        }
        const runArgs = this.children.map(ch => ch.perform(...args));
        return this.process(...runArgs);
    }

    process() {
        
    }

    apply(node) {
        this.replaceWithParent();
        super.apply(node);
        return node;
    }

}