import { Type } from "./Type";
import { isArgNodeSubsetList } from "./helper";
import { NodeListType } from "./NodeListType";

export class StringType extends Type {

    static parse(arg) {
        if (isArgNodeSubsetList(arg)) {
            return arg[0][0].textContent;
        }
        let nodeList = NodeListType.parse(arg);
        if (nodeList && nodeList.length > 0) {
            return nodeList[0].textContent;
        }
        return String(arg);
    }

}