import { Expression } from "./Expression";
import { Axis } from "../Axis/Axis";
import { TagFilter } from "../Filter/TagFilter";

export class StaticExpression extends Expression {

    constructor(...args) {
        super(...args);
        this.val = checkAndRemoveBrackets(args[0]);
    }

    perform() {
        return this.val;
    }

    applyTo(parent) {
        if (parent instanceof Axis) {
            const tagFilter = new TagFilter();
            parent.append(tagFilter);
            tagFilter.append(this);
            return this;
        }
        return super.applyTo(parent);
    }

    static get capacity() {
        return 0;
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