import { StringStream } from '@telenko/string-stream';

const TYPES = [
    { type: "path", rule: '/', value: "down" },
    { type: "path", rule: '//', value: "down-recursive" },
    { type: "path", rule: '/..', value: "parent" },
    { type: "path", rule: '.', value: "current" },
    { type: "path", rule: '*', value: "all-current" },
    { type: "path", rule: '|', value: "union" },

    { type: "relation", rule: '/child::', value: "child" },
    { type: "relation", rule: '/child-not-shadow::', value: "child-not-shadow" },
    { type: "relation", rule: '/parent::', value: "parent" },
    { type: "relation", rule: '/following-sibling::', value: "following-sibling" },
    { type: "relation", rule: '/preceding-sibling::', value: "preceding-sibling" },
    { type: "relation", rule: '/following::', value: "following" },
    { type: "relation", rule: '/preceding::', value: "preceding" },
    { type: "relation", rule: '/descendant::', value: "descendant" },
    { type: "relation", rule: '/descendant-or-self::', value: "descendant-or-self" },
    { type: "relation", rule: '/ancestor-or-self::', value: "ancestor-or-self" },
    { type: "relation", rule: '/ancestor::', value: "ancestor" },
    
    { type: "group", rule: '(', value: "open" },
    { type: "group", rule: ')', value: "close" },

    { type: "function", rule: 'text(', value: 'text-open' },
    { type: "function", rule: 'position(', value: 'position-open' },
    { type: "function", rule: 'not(', value: 'not-open' },
    { type: "function", rule: 'name(', value: 'name-open' },
    { type: "function", rule: 'string(', value: 'string-open' },
    { type: "function", rule: 'substring(', value: 'substring-open' },
    { type: "function", rule: 'substring-after(', value: 'substring-after-open' },
    { type: "function", rule: 'substring-before(', value: 'substring-before-open' },
    { type: "function", rule: 'string-length(', value: 'string-length-open' },
    { type: "function", rule: 'count(', value: 'count-open' },
    { type: "function", rule: 'concat(', value: 'concat-open' },
    { type: "function", rule: 'normalize-space(', value: 'normalize-space-open' },
    { type: "function", rule: 'starts-with(', value: 'starts-with-open' },
    { type: "function", rule: 'contains(', value: 'contains-open' },
    { type: "function", rule: 'translate(', value: 'translate-open' },
    { type: "function", rule: 'ceiling(', value: 'ceiling-open' },
    { type: "function", rule: 'floor(', value: 'floor-open' },
    { type: "function", rule: 'round(', value: 'round-open' },
    { type: "function", rule: 'sum(', value: 'sum-open' },

    { type: "function", rule: 'shadow(', value: 'shadow-open' },
    { type: "function", rule: 'class(', value: 'class-open' },

    { type: "filter", rule: '[', value: 'filter-open' },
    { type: "filter", rule: ']', value: 'filter-close' },
    { type: "filter", rule: '@', value: 'attribute' },

    // { type: OPERATOR, rule: ' mod ', value: 'mod' },//???
    { type: "operator", rule: '=', value: 'equal' },
    { type: "operator", rule: '>', value: 'more' },
    { type: "operator", rule: '<', value: 'less' },
    { type: "operator", rule: '>=', value: 'more-or-equal' },
    { type: "operator", rule: '<=', value: 'less-or-equal' },
    { type: "operator", rule: '+', value: 'plus' },
    { type: "operator", rule: '-', value: 'minus' },
    { type: "operator", rule: ',', value: 'comma' }
].sort((ta, tb) => {
    if (ta.rule.length < tb.rule.length) {
        return 1;
    } else {
        return -1;
    }
});

const STREAM = Symbol();
const STARTED = Symbol();

export class XpathTokenizer {

    constructor(xpathString) {
        this[STREAM] = new StringStream(xpathString);
        this[STREAM].open();
    }

    hasNext() {
        return !this[STREAM].isCompleted();
    }

    next() {
        const token = readToken.call(this) || {};
        return token.type;
    }

}

function readToken(token) {
    if (!token && this[STREAM].isCompleted()) {
        return { type: { type: "eof", value: "eof" }, ready: true };
    }
    if (token && token.ready) {
        return token;
    }
    let tokenResp;
    if (token && token.bracketOpen) {
        const value = this[STREAM].next();
        if (value === token.bracketOpen) {
            applyChar(token, value);
            token.ready = true;
            this[STREAM].next();//pointer next
            return prepareDynamicToken(token);
        }
        this[STREAM].moveBack(1);
    } else if (!this[STREAM].isCompleted()) {
        TYPES.some(type => {
            const hasType = this[STREAM].isFollowing(type.rule);
            if (hasType) {
                tokenResp = { type, ready: true };
                this[STREAM].move(type.rule.length);
            }
            return hasType;
        });
    }

    if (!tokenResp && token && !token.ready) {
        if (this[STREAM].isCompleted()) {
            return prepareDynamicToken(token);
        }
        applyChar(token, this[STREAM].next());
        return readToken.call(this, token);
    }

    if (!tokenResp && !token) {
        token = { type: { type: "string", value: '' }, ready: false };
        applyChar(token, this[STREAM].read());
        return readToken.call(this, token);
    }

    if (tokenResp && token && !token.ready) {
        this[STREAM].moveBack(tokenResp.type.rule.length);
        token.type.value = token.type.value.substring(0, token.type.value.length - 1);
        token = prepareDynamicToken(token);
        if (typeof token.type.value === "string" && !token.type.value.trim()) {
            return readToken.call(this);
        }
        return token;
    }

    return tokenResp;
}

function applyChar(token, char) {
    if (typeof char !== "string") {
        return;
    }
    if (!token.type.value || !token.type.value.trim()) {
        if (char === `"` || char === `'`) {
            token.bracketOpen = char;
        }
    }
    token.type.value += char;
}

function prepareDynamicToken(token) {
    token.ready = true;
    const trimmedValue = token.type.value.trim();
    if (trimmedValue !== "" && Number.isInteger(+trimmedValue)) {
        token.type.value = +token.type.value;
        token.type.type = "integer";
    } else {
        token.type.value = trimmedValue;
        token.type.type = "string";
    }
    return token;
}