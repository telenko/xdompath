import { Type } from "./Type";

export class NumberType extends Type {

    static parse(arg) {
        return Number(arg);
    }

}