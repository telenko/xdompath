import { Axis } from "./Axis";
import { DomAccess } from "../../../DomAccess";

export class FollowingSibling extends Axis {

    process(node) {
        return [DomAccess.getFollowingSiblings(node)];
    }

}