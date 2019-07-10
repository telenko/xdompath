import { StringStream } from '@telenko/string-stream';
import { STORE } from './TokenStore';

const TYPES = STORE.sort((ta, tb) => {
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
        if (token.bracketOpen) {
            token.type.brackets = true;
        }
    }
    return token;
}