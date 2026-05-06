import { Modifier } from "../Modifier";
import { StackingManager } from "./StackingManager";


/**
 * Only allows for the first modifier to be added
 */
export class UniqueStackingManager extends StackingManager {
    public override calculate = (modifiers: Modifier[]) => {
        return modifiers.slice(0, 1);
    };
}
