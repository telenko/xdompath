import { Axis } from "./Axis";

export class CurrentAxis extends Axis {

    process(node) {
        return [[node]];
    }
    
}