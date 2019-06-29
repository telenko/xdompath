import { Axis } from "./Axis";
import { DomAccess } from "../../../DomAccess";

export class ChildAxis extends Axis {

    process(node) {//get and return a set of arrays
        return [[...DomAccess.getChildNodes(node)]];
    }
    
}