import { Arguments } from "./Arguments";
import { Expression } from "../Expression/Expression";

export class FunctionPerformer extends Expression {

    constructor(...args) {
        super(...args);
    }

    perform(node, nodeSet) {
        checkCreateShadow.call(this);
        this.node = node;
        let args = this.shadowRoot.perform(node, nodeSet) || [];
        const { types } = this.constructor;
        if (types && types.length > 0) {
            args = args.map((arg, i) => {
                if (types[i]) {
                    return types[i].parse(arg);
                }
                return arg;
            });
        }
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

    static get types() {
        return [];
    }

}

function checkCreateShadow() {
    if (!this.shadowRoot) {
        this.attachShadow(new Arguments());
    }
}

/**
 * 
 * @compile({ token: "contains-open" })
 * @func({ argsSize: 2, types: [ StringType, StringType ] })
 * function contains(str1, str2) {
 *      return str1.includes(str2);
 * }
 * 
 */