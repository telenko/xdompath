import { Axis } from "./Axis";

export class ParentAxis extends Axis {

    process(node) {
        const response = node && node.parentNode ? [node.parentNode] : [];
        return [response];
    }
    
}