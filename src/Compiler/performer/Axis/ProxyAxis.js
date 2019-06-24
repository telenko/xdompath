import { CurrentAxis } from "./CurrentAxis";

export class ProxyAxis extends CurrentAxis {

    constructor(...args) {
        super(...args);
        this.role = args[0];
    }

}