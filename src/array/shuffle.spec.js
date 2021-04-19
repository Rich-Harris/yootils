import { test } from 'uvu';
import * as assert from 'uvu/assert';
import shuffle from './shuffle.js';

test('shuffles an array in place', () => {
	const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];

	const shuffled = shuffle(arr);

	assert.is(shuffled, arr);

	// this *could* happen, but would be vanishingly unlikely
	assert.not.equal(shuffled, [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
	]);
});

test.run();
