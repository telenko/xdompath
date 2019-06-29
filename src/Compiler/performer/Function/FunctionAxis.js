import { XpathNode } from "../XpathNode";

export class FunctionAxis extends XpathNode {

    perform(nodeSetList) {
        const newNodeSetList = [];
        nodeSetList.forEach(nodeSet => {
            newNodeSetList.push(this.shadowRoot.perform(nodeSet));
        });
        if (!this.children.length) {
            return newNodeSetList;
        }
        return [...this.children].reduce((acc, childPerformer) => {
            return acc.concat(childPerformer.perform(newNodeSetList));
        }, []);
    }

}