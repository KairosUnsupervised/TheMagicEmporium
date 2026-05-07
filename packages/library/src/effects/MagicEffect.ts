import { ActiveEffect } from './activeEffects/ActiveEffect';
import { Feat } from './Feat';

interface FeatProps {
    name: string;
    description: string;
    disclaimer: string | null;
    /**
     * @DEPRECATED
     */
    data?: Record<string, any>;
    /**
     * @DEPRECATED Will be automatically set
     */
    type?: 'ACTIVE' | 'PASSIVE';
}

interface ActiveEffectProps {
    name: string;
    description: string;
    disclaimer: string | null;
    /**
     * @DEPRECATED
     */
    data?: Record<string, any>;
}

export class MagicEffect {
    public feats: Feat[] = [];
    public activeEffects: ActiveEffect[] = [];

    public static create = () => {
        return new MagicEffect();
    };

    public createFeat = (props: FeatProps): Feat => {
        const name = props.name;
        let description = `<p><strong>${props.description}</strong></p>`;

        if (props.disclaimer !== '' && props.disclaimer !== null) {
            description = `${description}<p><em>${props.disclaimer}</em></p>`;
        }

        // Object.entries(props.data).forEach(([key, value]) => {
        // 	description = description.replace(`{mod.data.${key}}`, value);
        // 	name = name.replace(`{mod.data.${key}}`, value);
        // });

        const feat = new Feat({
            img: "PassiveIcon.png",
            name,
            system: { description: { value: description } },
        });
        this.feats.push(feat);
        return feat;
    };

    public createActiveEffect = (props: ActiveEffectProps): ActiveEffect => {
        const name = props.name;
        let description = `<p><strong>${props.description}</strong></p>`;

        if (props.disclaimer !== '' && props.disclaimer !== null) {
            description = `${description}<p><em>${props.disclaimer}</em></p>`;
        }

        // Object.entries(props.data).forEach(([key, value]) => {
        // 	description = description.replace(`{mod.data.${key}}`, value);
        // 	name = name.replace(`{mod.data.${key}}`, value);
        // });

        const activeEffect = new ActiveEffect(
            {
                name,
                description,
                icon: "DefaultIcon.png",
            },
            // Currently static sort index since we only have positive effects
            1,
        );
        this.activeEffects.push(activeEffect);
        return activeEffect;
    };
}
