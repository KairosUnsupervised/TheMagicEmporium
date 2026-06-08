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

    // TODO onConfirm close all open selects => Move select open state to library
    // TODO onConfirm consume all orbiters?
}
