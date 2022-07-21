export function clamp(v: number, min: number, max: number) {
	if (max < min) return clamp(v, max, min);
	return Math.max(Math.min(v, max), min);
}

export function lerp(v0: number, v1: number, t: number) {
	if (v1 < v0) return lerp(v1, v0, t);
	return v0 + (v1 - v0) * t;
}
