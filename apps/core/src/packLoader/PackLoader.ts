import { namespace } from "@tme/shared/src/namespaceConfig";
import { logger } from "../logger.ts";
import { type PackSchema, validatePackSchema } from "./packLoader.schema.ts";

export class PackLoader {
	/**
	 * Loads all packs regardless of enabled or not and verifies their schema <br/>
	 * Does not verify any modifier content
	 */
	public load = async (): Promise<PackSchema[]> => {
		const files = await this.loadJsonPacks();
		return this.verifySchema(files);
	};

	/**
	 * Load all packs in the world folder and return their JSON content
	 */
	private loadJsonPacks = async (): Promise<string[]> => {
		try {
			const result = await foundry.applications.apps.FilePicker.browse(
				"data",
				`modules/${namespace.core.id}/packs`,
			);

			return result.files.filter((file: string) => {
				return file.endsWith(".json") && !file.endsWith(".disabled.json");
			});
		} catch {
			logger.notification.gm.error(
				`No modifier pack directory found at modules/${namespace.core.id}/packs`,
			);
			return [];
		}
	};

	/**
	 * Verify a valid pack schema
	 * @param files
	 */
	private verifySchema = async (files: string[]): Promise<PackSchema[]> => {
		const packs: PackSchema[] = [];

		for (const file of files) {
			try {
				const response = await fetch(file);
				if (!response.ok) {
					throw new Error(`HTTP ${response.status}`);
				}
				const data: unknown = await response.json();

				if (!validatePackSchema(data)) {
					logger.notification.gm.error(`Invalid pack schema in ${file}:`, {
						errors: validatePackSchema.errors,
					});
					continue;
				}

				packs.push(data);
			} catch (error) {
				logger.notification.gm.error(`Failed to load pack ${file}:`, { error });
			}
		}

		return packs;
	};
}

export const packLoader = new PackLoader();
