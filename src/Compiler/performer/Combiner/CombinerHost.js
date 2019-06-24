import { XpathNode } from '../XpathNode';
import { Grouper } from './Grouper';

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

    // apply(node) {
    //     if (!this.shadowRoot) {
    //         checkCreateShadow.call(this);
    //         return this.shadowRoot.apply(node);
    //     }
    //     return super.apply(node);
    // }

    getContext() {
        this.attachShadow(new Grouper());//TODO support other combiner-s
        return this.shadowRoot;
    }

}

// function checkCreateShadow() {
//     if (!this.shadowRoot) {
//         this.attachShadow(new Grouper());//TODO support other combiner-s
//     }
// }