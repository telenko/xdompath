import { FunctionPerformer } from "../performer/Function/FunctionPerformer";

export function func({ types, argsCapacity, type }={}) {
    return function (target, prop, descriptor) {
        const funcInst = target[prop];
        let Clazz = FunctionPerformer;
        if (type) {
            Clazz = type;
        }
        target[prop] = class extends Clazz {

            static get types() {
                return types;
            }

            static get argsCapacity() {
                return argsCapacity;
            }

            process(...args) {
                return funcInst.call(this, ...args);
            }

        }
    }
}