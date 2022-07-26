export function clamp(v: number, min: number, max: number) {
	return Math.max(Math.min(v, max), min);
}

export function lerp(v0: number, v1: number, t: number) {
	return v0 + (v1 - v0) * t;
}

export function average(...nums: number[]) {
	let sum = 0;
	for (const num of nums) sum += num;
	return sum / nums.length;
}
