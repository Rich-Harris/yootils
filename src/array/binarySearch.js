/**
 * @typedef {(item: any, needle: number) => number} Comparator
 */

/** @type {Comparator} */
const default_sort = (item, needle) => item - needle;

/**
 * @template T
 * @param {T[]} array
 * @param {number} search
 * @param {(item: T) => number} fn
 */
export default function binarySearch(
	array,
	search,
	fn
) {
	let low = 0;
	let high = array.length - 1;

	/** @type {Comparator} */
	const sort = fn.length === 1
		? (item, needle) => fn(item) - search
		: fn;

	while (low <= high) {
		const i = (high + low) >> 1;

		const d = sort(array[i], search);

		if (d < 0) {
			low = i + 1;
		} else if(d > 0) {
			high = i - 1;
		} else {
			return i;
		}
	}

	return -low - 1;
}