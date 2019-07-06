import { PrioritizedOperator } from "../performer/Operator/PrioritizedOperator";

export function prioritizedOperator() {
    return function (target, prop, descriptor) {
        const funcInst = target[prop];
        target[prop] = class extends PrioritizedOperator {

            process(...args) {
                return funcInst.call(this, ...args);
            }

        }
    }
}