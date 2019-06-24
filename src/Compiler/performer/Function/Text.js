import { NodeListFunction } from "./NodeListFunction";

export class Text extends NodeListFunction {

    process(nodes) {
        return nodes.filter(node => node.nodeType === 3);
    }

}