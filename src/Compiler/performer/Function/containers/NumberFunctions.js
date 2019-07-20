import { func } from "../../../decorator/func";
import { compile } from "../../../decorator/compile";
import { NumberType } from "../../../type/NumberType";

export class NumberFunctions {

    @compile({ type: "function", value: "ceiling-open" })
    @func({ types: [NumberType], argsCapacity: 1 })
    ceiling(numb) {
        return Math.ceil(numb);
    }

    @compile({ type: "function", value: "floor-open" })
    @func({ types: [NumberType], argsCapacity: 1 })
    floor(numb) {
        return Math.floor(numb);
    }

    @compile({ type: "function", value: "round-open" })
    @func({ types: [NumberType], argsCapacity: 1 })
    round(numb) {
        return Math.round(numb);
    }

}