/**
 * Clamp `num` to the range `[min, max]`
 * @param {number} num
 * @param {number} min
 * @param {number} max
 */
export default function clamp(num, min, max) {
	return num < min ? min : num > max ? max : num;
}
