export interface DiffSegment {
	text: string;
	changed: boolean;
}

const tokenize = (text: string): string[] => {
	return text.split(/(\s+)/).filter((token) => token.length > 0);
};

const isWhitespace = (text: string): boolean => {
	return text.trim().length === 0;
};

/**
 * Word-level diff of `current` against `previous` via longest common
 * subsequence. Returns the tokens of `current` merged into segments, each
 * marked as changed or unchanged. Removed tokens are not represented.
 */
export const diffWords = (previous: string, current: string): DiffSegment[] => {
	const previousTokens = tokenize(previous);
	const currentTokens = tokenize(current);
	const rows = previousTokens.length;
	const cols = currentTokens.length;

	const lcs: number[][] = Array.from({ length: rows + 1 }, () => {
		return new Array<number>(cols + 1).fill(0);
	});
	for (let i = rows - 1; i >= 0; i--) {
		for (let j = cols - 1; j >= 0; j--) {
			if (previousTokens[i] === currentTokens[j]) {
				lcs[i][j] = lcs[i + 1][j + 1] + 1;
			} else {
				lcs[i][j] = Math.max(lcs[i + 1][j], lcs[i][j + 1]);
			}
		}
	}

	const raw: DiffSegment[] = [];
	const push = (text: string, changed: boolean): void => {
		const last = raw[raw.length - 1];
		if (last !== undefined && last.changed === changed) {
			last.text += text;
		} else {
			raw.push({ text, changed });
		}
	};

	let i = 0;
	let j = 0;
	while (i < rows && j < cols) {
		if (previousTokens[i] === currentTokens[j]) {
			push(currentTokens[j], false);
			i++;
			j++;
		} else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
			i++;
		} else {
			push(currentTokens[j], true);
			j++;
		}
	}
	while (j < cols) {
		push(currentTokens[j], true);
		j++;
	}

	// Bridge whitespace-only gaps between two changed segments so the
	// highlight renders as one continuous marker stroke.
	const segments: DiffSegment[] = [];
	for (let k = 0; k < raw.length; k++) {
		const segment = raw[k];
		const previousSegment = segments[segments.length - 1];
		const nextSegment = raw[k + 1];
		const bridges =
			!segment.changed &&
			isWhitespace(segment.text) &&
			previousSegment?.changed === true &&
			nextSegment?.changed === true;
		const changed = segment.changed || bridges;
		if (previousSegment !== undefined && previousSegment.changed === changed) {
			previousSegment.text += segment.text;
		} else {
			segments.push({ text: segment.text, changed });
		}
	}
	return segments;
};
