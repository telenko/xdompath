import { XpathNode } from "../XpathNode";

export class Expression extends XpathNode {

    perform(...args) {
        return this.children[0].perform(...args);//todo for now support only 1 item child
    }

}