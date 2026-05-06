// TODO MOVE THIS TYPES TO SHARED
interface Window {
    Hooks: {
        on: any
        once: any
    }
}

declare class Item {
    static create(data: object, options?: object): Promise<Item | undefined>
}

declare const game: {
    userId: string
    world: {
        id: string
    }
    modules: {
        get(id: string): { api: unknown } | undefined
    }
}

declare const foundry: {
    applications: {
        apps: {
            FilePicker: {
                browse(
                    source: "data" | "public" | "s3",
                    path: string,
                ): Promise<{
                    dirs: string[]
                    files: string[]
                    target: string
                }>
            }
        }
    }
}
