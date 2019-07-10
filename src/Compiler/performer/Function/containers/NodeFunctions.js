import { func } from "../../../decorator/func";
import { compile } from "../../../decorator/compile";
import { StringType } from "../../../type/StringType";

export class NodeFunctions {

    @compile({ type: "function", value: "string-open" })
    @func()
    string() {
        return this.node.textContent;
    }

    @compile({ type: "function", value: "class-open" })
    @func({ types: [StringType], argsCapacity: 1 })
    classFunc(className) {
        return this.node.classList.contains(className);
    }

    @compile({ type: "function", value: "id-open" })
    @func({ argsCapacity: 0 })
    id() {
        return this.node.getAttribute("id");
    }

}