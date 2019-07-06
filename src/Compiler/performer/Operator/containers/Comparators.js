import { prioritizedOperator } from "../../../decorator/prioritizedOperator";
import { compile } from "../../../decorator/compile";

export class Comparators {

    @compile({ type: "operator", value: "equal" })
    @prioritizedOperator()
    equalize(a, b) {
        return a == b;
    }

    @compile({ type: "operator", value: "more" })
    @prioritizedOperator()
    more(a, b) {
        return a > b;
    }

    @compile({ type: "operator", value: "less" })
    @prioritizedOperator()
    less(a, b) {
        return a < b;
    }

    @compile({ type: "operator", value: "more-or-equal" })
    @prioritizedOperator()
    moreOrEqual(a, b) {
        return a >= b;
    }

    @compile({ type: "operator", value: "less-or-equal" })
    @prioritizedOperator()
    lessOrEqual(a, b) {
        return a <= b;
    }

}