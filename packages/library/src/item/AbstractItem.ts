import {Modifier} from "../modifiers/Modifier";
import {Equipment} from "./equipment.types";
import {Rarity} from "./item.types";

/**
 * Represents an abstracted magic item, no fluff
 */
export class AbstractItem {
    public name = 'Empty Abstraction Item Name';

    public rarity: Rarity = Rarity.Common;
    public base: Equipment = Equipment.Relic;

    public currency = 0;

    public primary: Modifier[] = [];
    public secondary: Modifier[] = [];
    public tertiary: Modifier[] = [];
}
