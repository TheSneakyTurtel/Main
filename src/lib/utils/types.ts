export function instanceOf<T extends { [key: string | number]: any }>(obj: any, example: T): obj is T {
	for (const key in example) {
		const expectedType = typeof example[key];
		const actualType = typeof obj[key];

		if (expectedType !== actualType) return false;
		if (actualType === "object" && !instanceOf(obj[key], example[key])) return false;
	}

	return true;
}
