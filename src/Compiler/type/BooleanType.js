import { Type } from "./Type";
import { isArgNodeSubsetList } from "./helper";
import { NodeListType } from "./NodeListType";

export class BooleanType extends Type {

    static parse(arg) {
        if (typeof arg === "boolean") {
            return arg;
        }
        if (isArgNodeSubsetList(arg)) {
            return NodeListType.parse(arg).length > 0;
        }
        if (Array.isArray(arg)) {
            return arg.length > 0;
        }
        return !!arg;
    }

}