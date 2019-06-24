import { FunctionPerformer } from "./FunctionPerformer";

export class Contains extends FunctionPerformer {

    process(str1, str2) {
        if (!str1 || !str2) {
            return false;
        }
        return str1.includes(str2);
    }

}