interface Window {
    Hooks: {
        on: any
        once: any
    }
}

declare const game: {
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
