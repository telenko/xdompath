import { AncestorAxis } from "./AncestorAxis";

export class AncestorOrSelf extends AncestorAxis {

    process(node) {
        const nodeSubsetList = super.process(node);
        return [[node]].concat(nodeSubsetList);
    }

}