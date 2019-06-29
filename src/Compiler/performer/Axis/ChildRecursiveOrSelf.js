import { ChildRecursiveAxis } from "./ChildRecursiveAxis";

export class ChildRecursiveOrSelf extends ChildRecursiveAxis {
 
    process(node) {
        const downList = super.process(node);
        return [[node]].concat(downList);
    }

}