export function instanceOf<T extends { [key: string | number]: any }>(obj: any, example: T): obj is T {
	let result = true;

	console.log(obj, example);

	for (const key in example) {
		const expectedType = typeof example[key];
		const actualType = typeof obj[key];

		expectedType !== actualType && (result = false);
	}

	return result;
}
