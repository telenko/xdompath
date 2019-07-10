import { FunctionPerformer } from "./FunctionPerformer";
import { IntegerType } from "../../type/IntegerType";
import { compile } from "../../decorator/compile";

@compile({ type: "function", value: "last-open" })
export class Last extends FunctionPerformer {

    perform(node, nodeSet) {
        return nodeSet.length;
    }

    static get argsCapacity() {
        return 0;
    }

}