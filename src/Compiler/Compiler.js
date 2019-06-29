import { ChildAxis } from "./performer/Axis/ChildAxis";
import { XpathAST } from "./tree/Xpath.ast";
import { CurrentAxis } from "./performer/Axis/CurrentAxis";
import { ParentAxis } from "./performer/Axis/ParentAxis";
import { StaticExpression } from "./performer/Expression/StaticExpression";
import { FilterExpression } from "./performer/Filter/FilterExpression";
import { RootAxis } from "./performer/Axis/RootNode";
import { Text } from "./performer/Function/Text";
import { ChildRecursiveAxis } from "./performer/Axis/ChildRecursiveAxis";
import { String } from "./performer/Function/String";
import { Contains } from "./performer/Function/Contains";
import { CombinerHost } from "./performer/Combiner/CombinerHost";
import { AttributeOperator } from "./performer/Operator/AttributeOperator";
import { Equalizer } from "./performer/Operator/Equalizer";
import { ShadowNodes } from "./performer/Function/ShadowNodes";
import { ClassFunction } from "./performer/Function/ClassFunction";
import { FollowingSibling } from "./performer/Axis/FollowingSibling";
import { Following } from "./performer/Axis/Following";
import { ChildRecursiveOrSelf } from "./performer/Axis/ChildRecursiveOrSelf";
import { AncestorAxis } from "./performer/Axis/AncestorAxis";
import { AncestorOrSelf } from "./performer/Axis/AncestorOrSelf";
import { Precending } from "./performer/Axis/Precending";
import { PrecendingSibling } from "./performer/Axis/PrecendingSibling";
import { NotFunction } from "./performer/Function/NotFunction";

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
            switch(token.type) {
                case "path": {
                    switch(token.value) {
                        case "down": {
                            this[TREE].apply(new ChildAxis());
                            break;
                        }
                        case "down-recursive": {
                            this[TREE].apply(new ChildRecursiveOrSelf());
                            break;
                        }
                        case "current": {
                            this[TREE].apply(new CurrentAxis());
                            break;
                        }
                        case "parent": {
                            this[TREE].apply(new ParentAxis());
                            break;
                        }
                    }
                    break;
                }
                case "relation": {
                    switch(token.value) {
                        case "child": {
                            this[TREE].apply(new ChildAxis());
                            break;
                        }
                        case "parent": {
                            this[TREE].apply(new ParentAxis());
                            break;
                        }
                        case "following-sibling": {
                            this[TREE].apply(new FollowingSibling());
                            break;
                        }
                        case "following": {
                            this[TREE].apply(new Following());
                            break;
                        }
                        case "descendant": {
                            this[TREE].apply(new ChildRecursiveAxis());
                            break;
                        }
                        case "descendant-or-self": {
                            this[TREE].apply(new ChildRecursiveOrSelf());
                            break;
                        }
                        case "ancestor": {
                            this[TREE].apply(new AncestorAxis());
                            break;
                        }
                        case "ancestor-or-self": {
                            this[TREE].apply(new AncestorOrSelf());
                            break;
                        }
                        case "preceding": {
                            this[TREE].apply(new Precending());
                            break;
                        }
                        case "preceding-sibling": {
                            this[TREE].apply(new PrecendingSibling());
                            break;
                        }
                    }
                    break;
                }
                case "filter": {
                    switch(token.value) {
                        case "filter-open": {
                            this[TREE].apply(new FilterExpression());
                            break;
                        }
                        case "filter-close": {
                            this[TREE].upUntilFilter();
                            break;
                        }
                        case "attribute": {
                            this[TREE].apply(new AttributeOperator());
                            break;
                        }
                    }
                    break;
                }
                case "integer": {
                    this[TREE].apply(new StaticExpression(token.value));
                    break;
                }
                case "group": {
                    switch (token.value) {
                        case "open": {
                            this[TREE].apply(new CombinerHost());
                            break;
                        }
                        case "close": {
                            this[TREE].upUntilGroup();
                            break;
                        }
                    }
                    break;
                }
                case "string": {
                    this[TREE].apply(new StaticExpression(token.value));
                    break;
                }
                case "function": {
                    switch (token.value) {
                        case "text-open": {
                            this[TREE].apply(new Text());
                            break;
                        }
                        case "string-open": {
                            this[TREE].apply(new String());
                            break;
                        }
                        case "contains-open": {
                            this[TREE].apply(new Contains());
                            break;
                        }
                        case "not-open": {
                            this[TREE].apply(new NotFunction());
                            break;
                        }
                        case "shadow-open": {
                            this[TREE].apply(new ShadowNodes());
                            break;
                        }
                        case "class-open": {
                            this[TREE].apply(new ClassFunction());
                            break;
                        }
                    }
                    break;
                }
                case "operator": {
                    switch (token.value) {
                        case "comma": {
                            this[TREE].up();
                            break;
                        }
                        case "equal": {
                            this[TREE].apply(new Equalizer());
                            break;
                        }
                    }
                    break;
                }
            }
        });
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