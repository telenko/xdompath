import { XpathNode } from "../XpathNode";

export class FunctionAxis extends XpathNode {

    perform(nodeSetList) {
        const newNodeSetList = [];
        nodeSetList.forEach(nodeSet => {
            newNodeSetList.push(this.shadowRoot.perform(nodeSet));
        });
        return newNodeSetList;
    }

}