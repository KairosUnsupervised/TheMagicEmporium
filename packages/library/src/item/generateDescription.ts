import {AbstractItem} from "./AbstractItem";
import {AppliedModifier} from "../modifiers/Modifier";
import type {Flavor} from "../modifiers/modifier.types";

export const generateDescriptionV3 = (abstractItem: AbstractItem) => {
    let description = '';

    if (abstractItem.primary.length > 0) {
        description += '<p>‎</p>';
        description += '</p><p style="text-align: center;">P R I M A R Y</p>';
        description += '<hr>';
        description += '<hr>';

        abstractItem.primary.forEach((applied: AppliedModifier) => {
            description += generateModifierDescription(applied.modifier.getDescription(applied.data));
        });
    }

    if (abstractItem.secondary.length > 0) {
        description += '<p>‎</p>';
        description += '</p><p style="text-align: center;">S E C O N D A R Y</p>';
        description += '<hr>';
        description += '<hr>';

        abstractItem.secondary.forEach((applied: AppliedModifier) => {
            description += generateModifierDescription(applied.modifier.getDescription(applied.data));
        });
    }

    if (abstractItem.tertiary.length > 0) {
        description += '<p>‎</p>';
        description += '</p><p style="text-align: center;">T E R T I A R Y</p>';
        description += '<hr>';
        description += '<hr>';

        abstractItem.tertiary.forEach((applied: AppliedModifier) => {
            description += generateModifierDescription(applied.modifier.getDescription(applied.data));
        });
    }

    return description;
};

const generateModifierDescription = (flavor: Flavor) => {
    if (flavor.disclaimer === null || flavor.disclaimer === '') {
        return `
            <hr />
            <p style="text-align: center;">
                <strong>${flavor.title}</strong> <br />
                ${flavor.description}
            </p>
				`;
    }

    return `
        <hr />
        <p style="text-align: center;">
            <strong>${flavor.title}</strong> <br />
            ${flavor.description} <br />
            <em style="opacity: 0.5;">${flavor.disclaimer}</em>
        </p>
            `;
};
