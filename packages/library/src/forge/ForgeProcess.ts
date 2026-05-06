import {Tag} from "../item/tag.types";
import {AbstractItem} from "../item/AbstractItem";

export class ForgeProcess {

    public tags: Tag[] = [];
    public abstractItem: AbstractItem = new AbstractItem();
    public existingIdentifiers: string[] = [];

}
