import { test } from 'uvu';
import * as assert from 'uvu/assert';
import commas from './commas.js';

test('adds commas to a number', () => {
	assert.equal(commas(1234), '1,234');
});

test('adds commas to a large number', () => {
	assert.equal(commas(1234567890), '1,234,567,890');
});

test('adds commas to a number with decimal point', () => {
	assert.equal(commas(1234.5678), '1,234.5678');
});

test.run();
