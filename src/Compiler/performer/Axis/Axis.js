import { NodeSetPerformer } from "../NodeSetPerformer";
import { FunctionPerformer } from "../Function/FunctionPerformer";
import { FunctionAxis } from "../Function/FunctionAxis";
import { StaticExpression } from "../Expression/StaticExpression";
import { TagFilter } from "../Filter/TagFilter";

export class Axis extends NodeSetPerformer {

    getNodeSetList(nodeSet) {
        return [...nodeSet].reduce((resp, node) => resp.concat(this.process(node, nodeSet) || []), []);
    }

    apply(node) {
        const context = node.getContext();
        if (node instanceof FunctionPerformer) {
            const funcAxis = new FunctionAxis();
            this.append(funcAxis);
            funcAxis.attachShadow(node);
            return context;
        } else if (node instanceof StaticExpression) {
            const tagFilter = new TagFilter();
            this.apply(tagFilter);
            tagFilter.attachShadow(node);
            return context;
        }
        return super.apply(node);
    }

}