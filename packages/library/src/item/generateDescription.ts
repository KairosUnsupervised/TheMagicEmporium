import {AbstractItem} from "./AbstractItem";
import {Modifier} from "../modifiers/Modifier";

export const generateDescriptionV3 = (abstractItem: AbstractItem) => {
    let description = '';

    if (abstractItem.primary.length > 0) {
        description += '<p>‎</p>';
        description += '</p><p style="text-align: center;">P R I M A R Y</p>';
        description += '<hr>';
        description += '<hr>';

        abstractItem.primary.forEach((modifier: Modifier) => {
            description += generateModifierDescription(modifier);
        });
    }

    if (abstractItem.secondary.length > 0) {
        description += '<p>‎</p>';
        description += '</p><p style="text-align: center;">S E C O N D A R Y</p>';
        description += '<hr>';
        description += '<hr>';

        abstractItem.secondary.forEach((modifier: Modifier) => {
            description += generateModifierDescription(modifier);
        });
    }

    if (abstractItem.tertiary.length > 0) {
        description += '<p>‎</p>';
        description += '</p><p style="text-align: center;">T E R T I A R Y</p>';
        description += '<hr>';
        description += '<hr>';

        abstractItem.tertiary.forEach((modifier: Modifier) => {
            description += generateModifierDescription(modifier);
        });
    }

    return description;
};

const generateModifierDescription = (modifier: Modifier) => {
    const flavor = modifier.getFlavor();

    // TODO TYPE FLAVOR
    const type = "";
    // const type = (() => {
    //     if (modifier.stackingManager instanceof UniqueStackingManager) {
    //         return '<sub>Unique</sub><br>';
    //     }
    //
    //     if (modifier.stackingManager instanceof IndependentStackingManager) {
    //         return '<sub>Independent</sub><br>';
    //     }
    //
    //     if (modifier.stackingManager instanceof LinearStackingManager) {
    //         return '<sub>Stacking</sub><br>';
    //     }
    //
    //     if (modifier.stackingManager instanceof TieredStackingManager) {
    //         return '<sub>Tiered</sub><br>';
    //     }
    //
    //     return '';
    // })();

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
