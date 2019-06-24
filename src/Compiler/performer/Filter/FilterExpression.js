import { Filter } from "./Filter";
import { Position } from "../Function/Position";
import { XpathNode } from "../XpathNode";
import { Expression } from "../Expression/Expression";

export class FilterExpression extends Filter {

    process(...args) {
        // checkCreateShadow.call(this);
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

    // apply(node) {
    //     if (!this.shadowRoot) {
    //         checkCreateShadow.call(this);
    //         return this.shadowRoot.apply(node);
    //     }
    //     return super.apply(node);
    // }

    getContext() {
        this.attachShadow(new Expression());
        return this.shadowRoot;
    }

}

// function checkCreateShadow() {
//     if (!this.shadowRoot) {
//         this.attachShadow(new Expression());
//     }
// }