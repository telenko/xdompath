import { Filter } from "./Filter";
import { StaticExpression } from "../Expression/StaticExpression";

export class TagFilter extends Filter {

    constructor() {
        super();
    }

    process(node) {
        return node.tagName && (node.tagName.toLowerCase() === this.shadowRoot.perform(node).toLowerCase());
    }

}