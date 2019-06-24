import { XpathNode } from "../XpathNode";
import { Arguments } from "./Arguments";
import { Expression } from "../Expression/Expression";

export class FunctionPerformer extends Expression {

    constructor(...args) {
        super(...args);
    }

    perform(node, nodeSet) {
        checkCreateShadow.call(this);
        this.node = node;
        const args = this.shadowRoot.perform(node, nodeSet) || [];
        return this.process(...args);
    }

    getContext() {
        this.attachShadow(new Arguments());
        this.shadowRoot.capacity = this.constructor.argsCapacity;
        return this.shadowRoot;
    }

    static get argsCapacity() {
        return Infinity;
    }

}

function checkCreateShadow() {
    if (!this.shadowRoot) {
        this.attachShadow(new Arguments());
    }
}