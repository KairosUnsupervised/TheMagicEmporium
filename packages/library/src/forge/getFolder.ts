interface Folder {
	name: string;
	type: string;
	id: string;
}

export const getFolder = async (): Promise<Folder> => {
	// @ts-expect-error
	const existing = game.folders.find((folder: Folder) => {
		return folder.name === "The Magic Emporium" && folder.type === "Item";
	});

	if (existing) {
		return existing;
	}

	// @ts-expect-error
	return await game.folders.documentClass.create({
		name: "The Magic Emporium",
		type: "Item",
	});
};
