import Ajv from "ajv";

// Permissive — unknown FoundryVTT fields pass through untouched
const ajv = new Ajv({removeAdditional: false, strict: false});

export interface ActivityConsumptionTarget {
    type?: 'itemUses' | 'activityUses' | 'material' | 'hitDice' | 'attribute';
    target?: string;
    value?: string;
    scaling?: {
        mode?: string;
        formula?: string;
    };
}

export interface ActivityDamagePart {
    number?: number | string;
    denomination?: number;
    bonus?: string;
    types?: string[];
    custom?: {
        enabled?: boolean;
        formula?: string;
    };
    scaling?: {
        mode?: 'whole' | 'half' | '';
        formula?: string;
    };
}

export interface ActivityUseRecovery {
    period?: 'sr' | 'lr' | 'dawn' | 'dusk' | 'charges' | 'day';
    type?: 'recoverAll' | 'loseAll' | 'formula';
    formula?: string;
}

export interface ActivitySchema {
    _id?: string;
    type?: 'attack' | 'damage' | 'heal' | 'save' | 'utility' | 'enchant' | 'summon';
    name?: string;
    img?: string;
    sort: number;
    description?: {
        chatFlavor?: string;
    };
    activation?: {
        type?: string;
        cost?: number | null;
        condition?: string;
    };
    duration?: {
        value?: string | number | null;
        units?: 'inst' | 'turn' | 'round' | 'minute' | 'hour' | 'day' | 'month' | 'year' | 'perm' | 'spec' | '';
        special?: string;
    };
    target?: {
        template?: {
            type?: 'circle' | 'sphere' | 'cylinder' | 'cone' | 'square' | 'cube' | 'line' | 'wall';
            size?: number;
            width?: number;
            height?: number;
            units?: string;
            count?: number;
            contiguous?: boolean;
        };
        affects?: {
            count?: string | number;
            type?: string;
            choice?: boolean;
            special?: string;
        };
        prompt?: boolean;
    };
    range?: {
        value?: number | null;
        long?: number | null;
        units?: 'ft' | 'mi' | 'm' | 'km' | 'self' | 'touch' | 'spec' | 'any' | '';
        special?: string;
    };
    consumption?: {
        targets?: ActivityConsumptionTarget[];
        scaling?: {
            allowed?: boolean;
            max?: string;
        };
    };
    uses?: {
        max?: string | number;
        recovery?: ActivityUseRecovery[];
    };
    damage?: {
        critical?: {
            allow?: boolean;
            bonus?: string;
        };
        onSave?: 'none' | 'half' | 'full';
        includeBase?: boolean;
        parts?: ActivityDamagePart[];
    };
    save?: {
        ability?: string | string[];
        dc?: {
            calculation?: 'spellcasting' | 'proficiency' | 'flat' | '';
            formula?: string;
        };
    };
    healing?: {
        critical?: {
            allow?: boolean;
            bonus?: string;
        };
        custom?: {
            enabled?: boolean;
            formula?: string;
        };
        scaling?: {
            mode?: string;
            formula?: string;
        };
        types?: string[];
    };
    roll?: {
        formula?: string;
        name?: string;
        prompt?: boolean;
    };
    attack?: {
        ability?: string;
        bonus?: string;
        critical?: {
            threshold?: number | null;
        };
        flat?: boolean;
        type?: {
            value?: 'melee' | 'ranged' | '';
            classification?: 'weapon' | 'spell' | 'unarmed' | '';
        };
    };
}

export const activitySchema = {
    type: "object",
    properties: {
        _id: {type: "string"},
        type: {type: "string", enum: ["attack", "damage", "heal", "save", "utility", "enchant", "summon"]},
        name: {type: "string"},
        img: {type: "string"},
        sort: {type: "number"},
        description: {
            type: "object",
            properties: {
                chatFlavor: {type: "string"},
            },
        },
        activation: {
            type: "object",
            properties: {
                type: {type: "string"},
                cost: {type: ["number", "null"]},
                condition: {type: "string"},
            },
        },
        duration: {
            type: "object",
            properties: {
                value: {type: ["string", "number", "null"]},
                units: {type: "string"},
                special: {type: "string"},
            },
        },
        target: {
            type: "object",
            properties: {
                template: {
                    type: "object",
                    properties: {
                        type: {
                            type: "string",
                            enum: ["circle", "sphere", "cylinder", "cone", "square", "cube", "line", "wall"]
                        },
                        size: {type: "number"},
                        width: {type: "number"},
                        height: {type: "number"},
                        units: {type: "string"},
                        count: {type: "number"},
                        contiguous: {type: "boolean"},
                    },
                },
                affects: {
                    type: "object",
                    properties: {
                        count: {type: ["string", "number"]},
                        type: {type: "string"},
                        choice: {type: "boolean"},
                        special: {type: "string"},
                    },
                },
                prompt: {type: "boolean"},
            },
        },
        range: {
            type: "object",
            properties: {
                value: {type: ["number", "null"]},
                long: {type: ["number", "null"]},
                units: {type: "string"},
                special: {type: "string"},
            },
        },
        consumption: {
            type: "object",
            properties: {
                targets: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            type: {
                                type: "string",
                                enum: ["itemUses", "activityUses", "material", "hitDice", "attribute"]
                            },
                            target: {type: "string"},
                            value: {type: "string"},
                            scaling: {
                                type: "object",
                                properties: {
                                    mode: {type: "string"},
                                    formula: {type: "string"},
                                },
                            },
                        },
                    },
                },
                scaling: {
                    type: "object",
                    properties: {
                        allowed: {type: "boolean"},
                        max: {type: "string"},
                    },
                },
            },
        },
        uses: {
            type: "object",
            properties: {
                max: {type: ["string", "number"]},
                recovery: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            period: {type: "string", enum: ["sr", "lr", "dawn", "dusk", "charges", "day"]},
                            type: {type: "string", enum: ["recoverAll", "loseAll", "formula"]},
                            formula: {type: "string"},
                        },
                    },
                },
            },
        },
        damage: {
            type: "object",
            properties: {
                critical: {
                    type: "object",
                    properties: {
                        allow: {type: "boolean"},
                        bonus: {type: "string"},
                    },
                },
                onSave: {type: "string", enum: ["none", "half", "full"]},
                includeBase: {type: "boolean"},
                parts: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            number: {type: ["number", "string"]},
                            denomination: {type: "number"},
                            bonus: {type: "string"},
                            types: {type: "array", items: {type: "string"}},
                            custom: {
                                type: "object",
                                properties: {
                                    enabled: {type: "boolean"},
                                    formula: {type: "string"},
                                },
                            },
                            scaling: {
                                type: "object",
                                properties: {
                                    mode: {type: "string"},
                                    formula: {type: "string"},
                                },
                            },
                        },
                    },
                },
            },
        },
        save: {
            type: "object",
            properties: {
                ability: {
                    oneOf: [
                        {type: "string"},
                        {type: "array", items: {type: "string"}},
                    ],
                },
                dc: {
                    type: "object",
                    properties: {
                        calculation: {type: "string", enum: ["spellcasting", "proficiency", "flat", ""]},
                        formula: {type: "string"},
                    },
                },
            },
        },
        healing: {
            type: "object",
            properties: {
                critical: {
                    type: "object",
                    properties: {
                        allow: {type: "boolean"},
                        bonus: {type: "string"},
                    },
                },
                custom: {
                    type: "object",
                    properties: {
                        enabled: {type: "boolean"},
                        formula: {type: "string"},
                    },
                },
                scaling: {
                    type: "object",
                    properties: {
                        mode: {type: "string"},
                        formula: {type: "string"},
                    },
                },
                types: {type: "array", items: {type: "string"}},
            },
        },
        roll: {
            type: "object",
            properties: {
                formula: {type: "string"},
                name: {type: "string"},
                prompt: {type: "boolean"},
            },
        },
        attack: {
            type: "object",
            properties: {
                ability: {type: "string"},
                bonus: {type: "string"},
                critical: {
                    type: "object",
                    properties: {
                        threshold: {type: ["number", "null"]},
                    },
                },
                flat: {type: "boolean"},
                type: {
                    type: "object",
                    properties: {
                        value: {type: "string", enum: ["melee", "ranged", ""]},
                        classification: {type: "string", enum: ["weapon", "spell", "unarmed", ""]},
                    },
                },
            },
        },
    },
};

export const activityArraySchema = {
    type: "array",
    items: activitySchema,
};

export const validateActivitySchema = ajv.compile<ActivitySchema>({
    // @ts-ignore
    type: "object",
    ...activitySchema,
});
