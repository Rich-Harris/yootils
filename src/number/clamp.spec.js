import { test } from 'uvu';
import * as assert from 'uvu/assert';
import clamp from './clamp.js';

test('clamps a number', () => {
	assert.equal(clamp(10, 20, 30), 20);
	assert.equal(clamp(25, 20, 30), 25);
	assert.equal(clamp(40, 20, 30), 30);
});

test.run();
