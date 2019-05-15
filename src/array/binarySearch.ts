const default_sort = (item: number, needle: any) => item - needle;

export default function binarySearch(
	array: any[],
	search: number,
	fn: (item: any, needle?: number) => number = default_sort
) {
	let low = 0;
	let high = array.length - 1;

	const sort = fn.length === 1
		? (item: any, needle: number) => fn(item) - search
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