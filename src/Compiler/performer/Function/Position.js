import { FunctionPerformer } from "./FunctionPerformer";
import { IntegerType } from "../../type/IntegerType";
import { compile } from "../../decorator/compile";

@compile({ type: "function", value: "position-open" })
export class Position extends FunctionPerformer {

    perform(node, nodeSet) {
        return node ? [...nodeSet].indexOf(node) + 1 : 1;
    }

    static get types() {
        return [IntegerType];
    }

}