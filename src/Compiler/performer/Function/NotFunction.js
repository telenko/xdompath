import { FunctionPerformer } from "./FunctionPerformer";

export class NotFunction extends FunctionPerformer {

    process(argV) {
        return !argV;
    }

}