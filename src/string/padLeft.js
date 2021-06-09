/**
 * Pad a number or string
 * @param {string | number} input
 * @param {number} [length]
 * @param {string} [char]
 */
export default function padLeft(input, length = 2, char = '0') {
	let output = String(input);
	while (output.length < length) output = char + output;
	return output;
}
