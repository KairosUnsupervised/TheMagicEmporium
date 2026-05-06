import { DeepPartial } from "@tme/shared/src/helpers/deepPartial.types";
import { merge } from 'ts-deepmerge';

export enum Recovery {
    LongRest = 'lr',
    ShortRest = 'sr',
    Charges = 'charges',
    Dawn = 'dawn',
}

export enum Activation {
    Action = 'action',
    Special = 'special',
    BonusAction = 'bonus',
    Reaction = 'reaction',
    LegendaryAction = 'Legendary',
    MythicAction = 'mythic',
}

export enum Ability {
    Cha = 'cha',
    Con = 'con',
    Dex = 'dex',
    Int = 'int',
    Wis = 'wis',
    Str = 'str',
}

export enum OnSave {
    None = 'none',
    Half = 'half',
    Full = 'full',
}

interface Document {
    name: string;
    type: 'feat';
    img: string;
    system: {
        description: {
            value: string;
        };
        activation?: {
            type: 'special';
            cost: null;
            condition: '';
        };
        uses?: {
            value: number;
            max: string;
            per: Recovery;
            recovery: '';
            prompt: true;
        };
        type: {
            value: 'feat';
        };
    };
}

export class Feat {
    public document: Document = {
        name: 'Unnamed Feat',
        type: 'feat',
        img: "LockedIcon.png",
        system: {
            description: {
                value: 'string',
            },
            type: {
                value: 'feat',
            },
        },
    };

    public activity: object = {};

    constructor(props: DeepPartial<Document>) {
        this.document = merge(this.document, props) as Document;
    }

    public setActivation = (activation: Activation) => {
        this.document = merge(this.document, {
            img: "ActiveIcon.png",
        }) as unknown as Document;

        this.activity = merge(this.activity, {
            name: 'Use Magic Feature',
            activation: {
                type: activation,
            },
        });
        return this;
    };

    public setRecovery = (recovery: Recovery, uses: number) => {
        this.document = merge(this.document, {
            system: {
                uses: {
                    spent: 0,
                    max: uses,
                    recovery: [{ period: recovery, type: 'recoverAll' }],
                },
            },
        }) as unknown as Document;

        this.activity = merge(this.activity, {
            consumption: {
                targets: [
                    {
                        type: 'itemUses',
                        value: '1',
                    },
                ],
            },
        });
        return this;
    };

    public setTemplateCircle = (radius: number, amount = 1) => {
        this.activity = merge(this.activity, {
            target: {
                template: {
                    type: 'circle',
                    size: radius,
                    units: 'ft',
                    count: amount,
                },
            },
        });
        return this;
    };

    /**
     * Changes the feat to be of type save
     * @param ability
     * @param onSave
     * @param formula DC Save formula
     */
    public setTypeSavingThrow = (
        ability: Ability,
        onSave: OnSave,
        formula: string,
    ) => {
        this.activity = merge(this.activity, {
            type: 'save',
            damage: {
                onSave: onSave,
            },
            save: {
                ability: [ability],
                dc: {
                    formula,
                },
            },
        });
        return this;
    };

    /**
     * Add damage to this feat
     * @param formula Damage formula
     */
    public setDamage = (formula: string) => {
        this.activity = merge(this.activity, {
            damage: {
                parts: [
                    {
                        custom: {
                            enabled: true,
                            formula,
                        },
                    },
                ],
            },
        });
        return this;
    };

    /**
     * Changes the feat to be of type heal
     * @param formula Need to have [healing] or [temphp] as damage type, otherwise it will be treated as damage
     */
    public setTypeHealing = (formula: string) => {
        this.activity = merge(this.activity, {
            type: 'heal',
            healing: {
                custom: {
                    enabled: true,
                    formula,
                },
            },
        });
        return this;
    };

    /**
     * Changes the feat to be of type utility
     * @param formula
     * @param label
     */
    public setTypeUtility = (formula: string, label: string) => {
        this.activity = merge(this.activity, {
            type: 'utility',
            roll: {
                formula,
                name: label,
            },
        });
        return this;
    };

    /**
     * Changes the feat to be of type damage
     */
    public setTypeDamage = () => {
        this.activity = merge(this.activity, {
            type: 'damage',
        });
        return this;
    };

    public export = (): object => {
        if (Object.keys(this.activity).length > 0) {
            const id = randomId(16);

            return merge(this.document, {
                system: {
                    activities: {
                        [id]: {
                            _id: id,
                            type: 'utility',
                            ...this.activity,
                        },
                    },
                },
            });
        }
        return this.document;
    };
}

const randomId = (length: number): string => {
    let result = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
