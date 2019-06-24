import { NodeListFunction } from "./NodeListFunction";

export class ShadowNodes extends NodeListFunction {

    process(nodes) {
        return nodes.filter(node => node instanceof ShadowRoot);
    }

}