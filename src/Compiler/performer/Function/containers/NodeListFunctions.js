import { NodeListFunction } from "../NodeListFunction";
import { compile } from "../../../decorator/compile";
import { func } from "../../../decorator/func";
import { NodeListType } from "../../../type/NodeListType";

export class NodeListFunctions {

    @compile({ type: "function", value: "shadow-open" })
    @func({ type: NodeListFunction, types: [NodeListType] })
    shadow(nodes) {
        return nodes.filter(node => node instanceof ShadowRoot);
    }

    @compile({ type: "function", value: "text-open" })
    @func({ type: NodeListFunction, types: [NodeListType] })
    text(nodes) {
        return nodes.filter(node => node.nodeType === 3);
    }

}