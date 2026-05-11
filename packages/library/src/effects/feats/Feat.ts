import {merge} from "ts-deepmerge";
import {FeatSchema, FeatSystem, validateFeatSchema} from "./feat.schema";
import {activitiesToRecord} from "../activity/Activity";
import {ActivitySchema} from "../activity/activity.schema";
import {namespace} from "@tme/shared/src/namespaceConfig";
import {Icon} from "../../item/icon";
import {Logger} from "../../misc/Logger";
import {Flavor} from "../../modifiers/modifier.schema";

type DocumentSystem = Omit<FeatSystem, 'activities'> & {
    type: { value: 'feat' };
    activities?: Record<string, ActivitySchema & { _id: string }>;
};

interface Document {
    name: string;
    type: 'feat';
    img: string;
    system: DocumentSystem;
}

type CreateDefinition = FeatSchema & Required<Pick<FeatSchema, 'title' | 'description' | 'disclaimer'>>;

export class Feat {
    public document: Document = {
        name: 'Unnamed Feat',
        type: 'feat',
        img: `worlds/${game.world.id}/data/${namespace.core.id}/icons/${Icon.FeatPassive}`,
        system: {
            type: {value: 'feat'},
        },
    };

    /**
     * Pass an array of unknown data and create an array of feat instances <br/>
     * Schema mismatches will be logged as warning, an instance will still be created
     * @param definitions
     */
    public static createMultiple = (definitions: unknown[], defaultFlavor: Flavor): Feat[] => {
        return definitions.map((definition) => {
            if (!validateFeatSchema(definition)) {
                Logger.warn("Feat definition has mismatched properties — importing anyway", {
                    definition,
                    errors: validateFeatSchema.errors,
                });
            }
            return Feat.create({...defaultFlavor, ...(definition as FeatSchema)});
        });
    };

    static create = (definition: CreateDefinition): Feat => {
        let descriptionHtml = `<p><strong>${definition.description}</strong></p>`;
        if (definition.disclaimer !== '' && definition.disclaimer !== null) {
            descriptionHtml = `${descriptionHtml}<p><em>${definition.disclaimer}</em></p>`;
        }

        const base: Partial<Document> = {
            name: definition.title,
        };

        if (definition.system) {
            const {activities, ...systemWithoutActivities} = definition.system;
            base.system = systemWithoutActivities as DocumentSystem;

            if (activities && activities.length > 0) {
                base.system = {...base.system, activities: activitiesToRecord(activities)};
                base.img = `worlds/${game.world.id}/data/${namespace.core.id}/icons/${Icon.FeatActive}`;
            }
        }

        const feat = new Feat(base);

        if (!definition.system?.description?.value) {
            feat.document = merge(feat.document, {
                system: {description: {value: descriptionHtml}},
            }) as Document;
        }

        return feat;
    };

    constructor(props: Partial<Document>) {
        this.document = merge(this.document, props) as Document;
    }

    public export = (): object => {
        return this.document;
    };
}
