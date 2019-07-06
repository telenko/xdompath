import { XpathNode } from "./XpathNode";

export class NodeSetPerformer extends XpathNode {

    perform(nodeSetList) {
        return nodeSetList.reduce((resp, nodeSet) => {
            return resp.concat(buildNodeSetList.call(this, nodeSet));
        }, []);
    }

    /**
     * 
     * @param {*} nodeSet 
     * @abstract
     */
    getNodeSetList(nodeSet) {

    }

}

function buildNodeSetList(nodeSet) {
    const newNodeSetList = this.getNodeSetList(nodeSet);
    if (!this.children.length) {
        return newNodeSetList;
    }
    return [...this.children].reduce((acc, childPerformer) => {
        return acc.concat(childPerformer.perform(newNodeSetList));
    }, []);
}
