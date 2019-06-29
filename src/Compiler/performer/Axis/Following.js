import { Axis } from "./Axis";
import { DomAccess } from "../../../DomAccess";

export class Following extends Axis {

    process(node) {
        return [getFollowings(node)];
    }

}

function getFollowings(node) {
    let response = DomAccess.getFollowingSiblings(node);
    let childs = [];
    response.forEach(node => {
        childs = childs.concat(getNodesRecursive(node));
    });
    response = response.concat(childs);
    const parent = DomAccess.getParentOrHost(node);
    if (parent) {
        response = response.concat(getFollowings(parent));
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
