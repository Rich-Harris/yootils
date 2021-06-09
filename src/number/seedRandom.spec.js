import { test } from 'uvu';
import * as assert from 'uvu/assert';
import seedRandom from './seedRandom.js';

test('generates a predictable random number', () => {
	const prng = seedRandom('hello.');
	assert.equal(prng(0, 1), 0.9282578795792454);
	assert.equal(prng(0, 1), 0.3752569768646784);
});

test.run();
