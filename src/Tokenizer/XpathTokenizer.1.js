import { StringStream } from '@telenko/string-stream';

const TYPES = [
    { type: "path", rule: '/', value: "down" },
    { type: "path", rule: '//', value: "down-recursive" },
    { type: "path", rule: '.', value: "current" },
    { type: "path", rule: '*', value: "all-current" },
    { type: "path", rule: '|', value: "union" },

    { type: "relation", rule: '/child::', value: "child" },
    { type: "relation", rule: '/child-not-shadow::', value: "child-not-shadow" },
    { type: "relation", rule: '/shadow::', value: "shadow" },
    { type: "relation", rule: '/parent::', value: "parent" },
    { type: "relation", rule: '/following-sibling::', value: "following-sibling" },
    { type: "relation", rule: '/preceding-sibling::', value: "preceding-sibling" },
    { type: "relation", rule: '/following::', value: "following" },
    { type: "relation", rule: '/preceding::', value: "preceding" },
    { type: "relation", rule: '/descendant-or-self::', value: "descendant-or-self" },
    { type: "relation", rule: '/ancestor-or-self::', value: "ancestor-or-self" },
    
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
    // { type: "filter", rule: '', value: 'class' },

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
    if (!this[STREAM].isCompleted()) {
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
        token.type.value += (this[STREAM].next() || "");
        return readToken.call(this, token);
    }

    if (!tokenResp && !token) {
        token = { type: { type: "string", value: this[STREAM].read() }, ready: false };
        return readToken.call(this, token);
    }

    if (tokenResp && token && !token.ready) {
        this[STREAM].moveBack(tokenResp.type.rule.length);
        token.type.value = token.type.value.substring(0, token.type.value.length - 1);
        return prepareDynamicToken(token);
    }

    return tokenResp;
}

function prepareDynamicToken(token) {
    token.ready = true;
    if (Number.isInteger(+token.type.value)) {
        token.type.value = +token.type.value;
        token.type.type = "integer";
    } else {
        token.type.value = token.type.value.trim();
        token.type.type = "string";
    }
    return token;
}