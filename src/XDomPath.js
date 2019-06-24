import { XpathTokenizer } from './Tokenizer/XpathTokenizer';
import { Compiler } from './Compiler/Compiler';

const TREE = Symbol();
export class XDomPath {

    constructor(query) {
        const tokenizer = new XpathTokenizer(query);
        this[TREE] = new Compiler(tokenizer).compile();
    }

    perform(node) {
        return this[TREE].process(node);
    }

    defineFunction() {
        //TODO
    }

}