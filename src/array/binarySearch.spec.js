import { test } from 'uvu';
import * as assert from 'uvu/assert';
import binarySearch from './binarySearch.js';

test('finds an exact match', () => {
	const index = binarySearch([1, 2, 3, 4, 5], 4);
	assert.equal(index, 3);
});

test(`returns two's complement of insertion index if not found`, () => {
	const index = binarySearch([1, 2, 3, 4, 5], 4.5);
	assert.equal(index, ~4);
});

test('supports custom sort function', () => {
	const values = [
		{ value: 1 },
		{ value: 2 },
		{ value: 3 },
		{ value: 4 },
		{ value: 5 },
	];

	const index = binarySearch(values, 4, (item) => item.value);

	assert.equal(index, 3);
});

test('supports custom sort function with single argument', () => {
	const values = [
		{ value: 1 },
		{ value: 2 },
		{ value: 3 },
		{ value: 4 },
		{ value: 5 },
	];

	const index = binarySearch(values, 3.5, (item) => item.value);

	assert.equal(index, ~3);
});

test.run();
