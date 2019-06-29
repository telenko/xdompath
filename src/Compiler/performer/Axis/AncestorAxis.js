import { Axis } from "./Axis";
import { DomAccess } from "../../../DomAccess";

export class AncestorAxis extends Axis {

    process(node) {
        const response = new Set();
        let context = node;
        while(DomAccess.getParentOrHost(context)) {
            let parent = DomAccess.getParentOrHost(context);
            response.add(parent);
            context = parent;
        }
        return [[...response]];
    }

}