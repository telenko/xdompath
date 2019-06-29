import { Axis } from "./Axis";
import { DomAccess } from "../../../DomAccess";

export class ChildRecursiveAxis extends Axis {

    process(node) {//get and return a set of arrays
        return getNodeSetList.call(this, node);
    }
    
}

function getNodeSetList(node) {
    let list = [];
    const response = DomAccess.getChildNodes(node);
    list.push(response);
    if (response.length) {
        response.forEach(chNode => {
            list = list.concat(getNodeSetList.call(this, chNode));
        });
    }
    return list;
}