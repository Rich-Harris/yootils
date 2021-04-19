import { test } from 'uvu';
import * as assert from 'uvu/assert';
import linearScale from './linear.js';

test('scales a number', () => {
	const scale = linearScale([10, 20], [50, 100]);
	assert.equal(scale(15), 75);
	assert.equal(scale(5), 25);
});

test('provides an inverse() method', () => {
	const scale = linearScale([10, 20], [50, 100]);
	const inverse = scale.inverse();
	assert.equal(inverse(75), 15);
	assert.equal(inverse(25), 5);
});

test.run();
