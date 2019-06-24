import { Axis } from "../performer/Axis/Axis";
import { Filter } from "../performer/Filter/Filter";
import { FunctionPerformer } from "../performer/Function/FunctionPerformer";
import { XpathNode } from "../performer/XpathNode";
import { FilterExpression } from "../performer/Filter/FilterExpression";
import { CombinerHost } from "../performer/Combiner/CombinerHost";

const ROOT = Symbol();
const CURRENT = Symbol();
const CHILDREN = Symbol();
// const PARENT = Symbol();
export class XpathAST {

    apply(item) {//TODO refactor!!!!        //append??
        if (!(item instanceof XpathNode)) {
            return;
        }
        if (!this[ROOT]) {
            this[ROOT] = item;
            this[CURRENT] = item;
            return;
        }

        this[CURRENT] = this[CURRENT].apply(item);
        // this[CURRENT] = item.applyTo(this[CURRENT]);

        // if (this[CURRENT] instanceof PrioritizedOperator && this[CURRENT].children.length > this[CURRENT].constructor.capacity) {
        //     this.up();
        // }

        // if (this[CURRENT] instanceof Axis && item instanceof FunctionPerformer) {
        //     const funcAxis = new FunctionAxis();
        //     this[CURRENT].append(funcAxis);
        //     funcAxis.attachShadow(item);
        // } else if (item instanceof PrioritizedOperator) {
        //     this[CURRENT].replaceWith(item);
        // } else if (this[CURRENT] instanceof AttributeOperator) {
        //     this[CURRENT].attachShadow(item);
        // } else {
        //     this[CURRENT].append(item); 
        // }
        // this[CURRENT] = item;
        
        // if (item instanceof FunctionPerformer || item instanceof CombinerHost || item instanceof FilterExpression) {
        //     let shadowRoot;
        //     if (item instanceof FunctionPerformer) {
        //         shadowRoot = new Arguments();
        //     } else if (item instanceof FilterExpression) {
        //         shadowRoot = new Expression();
        //     } else {
        //         shadowRoot = new Grouper();
        //     }
        //     item.attachShadow(shadowRoot);
        //     this[CURRENT] = shadowRoot;
        // }
    }

    upContext() {
        this[CURRENT] = this[CURRENT].getParentContext();
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
        if ((this.current instanceof CombinerHost) || (this.current instanceof FunctionPerformer)) {
            return;
        }
        this.upUntilGroup();
    }

    upUntilFilter() {
        this.upUntilHost();
        if (this.current instanceof FilterExpression) {
            return;
        }
        this.upUntilGroup();
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