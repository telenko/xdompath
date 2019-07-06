import { Expression } from "../Expression/Expression";
import { Axis } from "../Axis/Axis";
import { DomAccess } from "../../../DomAccess";
import { compile } from "../../decorator/compile";

@compile({ type: "path", value: "current" })
export class DotOperator extends Expression {

    process(node) {
        return [[node]];
    }

    perform(arg) {
        let node;
        if (Array.isArray(arg) && arg.length === 1 && arg[0] && arg[0].length === 1) {
            node = arg[0][0];
        } else {
            node = arg;
        }

        if (this.children.length > 0 && this.children[0] instanceof Axis) {
            return Axis.prototype.perform.call(this, [[node]]);
        }
        return DomAccess.getNodeContent(node);
    }

    getNodeSetList(...args) {
        return Axis.prototype.getNodeSetList.call(this, ...args);
    }
    
}