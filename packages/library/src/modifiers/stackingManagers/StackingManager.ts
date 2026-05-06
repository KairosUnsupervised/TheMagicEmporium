import {Modifier} from "../Modifier";

export abstract class StackingManager {
    public static Disabled = null;

    // TODO Rethink this approach ?
    public abstract calculate: (modifiers: Modifier[]) => Modifier[];
}
