/**
 * Generate a random number between `a` and `b`, or between 0 and `a` if `b` is unspecified
 * @param {number} a
 * @param {number} [b]
 */
export default function random(a, b) {
	if (b === undefined) return Math.random() * a;
	return a + Math.random() * (b - a);
}
