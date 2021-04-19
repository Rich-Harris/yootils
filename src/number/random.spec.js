import { test } from 'uvu';
import * as assert from 'uvu/assert';
import random from './random.js';

test('generates a random number', () => {
	const n = random(10);
	assert.ok(n >= 0);
	assert.ok(n <= 10);
});

test('generates a random number between a and b', () => {
	const n = random(50, 60);
	assert.ok(n >= 50);
	assert.ok(n <= 60);
});

test.run();
