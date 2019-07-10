import { Type } from "./Type";
import { isArgNodeSubsetList } from './helper';

export class NodeSubSetListType extends Type {

    static parse(arg) {
        if (isArgNodeSubsetList(arg)) {
            return arg;
        }
        if (arg instanceof Node) {
            return [[arg]];
        }
        return [arg];
    }

}