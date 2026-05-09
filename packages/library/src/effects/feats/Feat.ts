import {merge} from "ts-deepmerge";
import {FeatSchema, FeatSystem} from "./feat.schema";
import {activitiesToRecord} from "../activity/Activity";
import {ActivitySchema} from "../activity/activity.schema";

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
        img: 'PassiveIcon.png',
        system: {
            type: {value: 'feat'},
        },
    };

    static create = (definition: CreateDefinition): Feat => {
        let descriptionHtml = `<p><strong>${definition.description}</strong></p>`;
        if (definition.disclaimer !== '' && definition.disclaimer !== null) {
            descriptionHtml = `${descriptionHtml}<p><em>${definition.disclaimer}</em></p>`;
        }

        const base: Partial<Document> = {
            name: definition.title,
        };

        if (definition.img) {
            base.img = definition.img;
        }

        if (definition.system) {
            const {activities, ...systemWithoutActivities} = definition.system;
            base.system = systemWithoutActivities as DocumentSystem;

            if (activities && activities.length > 0) {
                base.system = {...base.system, activities: activitiesToRecord(activities)};
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
