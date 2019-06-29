import { Filter } from "./Filter";

export class TagFilter extends Filter {

    constructor() {
        super();
    }

    process(node) {
        return node.tagName && (node.tagName.toLowerCase() === this.shadowRoot.perform(node).toLowerCase());
    }

}