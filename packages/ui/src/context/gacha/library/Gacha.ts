import {Orbiter} from "./Orbiter";
import {Inventory} from "./Inventory";
import {PullProcess} from "./PullProcess";
import {makeAutoObservable} from "mobx";

export class Gacha {

    public orbiter: Orbiter = new Orbiter();
    public inventory: Inventory = new Inventory(this);
    public pullProcess = new PullProcess();

    constructor() {
        makeAutoObservable(this);
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

    // TODO onConfirm close all open selects => Move select open state to library
    // TODO onConfirm consume all orbiters?
    // TODO Add indicator for luck?
    // TODO Documentation for wording
    // TODO Whitelist
}
