import { XpathAST } from "./tree/Xpath.ast";
import { StaticExpression } from "./performer/Expression/StaticExpression";
import { RootAxis } from "./performer/Axis/RootNode";

import "./performer/Function";
import "./performer/Axis";
import "./performer/Operator";
import "./performer/Filter";
import "./performer/Combiner";
import { PerformerStore } from "./PerformerStore";


const TOKENIZER = Symbol();
const TREE = Symbol();

export class Compiler {

    constructor(tokenizer) {
        this[TOKENIZER] = tokenizer;
        this[TREE] = new XpathAST();
    }

    compile() {
        this[TREE].apply(new RootAxis());
        const tokens = getTokens.call(this);
        tokens.forEach(token => {
            const confBuilder = PerformerStore.get(token);
            if (confBuilder) {
                this[TREE].apply(confBuilder());
                return;
            }
            switch(token.type) {
                case "filter": {
                    switch(token.value) {
                        case "filter-close": {
                            this[TREE].upUntilFilter();
                            break;
                        }
                    }
                    break;
                }
                case "integer": {
                    this[TREE].apply(new StaticExpression(token));
                    break;
                }
                case "group": {
                    switch (token.value) {
                        case "close": {
                            this[TREE].upUntilGroup();
                            break;
                        }
                    }
                    break;
                }
                case "string": {
                    this[TREE].apply(new StaticExpression(token));
                    break;
                }
                case "operator": {
                    switch (token.value) {
                        case "comma": {
                            this[TREE].up();
                            break;
                        }
                    }
                    break;
                }
            }
        });
        return this[TREE];
    }

    process(node) {
        return this[TREE].process(node);
    }

}

function getTokens() {
    const tokens = [];
    while(this[TOKENIZER].hasNext()) {
        tokens.push(this[TOKENIZER].next());
    }
    return tokens;
}