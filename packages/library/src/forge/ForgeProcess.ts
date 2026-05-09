import {Tag} from "../item/tag.types";
import {AbstractItem} from "../item/AbstractItem";
import {Equipment} from "../item/equipment/equipment.types";
import {Rarity} from "../item/item.types";
import {AppliedModifier, Modifier} from "../modifiers/Modifier";
import {equipmentDetails} from "../item/equipment/equipment.details";
import {MagicItem} from "../item/Item";
import {Slot} from "./forge.types";
import {getFolder} from "./getFolder";

export class ForgeProcess {

    public tags: Tag[] = [];
    public abstractItem: AbstractItem = new AbstractItem();
    public existingIdentifiers: string[] = [];

    public setBase = (equipment: Equipment): void => {
        this.abstractItem.base = equipment;
        const details = equipmentDetails[equipment];
        this.tags = [...this.tags, ...details.tags];
    };

    public setRarity = (rarity: Rarity): void => {
        this.abstractItem.rarity = rarity;
    };

    /**
     * Returns true if the modifier can be added to the current item state.
     * Checks for duplicates, tag whitelist, and tag blacklist.
     */
    public canAdd = (modifier: Modifier): boolean => {
        if (this.existingIdentifiers.includes(modifier.identifier)) {
            return false;
        }

        const {whitelistedBy, blacklistedBy} = modifier.application;

        if (whitelistedBy.length > 0 && !whitelistedBy.some((tag) => this.tags.includes(tag))) {
            return false;
        }

        if (blacklistedBy.some((tag) => this.tags.includes(tag))) {
            return false;
        }

        return true;
    };

    /**
     * Adds a modifier to the given slot and records its side-effects (tags, identifier).
     * Pass data = { float } for float-based modifiers, or null otherwise.
     */
    public addModifier = (slot: Slot, modifier: Modifier, data: unknown): void => {
        const applied: AppliedModifier = {modifier, data};

        switch (slot) {
            case Slot.Primary:
                this.abstractItem.primary.push(applied);
                break;
            case Slot.Secondary:
                this.abstractItem.secondary.push(applied);
                break;
            case Slot.Tertiary:
                this.abstractItem.tertiary.push(applied);
                break;
        }

        this.existingIdentifiers.push(modifier.identifier);

        if (modifier.application.applies.length > 0) {
            this.tags = [...this.tags, ...modifier.application.applies];
        }
    };

    public addToFolder = async (): Promise<void> => {
        const folder = await getFolder();
        const document = MagicItem.create(this.abstractItem).export(folder.id);
        // @ts-ignore
        await game.items.documentClass.create(document);
    };

}
