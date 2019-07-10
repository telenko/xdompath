import { Expression } from "../Expression/Expression";
import { Axis } from "../Axis/Axis";
import { DomAccess } from "../../../DomAccess";
import { compile } from "../../decorator/compile";
import { NodeSubSetListType } from "../../type/NodeSubSetListType";

@compile({ type: "path", value: "current" })
export class DotOperator extends Expression {

    process(node) {
        return [[node]];
    }

    perform(arg) {
        const nodeSubSetList = NodeSubSetListType.parse(arg);
        if (this.children.length > 0 && this.children[0] instanceof Axis) {
            return Axis.prototype.perform.call(this, nodeSubSetList);
        }
        if (nodeSubSetList.length > 0 && nodeSubSetList[0].length > 0) {
            return DomAccess.getNodeContent(nodeSubSetList[0][0]);
        }
        return "";
    }

    getNodeSetList(...args) {
        return Axis.prototype.getNodeSetList.call(this, ...args);
    }
    
}