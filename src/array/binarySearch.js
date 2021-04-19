/**
 * @template T
 * @typedef {(item: T, needle?: number) => number} Comparator<T=any>
 */

/** @type {Comparator<any>} */
const default_sort = (item, needle) => item - needle;

/**
 * @template T
 * @param {T[]} array
 * @param {number} search
 * @param {Comparator<T>} [fn]
 */
export default function binarySearch(array, search, fn = default_sort) {
	let low = 0;
	let high = array.length - 1;

	/** @type {Comparator<T>} */
	const sort =
		fn.length === 1
			? /** @type {Comparator<T>} */ ((item, needle) => fn(item) - search)
			: fn;

	while (low <= high) {
		const i = (high + low) >> 1;

		const d = sort(array[i], search);

		if (d < 0) {
			low = i + 1;
		} else if (d > 0) {
			high = i - 1;
		} else {
			return i;
		}
	}

	return -low - 1;
}
