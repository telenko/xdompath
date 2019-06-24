import { Axis } from "./Axis";

export class RootAxis extends Axis {

    process(node) {
        return [[node]];
    }
    
}