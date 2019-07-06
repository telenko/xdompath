import { func } from "../../../decorator/func";
import { BooleanType } from "../../../type/BooleanType";
import { compile } from "../../../decorator/compile";

export class BoolFunctionContainer {

    @compile({ type: "function", value: "not-open" })
    @func({ types: [BooleanType], argsCapacity: 1 })
    not(a) {
        return !a;
    }

}