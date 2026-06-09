import {Orbiter} from "./Orbiter";
import {Inventory} from "./Inventory";
import {PullProcess} from "./PullProcess";
import {makeAutoObservable} from "mobx";
import {PullSelect} from "./PullSelect";
import {registry} from "@tme/library/src/registry/Registry";

export class Gacha {

    public orbiter: Orbiter = new Orbiter();
    public inventory: Inventory = new Inventory(this);
    public pullProcess = new PullProcess();
    public pullSelect = new PullSelect()

    public isOpen: boolean = true;

    constructor() {
        makeAutoObservable(this);
        console.log(registry)
    }

    public onInputUpdate = () => {
        this.pullProcess = new PullProcess()

        const operations = this.inventory.getAllOperations()

        operations.forEach((operation) => {
            this.pullProcess.applyOperation(operation)
        })

        this.orbiter.adjustOrbiters(this.pullProcess.pickAmount.getValue(), this.pullProcess.revealAmount.getValue())

        console.log(this.pullProcess)
    }

    public getVisibility = (): 0 | 1 | 2 | 3 | 4 => {

        if(!this.inventory.envelopeSelected){
            return 4;
        }

        return Math.min(4, Math.max(0, Math.floor(this.pullProcess.visibilityLevel.getValue()))) as 0 | 1 | 2 | 3 | 4;
    }

    /**
     * Returns a value between -1 and 1 for UI and not the actual raw luck values
     */
    public getLuck = () => {
        const totalLuck = this.pullProcess.floatLuck.getValue() + this.pullProcess.rarityLuck.getValue();
        return Math.min(1, Math.max(-1, totalLuck * 0.25)); // Internally cap it at -4 and +4 combined luck
    }

    public onConfirm = () => {
        this.pullSelect.startProcess(this.pullProcess)
    }

    public setOpen = () => {
        this.isOpen = true;
    }

    public setClosed = () => {
        this.isOpen = false;
    }

    // TODO onConfirm close all open selects => Move select open state to library
    // TODO onConfirm consume all orbiters?
    // TODO Documentation for wording
    // TODO Whitelist
    // TODO REFACTOR PACKS TO LIVE IN MODULE PATH
}

export const gacha = new Gacha();
