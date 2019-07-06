import { Expression } from '../Expression/Expression';
import { compile } from '../../decorator/compile';

@compile({ type: "filter", value: "attribute" })
export class AttributeOperator extends Expression {

    perform(node) {
        const attribute = this.shadowRoot.perform(node);
        return node.getAttribute ? node.getAttribute(attribute) : undefined;
    }

    apply(node) {
        if (!this.shadowRoot) {
            this.attachShadow(node.getContext());
            return this;
        }
        return super.apply(node);
    }

}