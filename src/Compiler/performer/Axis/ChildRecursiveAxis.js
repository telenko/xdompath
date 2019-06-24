import { Axis } from "./Axis";

export class ChildRecursiveAxis extends Axis {

    process(node) {//get and return a set of arrays
        return getNodeSetList.call(this, node);
    }
    
}

function getNodeSetList(node) {
    let list = [];
    const response = new Set();
    node.childNodes.forEach(chNode => response.add(chNode));
    if (node.shadowRoot) {
        response.add(node.shadowRoot);
    }
    list.push([...response]);
    if (response.size) {
        response.forEach(chNode => {
            list = list.concat(getNodeSetList.call(this, chNode));
        });
    }
    return list;
}