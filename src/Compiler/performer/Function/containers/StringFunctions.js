import { func } from "../../../decorator/func";
import { compile } from "../../../decorator/compile";
import { StringType } from "../../../type/StringType";
import { IntegerType } from "../../../type/IntegerType";

export class StringFunctions {

    @compile({ type: "function", value: "contains-open" })
    @func({ types: [StringType, StringType], argsCapacity: 2 })
    contains(str1, str2) {
        if (!str1 || !str2) {
            return false;
        }
        return str1.includes(str2);
    }

    @compile({ type: "function", value: "string-length-open" })
    @func({ types: [StringType], argsCapacity: 1 })
    stringLength(str) {
        if (!str) {
            return 0;
        }
        return str.length;
    }

    @compile({ type: "function", value: "substring-open" })
    @func({ types: [StringType, IntegerType, IntegerType], argsCapacity: 3 })
    substring(str, from, size) {
        return str.substring(from + 1, size);
    }

    @compile({ type: "function", value: "substring-before-open" })
    @func({ types: [StringType, StringType], argsCapacity: 2 })
    substringBefore(from, sub) {
        const ind = from.indexOf(sub);
        if (ind === -1) {
            return "";
        }
        return str.substring(0, ind);
    }

    @compile({ type: "function", value: "substring-after-open" })
    @func({ types: [StringType, StringType], argsCapacity: 2 })
    substringAfter(from, sub) {
        const ind = from.indexOf(sub);
        if (ind === -1) {
            return "";
        }
        return str.substring(ind + from.length);
    }

    @compile({ type: "function", value: "starts-with-open" })
    @func({ types: [StringType, StringType], argsCapacity: 2 })
    startsWith(from, sub) {
        return from.startsWith(sub);
    }

    @compile({ type: "function", value: "ends-with-open" })
    @func({ types: [StringType, StringType], argsCapacity: 2 })
    endsWith(from, sub) {
        return from.endsWith(sub);
    }

    @compile({ type: "function", value: "normalize-space-open" })
    @func({ types: [StringType, StringType], argsCapacity: 2 })
    normalizeSpace(str) {
        if  (!str) {
            return "";
        }
        return str.trim().replace(/\s+/g, ' ');
    }

}