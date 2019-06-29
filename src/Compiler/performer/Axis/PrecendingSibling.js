import { Axis } from "./Axis";
import { DomAccess } from "../../../DomAccess";

export class PrecendingSibling extends Axis {
    
    process(node) {
        return [DomAccess.getPrecendingSiblings(node)];
    }

}