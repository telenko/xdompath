import { Axis } from "../performer/Axis/Axis";

export function axis() {
    return function (target, prop, descriptor) {
        const funcInst = target[prop];
        target[prop] = class extends Axis {

            process(...args) {
                return funcInst.call(this, ...args);
            }

        }
    }
}