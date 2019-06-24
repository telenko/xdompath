import { Combiner } from "./Combiner";

export class Grouper extends Combiner {

    process(nodeSetList) {
        let response = new Set();
        nodeSetList.forEach(nodeSet => nodeSet.forEach(node => response.add(node)));
        return [[...response]];
    }

}