import { FunctionPerformer } from "./FunctionPerformer";

export class Position extends FunctionPerformer {

    perform(node, nodeSet) {
        return node ? [...nodeSet].indexOf(node) + 1 : 1;
    }

}