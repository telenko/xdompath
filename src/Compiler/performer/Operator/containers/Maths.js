import { compile } from "../../../decorator/compile";
import { prioritizedOperator } from "../../../decorator/prioritizedOperator";

export class Maths {

    @compile({ type: "operator", value: "plus" })
    @prioritizedOperator()
    add(a, b) {
        return a + b;
    }

}