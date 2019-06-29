import { FunctionPerformer } from "./FunctionPerformer";
import { Axis } from "../Axis/Axis";
import { FunctionAxis } from "./FunctionAxis";

export class NodeListFunction extends FunctionPerformer {

    perform(arg1) {
        const parent = (this.parent || this.host);
        const insideAxis = (parent instanceof Axis) || (parent instanceof FunctionAxis);
        return this.process(insideAxis ? arg1 : arg1.childNodes);
    }

}