interface Folder {
    name: string;
    type: string;
    id:   string;
}

export const getFolder = async (): Promise<Folder> => {
    // @ts-ignore
    const existing = game.folders.find((folder: Folder) => {
        return folder.name === 'The Magic Emporium' && folder.type === 'Item';
    });

    if (existing) {
        return existing;
    }

    // @ts-ignore
    return await game.folders.documentClass.create({
        name: 'The Magic Emporium',
        type: 'Item',
    });
};
