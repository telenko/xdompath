import { NodeSetPerformer } from "../NodeSetPerformer";

export class Filter extends NodeSetPerformer {

    getNodeSetList(nodeSet) {
        return [[...nodeSet].filter(node => {
            const filterResp = this.process(node, nodeSet);

            //TODO filterResp number/subset/string/etc...
            return filterResp;
        })];
    }
    
}