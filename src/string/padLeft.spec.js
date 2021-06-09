import { test } from 'uvu';
import * as assert from 'uvu/assert';
import padLeft from './padLeft.js';

test('pads a number with zeroes, defaulting to 2', () => {
	assert.equal(padLeft(1), '01');
	assert.equal(padLeft(1, 3), '001');
});

test('pads a string with zeroes, defaulting to 2', () => {
	assert.equal(padLeft('1'), '01');
	assert.equal(padLeft('1', 3), '001');
});

test('pads a string with spaces', () => {
	assert.equal(padLeft('1', 2, ' '), ' 1');
	assert.equal(padLeft('1', 3, ' '), '  1');
});

test.run();
