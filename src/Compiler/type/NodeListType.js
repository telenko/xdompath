import { Type } from "./Type";
import { isArgNodeSubsetList } from "./helper";

export class NodeListType extends Type {

    static parse(arg) {
        if (isArgNodeSubsetList(arg)) {
            const childNodesResp = new Set();
            arg.forEach(list => {
                if (Array.isArray(list)) {
                    list.forEach(node => node && childNodesResp.add(node));
                }
            });
            return [...childNodesResp];
        }
        if (Array.isArray(arg) && arg.length > 0 && arg[0] instanceof Node) {
            return arg;
        }
        return [];
    }

}