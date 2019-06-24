const CHILDREN = Symbol();
const SHADOW_ROOT = Symbol();
const PARENT = Symbol();
const HOST = Symbol();

export class XpathNode {

    constructor() {
        this[CHILDREN] = new Set();
    }

    static get capacity() {
        return Infinity;
    }

    apply(node) {
        const context = node.getContext();
        let container = this;
        const maxCapacity = this.constructor.capacity;
        if (this[CHILDREN].size >= maxCapacity) {
            container = this.parent || this.host;
        }
        if (!container) {
            return null;
        }
        container.append(node);
        return context;
    }

    getContext() {
        return this;
    }

    getParentContext() {
        return this.parent;
    }

    append(node) {
        this[CHILDREN].add(node);
        node[PARENT] = this;
    }

    attachShadow(node) {
        this[SHADOW_ROOT] = node || new XpathNode();
        this[SHADOW_ROOT][HOST] = this;
    }

    replaceWith(node) {
        const parent = this[PARENT];
        parent.remove(this);
        parent.append(node);
        node.append(this);
    }

    replaceWithParent() {
        const parent = this[PARENT];
        const parentOfParent = parent[PARENT];
        parentOfParent.remove(parent);
        parentOfParent.append(this);
        this.append(parent);
    }

    remove(node) {
        this[CHILDREN].delete(node);
    }

    get children() {
        return [...this[CHILDREN]];
    }

    get parent() {
        return this[PARENT];
    }

    get previousSibling() {
        const idx = this.parent.children.indexOf(this);
        if (idx === 0) {
            return null;
        }
        this.parent.children[idx - 1];
    }

    get lastChild() {
        const { children } = this.parent;
        return children[children.length - 1];
    }

    get shadowRoot() {
        return this[SHADOW_ROOT];
    }

    get host() {
        return this[HOST];
    }

    get isShadow() {
        return !!this.host;
    }

    /**
     * @abstract
     */
    perform() {

    }

}