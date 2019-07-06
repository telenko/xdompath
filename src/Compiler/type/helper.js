export function isArgNodeSubsetList(arg) {
     return Array.isArray(arg) && arg.length > 0 && Array.isArray(arg[0]) && ((arg[0].length > 0 && arg[0][0] instanceof Node) || arg[0].length === 0);
}