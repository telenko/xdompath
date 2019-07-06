import { Type } from "./Type";

export class IntegerType extends Type {

    static parse(arg) {
        return Number(arg);
    }

}