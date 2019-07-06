import { func } from "../../../decorator/func";
import { compile } from "../../../decorator/compile";
import { StringType } from "../../../type/StringType";

export class StringFunctionContainer {

    @compile({ type: "function", value: "contains-open" })
    @func({ types: [StringType, StringType], argsCapacity: 2 })
    contains(str1, str2) {
        if (!str1 || !str2) {
            return false;
        }
        return str1.includes(str2);
    }

}