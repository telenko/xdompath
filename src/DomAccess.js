export class DomAccess {

    static getChildNodes(node) {
        const response = new Set();
        if (node.shadowRoot) {
            response.add(node.shadowRoot);
        }
        node.childNodes.forEach(chNode => response.add(chNode));
        return [...response];
    }

    static getFollowingSibling(node) {
        if (node instanceof ShadowRoot) {
            return DomAccess.getParentOrHost(node).children[0];
        }
        return node.nextElementSibling;
    }

    static getPrecendingSibling(node) {
        const prev = node.previousElementSibling;
        if (prev) {
            return prev;
        }
        if (node instanceof ShadowRoot) {
            return null;
        }
        if (node.parentElement && node.parentElement.shadowRoot) {
            return node.parentElement.shadowRoot;
        }
    }

    static getFollowingSiblings(node) {
        const sibling = DomAccess.getFollowingSibling(node);
        const response = new Set();
        if (sibling) {
            response.add(sibling);
            const followings = DomAccess.getFollowingSiblings(sibling);
            if (followings && followings.length > 0) {
                followings.forEach(fl => response.add(fl));
            }
        }
        return [...response];
    }

    static getPrecendingSiblings(node) {
        const sibling = DomAccess.getPrecendingSibling(node);
        const response = new Set();
        if (sibling) {
            response.add(sibling);
            const prevs = DomAccess.getPrecendingSiblings(sibling);
            if (prevs && prevs.length > 0) {
                prevs.forEach(pr => response.add(pr));
            }
        }
        return [...response];
    }

    static getParentOrHost(node) {
        return node.parentNode || node.host;
    }

    static getNodeContent(node) {
        return node.nodeType === 3 ? node.textCotent : node.innerHTML;
    }

}