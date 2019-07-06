import { XpathNode } from '../XpathNode';
import { Grouper } from './Grouper';
import { compile } from '../../decorator/compile';

@compile({ type: "group", value: "open" })
export class CombinerHost extends XpathNode {

    perform(nodeSetList) {
        const newNodeSetList = this.shadowRoot.perform(nodeSetList);
        if (!this.children.length) {
            return newNodeSetList;
        }
        return [...this.children].reduce((acc, childPerformer) => {
            return acc.concat(childPerformer.perform(newNodeSetList));
        }, []);
    }

    getContext() {
        this.attachShadow(new Grouper());//TODO support other combiner-s
        return this.shadowRoot;
    }

}