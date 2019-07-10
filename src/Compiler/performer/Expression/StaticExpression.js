import { Expression } from "./Expression";

export class StaticExpression extends Expression {

    constructor(...args) {
        super(...args);
        this.val = checkAndRemoveBrackets(args[0].value);
        this.withBrackets = !!args[0].brackets;
    }

    perform() {
        return this.val;
    }

    static get capacity() {
        return 0;
    }

    get type() {
        return `static:${typeof this.val}`;//duck checking needed
    }

}

function checkAndRemoveBrackets(value) {
    if (typeof value !== "string") {
        return value;
    }
    const firstCh = value[0];
    const lastCh = value[value.length - 1];
    if ((firstCh === lastCh) && ((lastCh === `'`) || (lastCh === `"`))) {
        return value.substring(1, value.length - 1);
    }
    return value;
}