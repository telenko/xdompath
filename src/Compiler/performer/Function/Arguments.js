import { Expression } from "../Expression/Expression";

export class Arguments extends Expression {

    perform(...args) {
        return this.children.map(child => child.perform(...args));
    }

}