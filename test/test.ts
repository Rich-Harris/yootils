import * as assert from 'assert';
import * as yootils from '../src/index';

describe('yootils', () => {
	// scales
	describe('linearScale', () => {
		it('scales a number', () => {
			const scale = yootils.linearScale([10, 20], [50, 100]);
			assert.equal(scale(15), 75);
			assert.equal(scale(5), 25);
		});
	});

	// number
	describe('clamp', () => {
		it('clamps a number', () => {
			assert.equal(yootils.clamp(10, 20, 30), 20);
			assert.equal(yootils.clamp(25, 20, 30), 25);
			assert.equal(yootils.clamp(40, 20, 30), 30);
		});
	});

	// string
	describe('commas', () => {
		it('adds commas to a numnber', () => {
			assert.equal(yootils.commas(1234), '1,234');
		});

		it('adds commas to a large numnber', () => {
			assert.equal(yootils.commas(1234567890), '1,234,567,890');
		});

		it('adds commas to a numnber with decimal point', () => {
			assert.equal(yootils.commas(1234.5678), '1,234.5678');
		});
	});
});