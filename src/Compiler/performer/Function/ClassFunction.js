import { FunctionPerformer } from "./FunctionPerformer";

export class ClassFunction extends FunctionPerformer {

    process(className) {
        return this.node.classList.contains(className);
    }

    static get argsCapacity() {
        return 1;
    }

}