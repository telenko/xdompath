import { Axis } from "./Axis";

export class ChildAxis extends Axis {

    process(node) {//get and return a set of arrays
        const response = new Set();
        node.childNodes.forEach(chNode => response.add(chNode));
        if (node.shadowRoot) {
            response.add(node.shadowRoot);
        }
        return [[...response]];
    }
    
}