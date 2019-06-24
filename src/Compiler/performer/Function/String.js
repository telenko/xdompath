import { FunctionPerformer } from "./FunctionPerformer";

export class String extends FunctionPerformer {

    process() {
        return this.node.textContent;
    }

}