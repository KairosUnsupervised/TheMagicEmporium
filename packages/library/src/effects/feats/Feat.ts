import {merge} from "ts-deepmerge";
import {Activity, FeatSchema, FeatSystem} from "./feat.schema";

type DocumentSystem = Omit<FeatSystem, 'activities'> & {
    type: { value: 'feat' };
    activities?: Record<string, Activity & { _id: string }>;
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
                const activitiesRecord: Record<string, Activity & { _id: string }> = {};
                for (const activity of activities) {
                    const id = randomId(16);
                    activitiesRecord[id] = {...activity, _id: id};
                }
                base.system = {...base.system, activities: activitiesRecord};
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

const randomId = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};
