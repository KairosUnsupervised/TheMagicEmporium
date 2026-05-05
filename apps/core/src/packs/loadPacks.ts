import { namespace } from "@tme/shared/src/namespaceConfig"
import { validatePack, type RawPack } from "@tme/library/src/schemas/pack"
import {Logger} from "../misc/Logger.ts";

/**
 * Loads all packs regardless of enabled or not and verifies their schema <br/>
 * Does not verify any modifier content
 */
export const loadPacks = async () => {
    const files = await loadJsonPacks();
    const packs = await verifySchema(files);

    return packs;
}

const loadJsonPacks = async () => {
    try {
        const result = await foundry.applications.apps.FilePicker.browse("data", `worlds/${game.world.id}/data/${namespace.core.id}/packs`)

        const files = result.files.filter((file: string) => {
            if (!file.endsWith(".json")) {
                return false
            }
            if (file.endsWith(".disabled")) {
                return false
            }
            if (file.endsWith(".disabled.json")) {
                return false
            }
            return true
        })

        return files
    } catch {
        Logger.log(`No modifier pack directory found at worlds/${game.world.id}/data/${namespace.core.id}/packs`)
        return []
    }
}

const verifySchema = async (files: string[]): Promise<RawPack[]> => {
    const packs: RawPack[] = []

    for (const file of files) {
        try {
            const response = await fetch(file)
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`)
            }
            const data: unknown = await response.json()

            if (!validatePack(data)) {
                Logger.error(`Invalid pack schema in ${file}:`, {errors: validatePack.errors})
                continue
            }

            packs.push(data)
        } catch (error) {
            Logger.error(`Failed to load pack ${file}:`, {error})
        }
    }

    return packs
}
