import { Filter } from "./Filter";
import { Position } from "../Function/Position";
import { Expression } from "../Expression/Expression";

export class FilterExpression extends Filter {

    process(...args) {
        const expressionValue = this.shadowRoot.perform(...args);
        if (Number.isInteger(expressionValue)) {
            const positionPerformer = new Position();
            positionPerformer.attachShadow();//making fake position node -> TODO reflect on tree structure instead!
            return positionPerformer.perform(...args) === expressionValue;
        } else if (Array.isArray(expressionValue)){
            return expressionValue.length > 0;
        } else if (typeof expressionValue === "boolean") {
            return expressionValue;
        }
    }

    getContext() {
        this.attachShadow(new Expression());
        return this.shadowRoot;
    }

}