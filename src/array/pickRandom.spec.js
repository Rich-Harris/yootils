import { test } from 'uvu';
import * as assert from 'uvu/assert';
import pickRandom from './pickRandom.js';

test('picks an item from an array', () => {
	const item = pickRandom(['a', 'b', 'c']);

	assert.ok(item === 'a' || item === 'b' || item === 'c');
});

test('does not mutate the array', () => {
	const array = ['a', 'b', 'c'];
	pickRandom(array);

	assert.equal(array, ['a', 'b', 'c']);
});

test.run();
