import { XpathNode } from "../XpathNode";

export class Combiner extends XpathNode {

    perform(nodeSetList) {//TODO refactor to reuse common code
        if (!this.children.length) {
            return nodeSetList;
        }
        const newNodeSetList = [...this.children].reduce((acc, childPerformer) => {
            return acc.concat(childPerformer.perform(nodeSetList));
        }, []);
        return this.process(newNodeSetList);
    }

}