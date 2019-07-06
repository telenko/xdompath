import { Axis } from "../performer/Axis/Axis";
import { Filter } from "../performer/Filter/Filter";
import { FunctionPerformer } from "../performer/Function/FunctionPerformer";
import { XpathNode } from "../performer/XpathNode";
import { FilterExpression } from "../performer/Filter/FilterExpression";
import { CombinerHost } from "../performer/Combiner/CombinerHost";
import { FunctionAxis } from "../performer/Function/FunctionAxis";

const ROOT = Symbol();
const CURRENT = Symbol();
const CHILDREN = Symbol();
export class XpathAST {

    apply(item) {
        if (!(item instanceof XpathNode)) {
            return;
        }
        if (!this[ROOT]) {
            this[ROOT] = item;
            this[CURRENT] = item;
            return;
        }

        this[CURRENT] = this[CURRENT].apply(item);
    }

    process(node) {
        this[CURRENT] = this[ROOT];
        let response = new Set();
        const subsetList = this[ROOT].perform([[node]]);
        subsetList.forEach(subset => {
            subset.forEach(node => response.add(node));
        });
        return [...response];
    }

    walk(handler) {
        if (!this[ROOT]) {
            return;
        }
        runRecursive.call(this, this[ROOT], handler);
    }

    get current() {
        return this[CURRENT];
    }

    set current(item) {
        this[CURRENT] = item;
    }

    get parent() {
        return this.getParent(this[CURRENT]);
    }

    get children() {
        return this.getChildren(this[CURRENT]);
    }

    getChildren(item) {
        return item[CHILDREN];
    }

    getParent(item) {
        return item.parent;
    }

    up() {
        this[CURRENT] = this.parent;
    }

    upUntil(callback) {
        this.up();
        if (callback(this[CURRENT])) {
            return;
        }
        this.upUntil(callback);
    }

    upUntilHost() {
        const upToHost = () => {
            if (this.current.host) {
                this.current = this.current.host;
                return true;
            }
        }
        const walkComplete = upToHost();
        if (walkComplete) {
            return;
        }
        this.upUntil(node => !!node.host);
        upToHost();
    }

    upUntilGroup() {
        this.upUntilHost();
        if (this.current instanceof CombinerHost) {
            return;
        }
        if (this.current instanceof FunctionPerformer) {
            if (this.current.host instanceof FunctionAxis) {
                this.upUntilHost();
            }
            return;
        }
        this.upUntilGroup();
    }

    upUntilFilter() {
        this.upUntilHost();
        if (this.current instanceof FilterExpression) {
            return;
        }
        this.upUntilFilter();
    }

    get currentAxis() {
        return this[CURRENT] instanceof Axis;
    }

    get currentFilter() {
        return this[CURRENT] instanceof Filter;
    }

    toString() {
        let resp = '';
        this.walk(it => {
            resp += ':item=' + (it === this[ROOT]) + it;
        });
        return resp;
    }

}

function runRecursive(node, handler) {
    handler(node);
    if (node[CHILDREN]) {
        [...node[CHILDREN]].forEach(item => {
            runRecursive.call(this, item, handler);
        });
    }
}