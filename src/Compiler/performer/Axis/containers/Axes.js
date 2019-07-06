import { axis } from "../../../decorator/axis";
import { DomAccess } from "../../../../DomAccess";
import { compile } from "../../../decorator/compile";
import { NodeListType } from "../../../type/NodeListType";

export class Axes {

    @compile({ type: "relation", value: "ancestor" })
    @axis()
    ancestor(node) {
        return getAncestors(node);
    }

    @compile({ type: "relation", value: "ancestor-or-self" })
    @axis()
    ancestorOrSelf(node) {
        return [[node]].concat(getAncestors(node));
    }

    @compile({ type: "path", value: "down" })
    @compile({ type: "relation", value: "child" })
    @axis()
    child(node) {
        return [[...DomAccess.getChildNodes(node)]];
    }
    
    @compile({ type: "relation", value: "descendant" })
    @axis()
    descendant(node) {
        return getDescendants(node);
    }

    @compile({ type: "path", value: "down-recursive" })
    @compile({ type: "relation", value: "descendant-or-self" })
    @axis()
    descendantOrSelf(node) {
        return [[node]].concat(getDescendants(node));
    }

    @compile({ type: "relation", value: "following" })
    @axis()
    following(node) {
        return [getFollowings(node)];
    }

    @compile({ type: "relation", value: "following-sibling" })
    @axis()
    followingSibling(node) {
        return [DomAccess.getFollowingSiblings(node)];
    }

    @compile({ type: "path", value: "parent" })
    @compile({ type: "relation", value: "parent" })
    @axis()
    parent(node) {
        return [[DomAccess.getParentOrHost(node)]];
    }

    @compile({ type: "relation", value: "preceding" })
    @axis()
    preceding(node) {
        return [getPrecedings(node)];
    }

    @compile({ type: "relation", value: "preceding-sibling" })
    @axis()
    precedingSibling(node) {
        return [DomAccess.getPrecendingSiblings(node)];
    }

}

function getAncestors(node) {
    const response = new Set();
    let context = node;
    while(DomAccess.getParentOrHost(context)) {
        let parent = DomAccess.getParentOrHost(context);
        response.add(parent);
        context = parent;
    }
    return [[...response]];
}

function getDescendants(node) {
    let list = [];
    const response = DomAccess.getChildNodes(node);
    list.push(response);
    if (response.length) {
        response.forEach(chNode => {
            list = list.concat(getDescendants(chNode));
        });
    }
    return list;
}

function getFollowings(node) {
    let response = DomAccess.getFollowingSiblings(node);
    let childs = [];
    response.forEach(node => {
        childs = childs.concat(NodeListType.parse(getDescendants(node)));
    });
    response = response.concat(childs);
    const parent = DomAccess.getParentOrHost(node);
    if (parent) {
        response = response.concat(getFollowings(parent));
    }
    return response;
}

function getPrecedings(node) {
    let response = DomAccess.getPrecendingSiblings(node);
    let childs = [];
    response.forEach(node => {
        childs = childs.concat(NodeListType.parse(getDescendants(node)));
    });
    response = response.concat(childs);
    const parent = DomAccess.getParentOrHost(node);
    if (parent) {
        response.push(parent);
        response = response.concat(getPrecedings(parent));
    }
    return response;
}