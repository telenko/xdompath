import { Axis } from "./Axis";
import { DomAccess } from "../../../DomAccess";

export class Precending extends Axis {

    process(node) {
        return [getPrevs(node)];
    }

}

function getPrevs(node) {
    let response = DomAccess.getPrecendingSiblings(node);
    let childs = [];
    response.forEach(node => {
        childs = childs.concat(getNodesRecursive(node));
    });
    response = response.concat(childs);
    const parent = DomAccess.getParentOrHost(node);
    if (parent) {
        response.push(parent);
        response = response.concat(getPrevs(parent));
    }
    return response;
}

function getNodesRecursive(node) {
    let response = DomAccess.getChildNodes(node);
    if (response && response.length > 0) {
        response.forEach(node => {
            response = response.concat(DomAccess.getChildNodes(node));
        });
    }
    return response;
}
