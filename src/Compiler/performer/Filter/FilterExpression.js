import { Filter } from "./Filter";
import { Position } from "../Function/Position";
import { Expression } from "../Expression/Expression";
import { BooleanType } from "../../type/BooleanType";
import { compile } from "../../decorator/compile";

@compile({ type: "filter", value: "filter-open" })
export class FilterExpression extends Filter {

    process(...args) {
        const expressionValue = this.shadowRoot.perform(...args);
        if (Number.isInteger(expressionValue)) {
            const positionPerformer = new Position();
            positionPerformer.attachShadow();//making fake position node -> TODO reflect on tree structure instead!
            return positionPerformer.perform(...args) === expressionValue;
        } else {
            return BooleanType.parse(expressionValue);
        }
    }

    getContext() {
        this.attachShadow(new Expression());
        return this.shadowRoot;
    }

}