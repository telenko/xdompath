import { Expression } from "../Expression/Expression";

export class PrioritizedOperator extends Expression {

    static get priority() {
        return 1;
    }

    static get capacity() {
        return 2;
    }

    apply(node) {
        this.replaceWithParent();
        super.apply(node);
        return node;
    }

}