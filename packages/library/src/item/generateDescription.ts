import {AbstractItem} from "./AbstractItem";
import {AppliedModifier} from "../modifiers/Modifier";
import {UniqueModifier} from "../modifiers/blueprints/UniqueModifier";
import {LinearModifier} from "../modifiers/blueprints/LinearModifier";
import {IndependentModifier} from "../modifiers/blueprints/IndependentModifier";
import {TieredModifier} from "../modifiers/blueprints/TieredModifier";

export const generateDescriptionV3 = (abstractItem: AbstractItem) => {
    let description = '';

    if (abstractItem.primary.length > 0) {
        description += '<p>‎</p>';
        description += '</p><p style="text-align: center;">P R I M A R Y</p>';
        description += '<hr>';
        description += '<hr>';

        abstractItem.primary.forEach((applied: AppliedModifier) => {
            description += generateModifierDescription(applied);
        });
    }

    if (abstractItem.secondary.length > 0) {
        description += '<p>‎</p>';
        description += '</p><p style="text-align: center;">S E C O N D A R Y</p>';
        description += '<hr>';
        description += '<hr>';

        abstractItem.secondary.forEach((applied: AppliedModifier) => {
            description += generateModifierDescription(applied);
        });
    }

    if (abstractItem.tertiary.length > 0) {
        description += '<p>‎</p>';
        description += '</p><p style="text-align: center;">T E R T I A R Y</p>';
        description += '<hr>';
        description += '<hr>';

        abstractItem.tertiary.forEach((applied: AppliedModifier) => {
            description += generateModifierDescription(applied);
        });
    }

    description += '<br/>';
    description += '<br/>';

    return description;
};

const generateModifierDescription = (applied: AppliedModifier) => {
    const flavor = applied.modifier.getDescription(applied.data);

    const type = (() => {
        if (applied.modifier instanceof UniqueModifier) {
            return '<sub>Unique</sub><br>';
        }
        if (applied.modifier instanceof LinearModifier) {
            return '<sub>Linear</sub><br>';
        }
        if (applied.modifier instanceof IndependentModifier) {
            return '<sub>Independent</sub><br>';
        }
        if(applied.modifier instanceof TieredModifier){
            return '<sub>Tiered</sub><br>';
        }
        return '';
    })();

    if (flavor.disclaimer === null || flavor.disclaimer === '') {
        return `
            <hr />
            <p style="text-align: center;">
                ${type}
                <strong>${flavor.title}</strong> <br />
                ${flavor.description}
            </p>
        `;
    }

    return `
        <hr />
        <p style="text-align: center;">
            ${type}
            <strong>${flavor.title}</strong> <br />
            ${flavor.description} <br />
            <em style="opacity: 0.5;">${flavor.disclaimer}</em>
        </p>
    `;
};
