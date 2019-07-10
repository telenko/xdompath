import { XpathNode } from "../XpathNode";
import { PerformerStore } from "../../PerformerStore";

export class Expression extends XpathNode {

    perform(...args) {
        return this.children[0].perform(...args);//todo for now support only 1 item child
    }

    apply(node) {
        if (node.type === "static:string" && !node.withBrackets) {
            const context = super.apply(PerformerStore.get({ type: "relation", value: "child" })());
            return context.apply(node);
        }
        return super.apply(node);
    }

}